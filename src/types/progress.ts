import type { CategoryId } from './vocabulary';
import type { Difficulty } from './game';

// Progress for a single word
export interface WordProgress {
  wordId: string;
  timesShown: number;
  timesCorrect: number;
  lastSeen: string;              // ISO date string
  mastered: boolean;             // Correct 3+ times in a row
  streak: number;                // Current correct streak
}

// Progress for a single category
export interface CategoryProgressData {
  categoryId: CategoryId;
  wordsLearned: number;          // Unique words seen
  wordsMastered: number;         // Words answered correctly 3+ times
  totalAttempts: number;
  correctAttempts: number;
  accuracy: number;
  lastPracticed?: string;        // ISO date
  wordProgress: Record<string, WordProgress>; // Per-word stats
}

// Achievement badge
export interface Badge {
  id: string;
  nameHebrew: string;            // e.g., "מתחיל מבריק"
  description: string;           // e.g., "סיימת את המשחק הראשון שלך!"
  emoji: string;                 // Badge icon
  earnedDate?: string;           // When earned, undefined if locked
}

export interface BadgeDefinition {
  id: string;
  nameHebrew: string;
  description: string;
  emoji: string;
  requirement: BadgeRequirement;
}

export interface BadgeRequirement {
  type: 'sessions' | 'xp' | 'streak' | 'category_mastery' | 'accuracy' | 'words_learned';
  value: number;
  categoryId?: CategoryId;       // For category-specific badges
}

// Session history entry (for progress page)
export interface SessionHistoryEntry {
  sessionId: string;
  date: string;                  // ISO date string
  categories: CategoryId[];
  difficulty: Difficulty;
  score: number;                 // Percentage 0-100
  xpEarned: number;
  questionsAnswered: number;
  correctAnswers: number;
}

// Overall user progress (stored in localStorage)
export interface UserProgress {
  // XP and Levels
  totalXP: number;
  currentLevel: number;

  // Statistics
  totalSessions: number;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  currentStreak: number;         // Days in a row
  longestStreak: number;
  lastPlayedDate: string;        // ISO date string

  // Per-category progress
  categoryProgress: Record<CategoryId, CategoryProgressData>;

  // Achievements
  earnedBadges: string[];        // Badge IDs that have been earned

  // History (last 50 sessions)
  sessionHistory: SessionHistoryEntry[];
}

// XP Level thresholds
export interface LevelInfo {
  level: number;
  xpRequired: number;
  title: string;                 // Hebrew title for the level
  emoji: string;
}
