import type { Category, CategoryId } from '../types';
import {
  colorsVocabulary,
  animalsVocabulary,
  numbersVocabulary,
  familyVocabulary,
  foodVocabulary,
  bodyVocabulary,
} from './vocabulary';

export const categories: Category[] = [
  {
    id: 'colors',
    nameHebrew: 'צבעים',
    nameEnglish: 'Colors',
    emoji: '🎨',
    color: 'bg-pink-100',
    description: 'למדו את שמות הצבעים באנגלית',
    items: colorsVocabulary,
  },
  {
    id: 'animals',
    nameHebrew: 'חיות',
    nameEnglish: 'Animals',
    emoji: '🦁',
    color: 'bg-amber-100',
    description: 'למדו את שמות החיות באנגלית',
    items: animalsVocabulary,
  },
  {
    id: 'numbers',
    nameHebrew: 'מספרים',
    nameEnglish: 'Numbers',
    emoji: '🔢',
    color: 'bg-blue-100',
    description: 'למדו מספרים וחשבון באנגלית',
    items: numbersVocabulary,
  },
  {
    id: 'family',
    nameHebrew: 'משפחה',
    nameEnglish: 'Family',
    emoji: '👨‍👩‍👧‍👦',
    color: 'bg-purple-100',
    description: 'למדו את שמות בני המשפחה באנגלית',
    items: familyVocabulary,
  },
  {
    id: 'food',
    nameHebrew: 'אוכל',
    nameEnglish: 'Food',
    emoji: '🍎',
    color: 'bg-green-100',
    description: 'למדו את שמות המאכלים באנגלית',
    items: foodVocabulary,
  },
  {
    id: 'body',
    nameHebrew: 'חלקי גוף',
    nameEnglish: 'Body Parts',
    emoji: '🦵',
    color: 'bg-red-100',
    description: 'למדו את שמות חלקי הגוף באנגלית',
    items: bodyVocabulary,
  },
];

// Helper to get category by ID
export const getCategoryById = (id: CategoryId): Category | undefined => {
  return categories.find((cat) => cat.id === id);
};

// Get all vocabulary items from selected categories
export const getVocabularyByCategories = (categoryIds: CategoryId[]) => {
  return categories
    .filter((cat) => categoryIds.includes(cat.id))
    .flatMap((cat) => cat.items);
};

// Get category map for quick lookup
export const categoryMap: Record<CategoryId, Category> = categories.reduce(
  (acc, cat) => {
    acc[cat.id] = cat;
    return acc;
  },
  {} as Record<CategoryId, Category>
);
