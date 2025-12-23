# אנגלית בכיף - English is Fun! 🎓

An engaging English learning app designed for Hebrew-speaking children ages 6-10. Features a full Hebrew RTL interface with gamified vocabulary learning.

## Features

- **Hebrew Interface**: Full RTL support with Hebrew instructions
- **5 Learning Categories**:
  - 🎨 Colors (צבעים) - 10 words
  - 🦁 Animals (חיות) - 15 words
  - 🔢 Numbers (מספרים) - 20 words (1-20)
  - 👨‍👩‍👧‍👦 Family (משפחה) - 10 words
  - 🍎 Food (אוכל) - 14 words
- **Gamification**: XP points, 10 levels, achievements
- **Three Difficulty Levels**: Easy, Medium, Hard
- **Audio Pronunciation**: Web Speech API for English words
- **Progress Tracking**: Local storage persistence
- **Mobile-Responsive**: Optimized for tablets

## Tech Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4
- Framer Motion
- React Router DOM

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Deployment

Deploy to Vercel:
```bash
npx vercel
```

## Project Structure

```
src/
├── components/      # UI and layout components
├── pages/           # Route pages (Home, Settings, Learning, etc.)
├── data/            # Vocabulary and achievement data
├── store/           # React Context providers
├── hooks/           # Custom React hooks
├── types/           # TypeScript interfaces
└── utils/           # Helper functions
```

## Game Flow

1. **Home** → View level and XP, start game
2. **Settings** → Select categories, difficulty, duration
3. **Learning Phase** → Study vocabulary with audio
4. **Question Phase** → Answer multiple choice questions
5. **Results** → View score, earn XP and stars

## License

Private project for personal use.
