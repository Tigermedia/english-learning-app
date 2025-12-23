import type { LevelInfo } from '../types';
import type { DifficultyConfig } from '../types';

// XP Level thresholds - exponential curve with diminishing returns
export const levels: LevelInfo[] = [
  { level: 1, xpRequired: 0, title: 'מתחיל', emoji: '🌱' },
  { level: 2, xpRequired: 100, title: 'לומד', emoji: '📚' },
  { level: 3, xpRequired: 250, title: 'מתקדם', emoji: '⭐' },
  { level: 4, xpRequired: 500, title: 'חרוץ', emoji: '🌟' },
  { level: 5, xpRequired: 850, title: 'מצטיין', emoji: '🏆' },
  { level: 6, xpRequired: 1300, title: 'מומחה', emoji: '👑' },
  { level: 7, xpRequired: 1900, title: 'אלוף', emoji: '🎖️' },
  { level: 8, xpRequired: 2600, title: 'גאון', emoji: '🧠' },
  { level: 9, xpRequired: 3500, title: 'מאסטר', emoji: '🎓' },
  { level: 10, xpRequired: 4500, title: 'אגדה', emoji: '👸' },
];

// Calculate level from XP
export const calculateLevel = (xp: number): number => {
  for (let i = levels.length - 1; i >= 0; i--) {
    if (xp >= levels[i].xpRequired) {
      return levels[i].level;
    }
  }
  return 1;
};

// Get level info from XP
export const getLevelInfo = (xp: number): LevelInfo => {
  const level = calculateLevel(xp);
  return levels[level - 1];
};

// Get XP needed for next level
export const getXPToNextLevel = (xp: number): number => {
  const currentLevel = calculateLevel(xp);
  if (currentLevel >= levels.length) {
    return 0; // Max level reached
  }
  return levels[currentLevel].xpRequired - xp;
};

// Get progress percentage to next level
export const getLevelProgress = (xp: number): number => {
  const currentLevel = calculateLevel(xp);
  if (currentLevel >= levels.length) {
    return 100; // Max level
  }

  const currentLevelXP = levels[currentLevel - 1].xpRequired;
  const nextLevelXP = levels[currentLevel].xpRequired;
  const progress = ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

  return Math.min(100, Math.max(0, progress));
};

// Difficulty configurations
export const difficultyConfigs: DifficultyConfig[] = [
  {
    id: 'easy',
    nameHebrew: 'קל',
    timerSeconds: 15,
    optionsCount: 2,
    xpMultiplier: 1,
    learningPhaseSeconds: 5,
  },
  {
    id: 'medium',
    nameHebrew: 'בינוני',
    timerSeconds: 10,
    optionsCount: 3,
    xpMultiplier: 1.5,
    learningPhaseSeconds: 4,
  },
  {
    id: 'hard',
    nameHebrew: 'קשה',
    timerSeconds: 5,
    optionsCount: 4,
    xpMultiplier: 2,
    learningPhaseSeconds: 3,
  },
];

// Get difficulty config by ID
export const getDifficultyConfig = (id: string): DifficultyConfig => {
  return difficultyConfigs.find((d) => d.id === id) || difficultyConfigs[0];
};

// XP calculation constants
export const XP_PER_CORRECT = 10;
export const XP_SPEED_BONUS_MAX = 5; // Bonus for fast answers
export const XP_STREAK_BONUS = 2; // Bonus per streak count

// Calculate XP for a correct answer
export const calculateXP = (
  difficulty: string,
  timeToAnswer: number,
  maxTime: number,
  streak: number
): number => {
  const config = getDifficultyConfig(difficulty);
  let xp = XP_PER_CORRECT * config.xpMultiplier;

  // Speed bonus (faster = more XP)
  const timeRatio = 1 - timeToAnswer / (maxTime * 1000);
  const speedBonus = Math.floor(timeRatio * XP_SPEED_BONUS_MAX);
  xp += speedBonus;

  // Streak bonus
  xp += Math.min(streak, 5) * XP_STREAK_BONUS;

  return Math.floor(xp);
};

// Calculate stars earned based on accuracy
export const calculateStars = (accuracy: number): number => {
  if (accuracy >= 90) return 3;
  if (accuracy >= 70) return 2;
  if (accuracy >= 50) return 1;
  return 0;
};
