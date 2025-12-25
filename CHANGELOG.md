# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-12-25

### Added

- **User Login System:**
  - Multi-user support with child profiles
  - Simple login (name + age only, no password)
  - Avatar/emoji selection for personalization
  - Automatic redirect to login if no user
- **Convex Backend Integration:**
  - Cloud database for user profiles and progress
  - Real-time progress synchronization across devices
  - Offline-first with automatic sync when online
  - Game session history stored in cloud
- **Parents Section:**
  - Research and pedagogy information in Hebrew
  - How the app works explanation
  - Benefits of early language learning
  - Tips for parents
  - Progress system explanation
- **Navigation:**
  - Parents info button (ℹ️) in header
  - Settings button now works correctly

### Fixed

- Settings button in header now navigates to settings page
- Easy difficulty now shows 4 answer options (was 2)
- Stars display now uses correct thresholds (30%/60%/90%)
- Achievements now properly awarded after completing games

### Changed

- Star thresholds adjusted: 30%+ = 1 star, 60%+ = 2 stars, 90%+ = 3 stars

## [1.0.2] - 2024-12-23

### Fixed

- Cleaned package-lock.json to remove Windows-specific optional dependencies

## [1.0.1] - 2024-12-23

### Fixed

- Removed Windows-specific dependencies (@rollup/rollup-win32-x64-msvc, lightningcss-win32-x64-msvc) that blocked Vercel deployment

### Added

- CHANGELOG.md for tracking changes
- Version bump scripts (npm run version:patch/minor/major)
- Version tracking file (src/version.ts)

## [1.0.0] - 2024-12-23

### Features

- Initial release of English Learning App for Hebrew-speaking children
- **5 Vocabulary Categories:**
  - Colors (10 words)
  - Animals (15 words)
  - Numbers 1-20 (20 words)
  - Family (10 words)
  - Food (14 words)
- **Game Features:**
  - Learning phase with vocabulary cards and audio pronunciation
  - Question phase with multiple choice answers
  - Three difficulty levels (Easy, Medium, Hard)
  - Configurable session duration (2, 5, or 10 minutes)
- **Gamification System:**
  - XP points earned for correct answers
  - 10 achievement levels with badges
  - Progress tracking per category
  - Streak counter for daily practice
- **UI/UX:**
  - Full Hebrew RTL interface
  - Child-friendly colorful design
  - Large touch targets for tablets
  - Smooth animations with Framer Motion
  - Bottom navigation bar
- **Technical:**
  - Web Speech API for English pronunciation
  - localStorage for progress persistence
  - Mobile-responsive design
  - Vercel deployment configuration

### Technical Stack
- React 19 + TypeScript
- Vite 7
- Tailwind CSS 3
- Framer Motion
- React Router DOM 7
