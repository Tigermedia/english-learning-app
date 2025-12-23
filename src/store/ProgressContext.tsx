import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { UserProgress, CategoryId, CategoryProgressData } from '../types';

// Storage key
const STORAGE_KEY = 'english-app-progress';

// Default category progress
const createDefaultCategoryProgress = (categoryId: CategoryId): CategoryProgressData => ({
  categoryId,
  wordsLearned: 0,
  wordsMastered: 0,
  totalAttempts: 0,
  correctAttempts: 0,
  accuracy: 0,
  wordProgress: {},
});

// Default progress state
const DEFAULT_PROGRESS: UserProgress = {
  totalXP: 0,
  currentLevel: 1,
  totalSessions: 0,
  totalQuestionsAnswered: 0,
  totalCorrectAnswers: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastPlayedDate: '',
  categoryProgress: {
    colors: createDefaultCategoryProgress('colors'),
    animals: createDefaultCategoryProgress('animals'),
    numbers: createDefaultCategoryProgress('numbers'),
    family: createDefaultCategoryProgress('family'),
    food: createDefaultCategoryProgress('food'),
  },
  earnedBadges: [],
  sessionHistory: [],
};

// Action types
type ProgressAction =
  | { type: 'ADD_XP'; payload: number }
  | { type: 'INCREMENT_SESSIONS' }
  | { type: 'RECORD_ANSWER'; payload: { categoryId: CategoryId; wordId: string; correct: boolean } }
  | { type: 'UPDATE_STREAK' }
  | { type: 'EARN_BADGE'; payload: string }
  | { type: 'SET_PROGRESS'; payload: UserProgress }
  | { type: 'RESET_PROGRESS' };

// Reducer
function progressReducer(state: UserProgress, action: ProgressAction): UserProgress {
  switch (action.type) {
    case 'ADD_XP':
      return {
        ...state,
        totalXP: state.totalXP + action.payload,
      };

    case 'INCREMENT_SESSIONS':
      return {
        ...state,
        totalSessions: state.totalSessions + 1,
      };

    case 'RECORD_ANSWER': {
      const { categoryId, wordId, correct } = action.payload;
      const categoryProgress = state.categoryProgress[categoryId];
      const wordProgress = categoryProgress.wordProgress[wordId] || {
        wordId,
        timesShown: 0,
        timesCorrect: 0,
        lastSeen: '',
        mastered: false,
        streak: 0,
      };

      const newStreak = correct ? wordProgress.streak + 1 : 0;
      const newMastered = newStreak >= 3;

      const updatedWordProgress = {
        ...wordProgress,
        timesShown: wordProgress.timesShown + 1,
        timesCorrect: correct ? wordProgress.timesCorrect + 1 : wordProgress.timesCorrect,
        lastSeen: new Date().toISOString(),
        mastered: newMastered,
        streak: newStreak,
      };

      const newCategoryProgress = {
        ...categoryProgress,
        totalAttempts: categoryProgress.totalAttempts + 1,
        correctAttempts: correct
          ? categoryProgress.correctAttempts + 1
          : categoryProgress.correctAttempts,
        wordsLearned: Object.keys({
          ...categoryProgress.wordProgress,
          [wordId]: updatedWordProgress,
        }).length,
        wordsMastered: Object.values({
          ...categoryProgress.wordProgress,
          [wordId]: updatedWordProgress,
        }).filter((w) => w.mastered).length,
        wordProgress: {
          ...categoryProgress.wordProgress,
          [wordId]: updatedWordProgress,
        },
      };

      // Calculate accuracy
      newCategoryProgress.accuracy = Math.round(
        (newCategoryProgress.correctAttempts / newCategoryProgress.totalAttempts) * 100
      );

      return {
        ...state,
        totalQuestionsAnswered: state.totalQuestionsAnswered + 1,
        totalCorrectAnswers: correct
          ? state.totalCorrectAnswers + 1
          : state.totalCorrectAnswers,
        categoryProgress: {
          ...state.categoryProgress,
          [categoryId]: newCategoryProgress,
        },
      };
    }

    case 'UPDATE_STREAK': {
      const today = new Date().toISOString().split('T')[0];
      const lastPlayed = state.lastPlayedDate.split('T')[0];

      if (lastPlayed === today) {
        return state; // Already played today
      }

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      const newStreak = lastPlayed === yesterdayStr ? state.currentStreak + 1 : 1;
      const newLongestStreak = Math.max(state.longestStreak, newStreak);

      return {
        ...state,
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
        lastPlayedDate: new Date().toISOString(),
      };
    }

    case 'EARN_BADGE':
      if (state.earnedBadges.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        earnedBadges: [...state.earnedBadges, action.payload],
      };

    case 'SET_PROGRESS':
      return action.payload;

    case 'RESET_PROGRESS':
      return DEFAULT_PROGRESS;

    default:
      return state;
  }
}

// Context
interface ProgressContextType {
  progress: UserProgress;
  addXP: (amount: number) => void;
  incrementSessions: () => void;
  recordAnswer: (categoryId: CategoryId, wordId: string, correct: boolean) => void;
  updateStreak: () => void;
  earnBadge: (badgeId: string) => void;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

// Provider
interface ProgressProviderProps {
  children: ReactNode;
}

export function ProgressProvider({ children }: ProgressProviderProps) {
  // Load initial state from localStorage
  const loadInitialState = (): UserProgress => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Error loading progress from localStorage:', error);
    }
    return DEFAULT_PROGRESS;
  };

  const [progress, dispatch] = useReducer(progressReducer, null, loadInitialState);

  // Persist to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.warn('Error saving progress to localStorage:', error);
    }
  }, [progress]);

  // Action helpers
  const addXP = (amount: number) => dispatch({ type: 'ADD_XP', payload: amount });
  const incrementSessions = () => dispatch({ type: 'INCREMENT_SESSIONS' });
  const recordAnswer = (categoryId: CategoryId, wordId: string, correct: boolean) =>
    dispatch({ type: 'RECORD_ANSWER', payload: { categoryId, wordId, correct } });
  const updateStreak = () => dispatch({ type: 'UPDATE_STREAK' });
  const earnBadge = (badgeId: string) => dispatch({ type: 'EARN_BADGE', payload: badgeId });
  const resetProgress = () => dispatch({ type: 'RESET_PROGRESS' });

  return (
    <ProgressContext.Provider
      value={{
        progress,
        addXP,
        incrementSessions,
        recordAnswer,
        updateStreak,
        earnBadge,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

// Hook
export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
