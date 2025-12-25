import { useEffect, useRef } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { Id } from '../../convex/_generated/dataModel';
import type { UserProgress } from '../types';

// Debounce helper
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce<T extends (...args: any[]) => any>(fn: T, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

interface UseConvexSyncOptions {
  userId: Id<'users'> | null;
  localProgress: UserProgress;
  onProgressLoaded?: (progress: UserProgress) => void;
}

export function useConvexSync({ userId, localProgress, onProgressLoaded }: UseConvexSyncOptions) {
  const syncMutation = useMutation(api.progress.syncProgress);
  const loadedRef = useRef(false);

  // Fetch progress from Convex
  const serverProgress = useQuery(
    api.progress.getProgress,
    userId ? { userId } : 'skip'
  );

  // Load progress from server on first login
  useEffect(() => {
    if (userId && serverProgress && !loadedRef.current && onProgressLoaded) {
      loadedRef.current = true;

      // Parse the category progress from JSON
      const categoryProgress = serverProgress.categoryProgressJson
        ? JSON.parse(serverProgress.categoryProgressJson)
        : {};

      // Merge server progress with local - take higher values
      const mergedProgress: UserProgress = {
        totalXP: Math.max(localProgress.totalXP, serverProgress.totalXP),
        currentLevel: Math.max(localProgress.currentLevel, serverProgress.currentLevel),
        totalSessions: Math.max(localProgress.totalSessions, serverProgress.totalSessions),
        totalQuestionsAnswered: Math.max(
          localProgress.totalQuestionsAnswered,
          serverProgress.totalQuestionsAnswered
        ),
        totalCorrectAnswers: Math.max(
          localProgress.totalCorrectAnswers,
          serverProgress.totalCorrectAnswers
        ),
        currentStreak: localProgress.currentStreak, // Keep local streak
        longestStreak: Math.max(localProgress.longestStreak, serverProgress.longestStreak),
        lastPlayedDate: localProgress.lastPlayedDate || serverProgress.lastPlayedDate,
        categoryProgress: mergeCategoryProgress(
          localProgress.categoryProgress,
          categoryProgress
        ),
        earnedBadges: Array.from(
          new Set([...localProgress.earnedBadges, ...serverProgress.earnedBadges])
        ),
        sessionHistory: localProgress.sessionHistory, // Keep local history for now
      };

      onProgressLoaded(mergedProgress);
    }
  }, [userId, serverProgress, localProgress, onProgressLoaded]);

  // Reset loaded flag when user changes
  useEffect(() => {
    if (!userId) {
      loadedRef.current = false;
    }
  }, [userId]);

  // Sync to server (debounced)
  const syncToServer = useRef(
    debounce(async (progress: UserProgress, uid: Id<'users'>) => {
      try {
        await syncMutation({
          userId: uid,
          totalXP: progress.totalXP,
          currentLevel: progress.currentLevel,
          totalSessions: progress.totalSessions,
          totalQuestionsAnswered: progress.totalQuestionsAnswered,
          totalCorrectAnswers: progress.totalCorrectAnswers,
          currentStreak: progress.currentStreak,
          longestStreak: progress.longestStreak,
          lastPlayedDate: progress.lastPlayedDate,
          earnedBadges: progress.earnedBadges,
          categoryProgressJson: JSON.stringify(progress.categoryProgress),
        });
      } catch (error) {
        console.warn('Failed to sync progress to Convex:', error);
      }
    }, 2000) // 2 second debounce
  ).current;

  // Sync local progress to server when it changes
  useEffect(() => {
    if (userId && localProgress.totalXP > 0) {
      syncToServer(localProgress, userId);
    }
  }, [userId, localProgress, syncToServer]);
}

// Helper to merge category progress
function mergeCategoryProgress(
  local: UserProgress['categoryProgress'],
  server: UserProgress['categoryProgress']
): UserProgress['categoryProgress'] {
  const merged = { ...local };

  for (const categoryId of Object.keys(server) as Array<keyof typeof server>) {
    if (!merged[categoryId]) {
      merged[categoryId] = server[categoryId];
    } else {
      const localCat = merged[categoryId];
      const serverCat = server[categoryId];

      merged[categoryId] = {
        ...localCat,
        wordsLearned: Math.max(localCat.wordsLearned, serverCat.wordsLearned || 0),
        wordsMastered: Math.max(localCat.wordsMastered, serverCat.wordsMastered || 0),
        totalAttempts: Math.max(localCat.totalAttempts, serverCat.totalAttempts || 0),
        correctAttempts: Math.max(localCat.correctAttempts, serverCat.correctAttempts || 0),
        accuracy: Math.max(localCat.accuracy, serverCat.accuracy || 0),
        // Merge word progress
        wordProgress: {
          ...serverCat.wordProgress,
          ...localCat.wordProgress,
        },
      };
    }
  }

  return merged;
}
