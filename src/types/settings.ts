import type { CategoryId } from './vocabulary';
import type { Difficulty, SessionDuration } from './game';

export interface UserSettings {
  // Game preferences
  defaultDifficulty: Difficulty;
  defaultDuration: SessionDuration;
  preferredCategories: CategoryId[];

  // Audio settings
  soundEffectsEnabled: boolean;
  speechEnabled: boolean;
  speechRate: number;            // 0.5 - 1.5

  // Display settings
  animationsEnabled: boolean;

  // First-time user
  hasCompletedOnboarding: boolean;
}

// Default settings for new users
export const DEFAULT_SETTINGS: UserSettings = {
  defaultDifficulty: 'easy',
  defaultDuration: 5,
  preferredCategories: ['colors', 'animals'],
  soundEffectsEnabled: true,
  speechEnabled: true,
  speechRate: 0.8,
  animationsEnabled: true,
  hasCompletedOnboarding: false,
};
