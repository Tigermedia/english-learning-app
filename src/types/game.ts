import type { CategoryId, VocabularyItem } from './vocabulary';

// Difficulty settings
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface DifficultyConfig {
  id: Difficulty;
  nameHebrew: string;           // e.g., "קל", "בינוני", "קשה"
  timerSeconds: number;          // 15, 10, or 5
  optionsCount: number;          // 2, 3, or 4
  xpMultiplier: number;          // 1, 1.5, or 2
  learningPhaseSeconds: number;  // Time to study each word
}

// Session duration options
export type SessionDuration = 2 | 5 | 10; // minutes

// Question types
export type QuestionType =
  | 'emoji-to-word'    // Show emoji, pick English word
  | 'word-to-emoji'    // Show English word, pick emoji
  | 'audio-to-word';   // Play audio, pick English word

// Answer option (can be text or emoji based on question type)
export interface AnswerOption {
  id: string;
  display: string;               // What to show (word or emoji)
  isCorrect: boolean;
}

// A single question in a quiz
export interface Question {
  id: string;
  type: QuestionType;
  item: VocabularyItem;          // The correct answer item
  options: AnswerOption[];       // All answer choices (shuffled)
  correctIndex: number;          // Index of correct answer
}

// Record of a single answer
export interface AnswerRecord {
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
  timeToAnswer: number;          // milliseconds
}

// Game session state
export interface GameSession {
  id: string;
  categories: CategoryId[];      // Selected categories
  difficulty: Difficulty;
  duration: SessionDuration;

  // Learning phase
  learningItems: VocabularyItem[];
  currentLearningIndex: number;
  learningComplete: boolean;

  // Question phase
  questions: Question[];
  currentQuestionIndex: number;
  answers: AnswerRecord[];

  // Timing
  startTime: number;
  endTime?: number;
  timeRemaining: number;

  // Status
  phase: 'learning' | 'questions' | 'results';
  isPaused: boolean;
}

// Session results
export interface SessionResults {
  sessionId: string;
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;              // 0-100
  xpEarned: number;
  starsEarned: number;           // 0-3
  newLevel?: number;             // If leveled up
  timeSpent: number;             // seconds
}

// Game settings selection
export interface GameSettings {
  categories: CategoryId[];
  difficulty: Difficulty;
  duration: SessionDuration;
}
