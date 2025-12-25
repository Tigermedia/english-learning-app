import { badges } from '../data/achievements';
import type { UserProgress, CategoryId } from '../types';

interface CheckBadgesContext {
  sessionAccuracy?: number; // Accuracy for current session (0-100)
}

/**
 * Checks which badges should be earned based on current progress.
 * Returns array of badge IDs that are newly earned (not yet in earnedBadges).
 */
export function checkBadges(
  progress: UserProgress,
  context?: CheckBadgesContext
): string[] {
  const newBadges: string[] = [];

  for (const badge of badges) {
    // Skip if already earned
    if (progress.earnedBadges.includes(badge.id)) {
      continue;
    }

    const { type, value, categoryId } = badge.requirement;
    let isEarned = false;

    switch (type) {
      case 'sessions':
        isEarned = progress.totalSessions >= value;
        break;

      case 'xp':
        isEarned = progress.totalXP >= value;
        break;

      case 'streak':
        isEarned = progress.currentStreak >= value || progress.longestStreak >= value;
        break;

      case 'accuracy':
        // Check if current session has perfect accuracy
        if (context?.sessionAccuracy !== undefined) {
          isEarned = context.sessionAccuracy >= value;
        }
        break;

      case 'category_mastery':
        if (categoryId) {
          const categoryProgress = progress.categoryProgress[categoryId as CategoryId];
          if (categoryProgress) {
            isEarned = categoryProgress.wordsMastered >= value;
          }
        }
        break;

      case 'words_learned':
        // Sum up all words learned across categories
        const totalWordsLearned = Object.values(progress.categoryProgress).reduce(
          (sum, cat) => sum + cat.wordsLearned,
          0
        );
        isEarned = totalWordsLearned >= value;
        break;
    }

    if (isEarned) {
      newBadges.push(badge.id);
    }
  }

  return newBadges;
}
