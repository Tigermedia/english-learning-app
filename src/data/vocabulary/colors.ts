import type { VocabularyItem } from '../../types';

export const colorsVocabulary: VocabularyItem[] = [
  // Basic colors
  { id: 'colors_red', english: 'red', hebrew: 'אדום', emoji: '🔴', category: 'colors' },
  { id: 'colors_orange', english: 'orange', hebrew: 'כתום', emoji: '🟠', category: 'colors' },
  { id: 'colors_yellow', english: 'yellow', hebrew: 'צהוב', emoji: '🟡', category: 'colors' },
  { id: 'colors_green', english: 'green', hebrew: 'ירוק', emoji: '🟢', category: 'colors' },
  { id: 'colors_blue', english: 'blue', hebrew: 'כחול', emoji: '🔵', category: 'colors' },
  { id: 'colors_purple', english: 'purple', hebrew: 'סגול', emoji: '🟣', category: 'colors' },
  { id: 'colors_black', english: 'black', hebrew: 'שחור', emoji: '⚫', category: 'colors' },
  { id: 'colors_white', english: 'white', hebrew: 'לבן', emoji: '⚪', category: 'colors' },
  { id: 'colors_brown', english: 'brown', hebrew: 'חום', emoji: '🟤', category: 'colors' },
  { id: 'colors_pink', english: 'pink', hebrew: 'ורוד', emoji: '💗', category: 'colors' },

  // Extended colors
  { id: 'colors_gray', english: 'gray', hebrew: 'אפור', emoji: '🩶', category: 'colors' },
  { id: 'colors_gold', english: 'gold', hebrew: 'זהב', emoji: '🥇', category: 'colors' },
  { id: 'colors_silver', english: 'silver', hebrew: 'כסף', emoji: '🥈', category: 'colors' },
  { id: 'colors_beige', english: 'beige', hebrew: 'בז\'', emoji: '🏖️', category: 'colors' },
  { id: 'colors_cream', english: 'cream', hebrew: 'קרם', emoji: '🍦', category: 'colors' },
  { id: 'colors_navy', english: 'navy', hebrew: 'כחול כהה', emoji: '🌊', category: 'colors' },
  { id: 'colors_turquoise', english: 'turquoise', hebrew: 'טורקיז', emoji: '💎', category: 'colors' },
  { id: 'colors_teal', english: 'teal', hebrew: 'כחול-ירוק', emoji: '🧊', category: 'colors' },
  { id: 'colors_cyan', english: 'cyan', hebrew: 'תכלת', emoji: '🩵', category: 'colors' },
  { id: 'colors_magenta', english: 'magenta', hebrew: 'מג\'נטה', emoji: '🪻', category: 'colors' },

  // Light variations
  { id: 'colors_light_blue', english: 'light blue', hebrew: 'תכלת בהיר', emoji: '🫧', category: 'colors' },
  { id: 'colors_light_green', english: 'light green', hebrew: 'ירוק בהיר', emoji: '🥬', category: 'colors' },
  { id: 'colors_light_pink', english: 'light pink', hebrew: 'ורוד בהיר', emoji: '🌸', category: 'colors' },
  { id: 'colors_light_yellow', english: 'light yellow', hebrew: 'צהוב בהיר', emoji: '🌼', category: 'colors' },
  { id: 'colors_light_purple', english: 'light purple', hebrew: 'סגול בהיר', emoji: '💜', category: 'colors' },

  // Dark variations
  { id: 'colors_dark_blue', english: 'dark blue', hebrew: 'כחול כהה', emoji: '🌑', category: 'colors' },
  { id: 'colors_dark_green', english: 'dark green', hebrew: 'ירוק כהה', emoji: '🌲', category: 'colors' },
  { id: 'colors_dark_red', english: 'dark red', hebrew: 'אדום כהה', emoji: '🍷', category: 'colors' },
  { id: 'colors_dark_brown', english: 'dark brown', hebrew: 'חום כהה', emoji: '☕', category: 'colors' },
  { id: 'colors_dark_gray', english: 'dark gray', hebrew: 'אפור כהה', emoji: '🌫️', category: 'colors' },

  // Nature colors
  { id: 'colors_sky_blue', english: 'sky blue', hebrew: 'תכלת שמים', emoji: '☁️', category: 'colors' },
  { id: 'colors_forest_green', english: 'forest green', hebrew: 'ירוק יער', emoji: '🌳', category: 'colors' },
  { id: 'colors_ocean_blue', english: 'ocean blue', hebrew: 'כחול ים', emoji: '🌊', category: 'colors' },
  { id: 'colors_sand', english: 'sand', hebrew: 'חול', emoji: '🏝️', category: 'colors' },
  { id: 'colors_coral', english: 'coral', hebrew: 'אלמוג', emoji: '🪸', category: 'colors' },
  { id: 'colors_mint', english: 'mint', hebrew: 'מנטה', emoji: '🌿', category: 'colors' },
  { id: 'colors_olive', english: 'olive', hebrew: 'זית', emoji: '🫒', category: 'colors' },
  { id: 'colors_peach', english: 'peach', hebrew: 'אפרסק', emoji: '🍑', category: 'colors' },
  { id: 'colors_lavender', english: 'lavender', hebrew: 'לבנדר', emoji: '💐', category: 'colors' },
  { id: 'colors_rose', english: 'rose', hebrew: 'ורד', emoji: '🌹', category: 'colors' },

  // Bright/Vivid colors
  { id: 'colors_bright_red', english: 'bright red', hebrew: 'אדום בוהק', emoji: '❤️', category: 'colors' },
  { id: 'colors_bright_orange', english: 'bright orange', hebrew: 'כתום בוהק', emoji: '🧡', category: 'colors' },
  { id: 'colors_bright_yellow', english: 'bright yellow', hebrew: 'צהוב בוהק', emoji: '💛', category: 'colors' },
  { id: 'colors_bright_green', english: 'bright green', hebrew: 'ירוק בוהק', emoji: '💚', category: 'colors' },
  { id: 'colors_bright_blue', english: 'bright blue', hebrew: 'כחול בוהק', emoji: '💙', category: 'colors' },

  // Special colors
  { id: 'colors_rainbow', english: 'rainbow', hebrew: 'קשת', emoji: '🌈', category: 'colors' },
  { id: 'colors_transparent', english: 'transparent', hebrew: 'שקוף', emoji: '🔍', category: 'colors' },
  { id: 'colors_maroon', english: 'maroon', hebrew: 'בורדו', emoji: '🍫', category: 'colors' },
  { id: 'colors_indigo', english: 'indigo', hebrew: 'אינדיגו', emoji: '🔮', category: 'colors' },
  { id: 'colors_violet', english: 'violet', hebrew: 'סגלגל', emoji: '🪻', category: 'colors' },
  { id: 'colors_lime', english: 'lime', hebrew: 'ליים', emoji: '🍈', category: 'colors' },
  { id: 'colors_aqua', english: 'aqua', hebrew: 'אקווה', emoji: '💧', category: 'colors' },
  { id: 'colors_bronze', english: 'bronze', hebrew: 'ארד', emoji: '🥉', category: 'colors' },
  { id: 'colors_copper', english: 'copper', hebrew: 'נחושת', emoji: '🪙', category: 'colors' },
  { id: 'colors_ruby', english: 'ruby', hebrew: 'רובי', emoji: '❣️', category: 'colors' },
];
