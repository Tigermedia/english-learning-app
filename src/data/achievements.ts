import type { BadgeDefinition } from '../types';

export const badges: BadgeDefinition[] = [
  // Session-based badges
  {
    id: 'first_session',
    nameHebrew: 'צעד ראשון',
    description: 'סיימת את המשחק הראשון שלך!',
    emoji: '🎉',
    requirement: { type: 'sessions', value: 1 },
  },
  {
    id: 'five_sessions',
    nameHebrew: 'שחקן מתמיד',
    description: 'שיחקת 5 משחקים!',
    emoji: '🎮',
    requirement: { type: 'sessions', value: 5 },
  },
  {
    id: 'ten_sessions',
    nameHebrew: 'מאמן מקצועי',
    description: 'שיחקת 10 משחקים!',
    emoji: '🏅',
    requirement: { type: 'sessions', value: 10 },
  },
  {
    id: 'twenty_five_sessions',
    nameHebrew: 'אלוף התרגול',
    description: 'שיחקת 25 משחקים!',
    emoji: '🏆',
    requirement: { type: 'sessions', value: 25 },
  },

  // XP-based badges
  {
    id: 'xp_100',
    nameHebrew: 'אספן נקודות',
    description: 'צברת 100 נקודות XP!',
    emoji: '💯',
    requirement: { type: 'xp', value: 100 },
  },
  {
    id: 'xp_500',
    nameHebrew: 'כוכב עולה',
    description: 'צברת 500 נקודות XP!',
    emoji: '⭐',
    requirement: { type: 'xp', value: 500 },
  },
  {
    id: 'xp_1000',
    nameHebrew: 'סופרסטאר',
    description: 'צברת 1000 נקודות XP!',
    emoji: '🌟',
    requirement: { type: 'xp', value: 1000 },
  },

  // Accuracy-based badges
  {
    id: 'perfect_game',
    nameHebrew: 'משחק מושלם',
    description: 'השגת 100% דיוק במשחק!',
    emoji: '💎',
    requirement: { type: 'accuracy', value: 100 },
  },

  // Category mastery badges
  {
    id: 'colors_master',
    nameHebrew: 'מומחה צבעים',
    description: 'שלטת בכל הצבעים!',
    emoji: '🎨',
    requirement: { type: 'category_mastery', value: 10, categoryId: 'colors' },
  },
  {
    id: 'animals_master',
    nameHebrew: 'חבר החיות',
    description: 'שלטת בכל החיות!',
    emoji: '🦁',
    requirement: { type: 'category_mastery', value: 15, categoryId: 'animals' },
  },
  {
    id: 'numbers_master',
    nameHebrew: 'גאון מספרים',
    description: 'שלטת בכל המספרים!',
    emoji: '🔢',
    requirement: { type: 'category_mastery', value: 20, categoryId: 'numbers' },
  },
  {
    id: 'family_master',
    nameHebrew: 'מומחה משפחה',
    description: 'שלטת בכל בני המשפחה!',
    emoji: '👨‍👩‍👧‍👦',
    requirement: { type: 'category_mastery', value: 10, categoryId: 'family' },
  },
  {
    id: 'food_master',
    nameHebrew: 'שף אנגלית',
    description: 'שלטת בכל המאכלים!',
    emoji: '🍎',
    requirement: { type: 'category_mastery', value: 14, categoryId: 'food' },
  },

  // Streak badges
  {
    id: 'streak_3',
    nameHebrew: 'שלושה ימים!',
    description: 'שיחקת 3 ימים ברצף!',
    emoji: '🔥',
    requirement: { type: 'streak', value: 3 },
  },
  {
    id: 'streak_7',
    nameHebrew: 'שבוע מלא!',
    description: 'שיחקת שבוע שלם ברצף!',
    emoji: '🔥🔥',
    requirement: { type: 'streak', value: 7 },
  },

  // Words learned badges
  {
    id: 'words_10',
    nameHebrew: 'לומד מתחיל',
    description: 'למדת 10 מילים!',
    emoji: '📖',
    requirement: { type: 'words_learned', value: 10 },
  },
  {
    id: 'words_25',
    nameHebrew: 'אוצר מילים',
    description: 'למדת 25 מילים!',
    emoji: '📚',
    requirement: { type: 'words_learned', value: 25 },
  },
  {
    id: 'words_50',
    nameHebrew: 'פרופסור מילים',
    description: 'למדת 50 מילים!',
    emoji: '🎓',
    requirement: { type: 'words_learned', value: 50 },
  },
];

// Get badge by ID
export const getBadgeById = (id: string): BadgeDefinition | undefined => {
  return badges.find((b) => b.id === id);
};

// Get all badge definitions as a map
export const badgeMap: Record<string, BadgeDefinition> = badges.reduce(
  (acc, badge) => {
    acc[badge.id] = badge;
    return acc;
  },
  {} as Record<string, BadgeDefinition>
);
