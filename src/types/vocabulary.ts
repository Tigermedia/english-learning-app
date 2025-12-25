// Category identifiers
export type CategoryId = 'colors' | 'animals' | 'numbers' | 'family' | 'food' | 'body';

// Single vocabulary item
export interface VocabularyItem {
  id: string;                    // Unique identifier, e.g., "colors_red"
  english: string;               // English word, e.g., "red"
  hebrew: string;                // Hebrew translation, e.g., "אדום"
  emoji: string;                 // Emoji representation, e.g., "🔴"
  category: CategoryId;          // Category this belongs to
}

// Category metadata
export interface Category {
  id: CategoryId;
  nameHebrew: string;            // e.g., "צבעים"
  nameEnglish: string;           // e.g., "Colors"
  emoji: string;                 // Category icon, e.g., "🎨"
  color: string;                 // Tailwind color class for theming
  description: string;           // Hebrew description
  items: VocabularyItem[];       // All vocabulary in this category
}
