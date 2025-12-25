import type { VocabularyItem } from '../../types';

export const foodVocabulary: VocabularyItem[] = [
  // Fruits
  { id: 'food_apple', english: 'apple', hebrew: 'תפוח', emoji: '🍎', category: 'food' },
  { id: 'food_banana', english: 'banana', hebrew: 'בננה', emoji: '🍌', category: 'food' },
  { id: 'food_orange', english: 'orange', hebrew: 'תפוז', emoji: '🍊', category: 'food' },
  { id: 'food_grapes', english: 'grapes', hebrew: 'ענבים', emoji: '🍇', category: 'food' },
  { id: 'food_strawberry', english: 'strawberry', hebrew: 'תות', emoji: '🍓', category: 'food' },
  { id: 'food_watermelon', english: 'watermelon', hebrew: 'אבטיח', emoji: '🍉', category: 'food' },
  { id: 'food_pineapple', english: 'pineapple', hebrew: 'אננס', emoji: '🍍', category: 'food' },
  { id: 'food_mango', english: 'mango', hebrew: 'מנגו', emoji: '🥭', category: 'food' },
  { id: 'food_peach', english: 'peach', hebrew: 'אפרסק', emoji: '🍑', category: 'food' },
  { id: 'food_pear', english: 'pear', hebrew: 'אגס', emoji: '🍐', category: 'food' },
  { id: 'food_lemon', english: 'lemon', hebrew: 'לימון', emoji: '🍋', category: 'food' },
  { id: 'food_cherry', english: 'cherry', hebrew: 'דובדבן', emoji: '🍒', category: 'food' },
  { id: 'food_coconut', english: 'coconut', hebrew: 'קוקוס', emoji: '🥥', category: 'food' },
  { id: 'food_kiwi', english: 'kiwi', hebrew: 'קיווי', emoji: '🥝', category: 'food' },
  { id: 'food_melon', english: 'melon', hebrew: 'מלון', emoji: '🍈', category: 'food' },
  { id: 'food_blueberry', english: 'blueberry', hebrew: 'אוכמנית', emoji: '🫐', category: 'food' },

  // Vegetables
  { id: 'food_carrot', english: 'carrot', hebrew: 'גזר', emoji: '🥕', category: 'food' },
  { id: 'food_cucumber', english: 'cucumber', hebrew: 'מלפפון', emoji: '🥒', category: 'food' },
  { id: 'food_tomato', english: 'tomato', hebrew: 'עגבנייה', emoji: '🍅', category: 'food' },
  { id: 'food_potato', english: 'potato', hebrew: 'תפוח אדמה', emoji: '🥔', category: 'food' },
  { id: 'food_corn', english: 'corn', hebrew: 'תירס', emoji: '🌽', category: 'food' },
  { id: 'food_broccoli', english: 'broccoli', hebrew: 'ברוקולי', emoji: '🥦', category: 'food' },
  { id: 'food_lettuce', english: 'lettuce', hebrew: 'חסה', emoji: '🥬', category: 'food' },
  { id: 'food_onion', english: 'onion', hebrew: 'בצל', emoji: '🧅', category: 'food' },
  { id: 'food_garlic', english: 'garlic', hebrew: 'שום', emoji: '🧄', category: 'food' },
  { id: 'food_pepper', english: 'pepper', hebrew: 'פלפל', emoji: '🫑', category: 'food' },
  { id: 'food_mushroom', english: 'mushroom', hebrew: 'פטריה', emoji: '🍄', category: 'food' },
  { id: 'food_eggplant', english: 'eggplant', hebrew: 'חציל', emoji: '🍆', category: 'food' },
  { id: 'food_peas', english: 'peas', hebrew: 'אפונה', emoji: '🫛', category: 'food' },
  { id: 'food_beans', english: 'beans', hebrew: 'שעועית', emoji: '🫘', category: 'food' },

  // Dairy
  { id: 'food_milk', english: 'milk', hebrew: 'חלב', emoji: '🥛', category: 'food' },
  { id: 'food_cheese', english: 'cheese', hebrew: 'גבינה', emoji: '🧀', category: 'food' },
  { id: 'food_butter', english: 'butter', hebrew: 'חמאה', emoji: '🧈', category: 'food' },
  { id: 'food_yogurt', english: 'yogurt', hebrew: 'יוגורט', emoji: '🥛', category: 'food' },
  { id: 'food_egg', english: 'egg', hebrew: 'ביצה', emoji: '🥚', category: 'food' },

  // Bread & grains
  { id: 'food_bread', english: 'bread', hebrew: 'לחם', emoji: '🍞', category: 'food' },
  { id: 'food_rice', english: 'rice', hebrew: 'אורז', emoji: '🍚', category: 'food' },
  { id: 'food_pasta', english: 'pasta', hebrew: 'פסטה', emoji: '🍝', category: 'food' },
  { id: 'food_cereal', english: 'cereal', hebrew: 'דגני בוקר', emoji: '🥣', category: 'food' },
  { id: 'food_sandwich', english: 'sandwich', hebrew: 'כריך', emoji: '🥪', category: 'food' },
  { id: 'food_toast', english: 'toast', hebrew: 'טוסט', emoji: '🍞', category: 'food' },
  { id: 'food_bagel', english: 'bagel', hebrew: 'בייגל', emoji: '🥯', category: 'food' },
  { id: 'food_croissant', english: 'croissant', hebrew: 'קרואסון', emoji: '🥐', category: 'food' },
  { id: 'food_pretzel', english: 'pretzel', hebrew: 'בייגלה', emoji: '🥨', category: 'food' },
  { id: 'food_pancake', english: 'pancake', hebrew: 'פנקייק', emoji: '🥞', category: 'food' },
  { id: 'food_waffle', english: 'waffle', hebrew: 'וופל', emoji: '🧇', category: 'food' },

  // Meals
  { id: 'food_pizza', english: 'pizza', hebrew: 'פיצה', emoji: '🍕', category: 'food' },
  { id: 'food_hamburger', english: 'hamburger', hebrew: 'המבורגר', emoji: '🍔', category: 'food' },
  { id: 'food_hotdog', english: 'hot dog', hebrew: 'נקניקייה', emoji: '🌭', category: 'food' },
  { id: 'food_fries', english: 'french fries', hebrew: 'צ\'יפס', emoji: '🍟', category: 'food' },
  { id: 'food_chicken', english: 'chicken', hebrew: 'עוף', emoji: '🍗', category: 'food' },
  { id: 'food_meat', english: 'meat', hebrew: 'בשר', emoji: '🥩', category: 'food' },
  { id: 'food_fish', english: 'fish', hebrew: 'דג', emoji: '🐟', category: 'food' },
  { id: 'food_soup', english: 'soup', hebrew: 'מרק', emoji: '🍲', category: 'food' },
  { id: 'food_salad', english: 'salad', hebrew: 'סלט', emoji: '🥗', category: 'food' },
  { id: 'food_taco', english: 'taco', hebrew: 'טאקו', emoji: '🌮', category: 'food' },
  { id: 'food_burrito', english: 'burrito', hebrew: 'בוריטו', emoji: '🌯', category: 'food' },
  { id: 'food_sushi', english: 'sushi', hebrew: 'סושי', emoji: '🍣', category: 'food' },

  // Sweets & desserts
  { id: 'food_ice_cream', english: 'ice cream', hebrew: 'גלידה', emoji: '🍦', category: 'food' },
  { id: 'food_cookie', english: 'cookie', hebrew: 'עוגייה', emoji: '🍪', category: 'food' },
  { id: 'food_cake', english: 'cake', hebrew: 'עוגה', emoji: '🎂', category: 'food' },
  { id: 'food_chocolate', english: 'chocolate', hebrew: 'שוקולד', emoji: '🍫', category: 'food' },
  { id: 'food_candy', english: 'candy', hebrew: 'סוכריה', emoji: '🍬', category: 'food' },
  { id: 'food_lollipop', english: 'lollipop', hebrew: 'סוכרייה על מקל', emoji: '🍭', category: 'food' },
  { id: 'food_donut', english: 'donut', hebrew: 'סופגנייה', emoji: '🍩', category: 'food' },
  { id: 'food_cupcake', english: 'cupcake', hebrew: 'קאפקייק', emoji: '🧁', category: 'food' },
  { id: 'food_pie', english: 'pie', hebrew: 'פאי', emoji: '🥧', category: 'food' },
  { id: 'food_honey', english: 'honey', hebrew: 'דבש', emoji: '🍯', category: 'food' },

  // Drinks
  { id: 'food_water', english: 'water', hebrew: 'מים', emoji: '💧', category: 'food' },
  { id: 'food_juice', english: 'juice', hebrew: 'מיץ', emoji: '🧃', category: 'food' },
  { id: 'food_tea', english: 'tea', hebrew: 'תה', emoji: '🍵', category: 'food' },
  { id: 'food_coffee', english: 'coffee', hebrew: 'קפה', emoji: '☕', category: 'food' },
  { id: 'food_soda', english: 'soda', hebrew: 'סודה', emoji: '🥤', category: 'food' },
  { id: 'food_smoothie', english: 'smoothie', hebrew: 'שייק', emoji: '🥤', category: 'food' },

  // Condiments & extras
  { id: 'food_salt', english: 'salt', hebrew: 'מלח', emoji: '🧂', category: 'food' },
  { id: 'food_sugar', english: 'sugar', hebrew: 'סוכר', emoji: '🍬', category: 'food' },
  { id: 'food_ketchup', english: 'ketchup', hebrew: 'קטשופ', emoji: '🍅', category: 'food' },
  { id: 'food_mustard', english: 'mustard', hebrew: 'חרדל', emoji: '🟡', category: 'food' },
  { id: 'food_jam', english: 'jam', hebrew: 'ריבה', emoji: '🍓', category: 'food' },

  // Snacks
  { id: 'food_popcorn', english: 'popcorn', hebrew: 'פופקורן', emoji: '🍿', category: 'food' },
  { id: 'food_chips', english: 'chips', hebrew: 'חטיפים', emoji: '🥔', category: 'food' },
  { id: 'food_peanuts', english: 'peanuts', hebrew: 'בוטנים', emoji: '🥜', category: 'food' },
  { id: 'food_nuts', english: 'nuts', hebrew: 'אגוזים', emoji: '🥜', category: 'food' },
];
