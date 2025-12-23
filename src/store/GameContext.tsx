import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type {
  GameSession,
  GameSettings,
  Question,
  AnswerRecord,
  VocabularyItem,
  QuestionType,
  AnswerOption,
} from '../types';
import { getVocabularyByCategories } from '../data/categories';
import { getDifficultyConfig } from '../data/levels';

// Helper to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Generate a unique ID
function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

// Generate questions from vocabulary
function generateQuestions(
  items: VocabularyItem[],
  optionsCount: number,
  questionCount: number
): Question[] {
  const questions: Question[] = [];
  const shuffledItems = shuffleArray(items);
  const questionTypes: QuestionType[] = ['emoji-to-word', 'word-to-emoji', 'audio-to-word'];

  for (let i = 0; i < Math.min(questionCount, shuffledItems.length); i++) {
    const item = shuffledItems[i];
    const type = questionTypes[Math.floor(Math.random() * questionTypes.length)];

    // Get wrong options from other items
    const otherItems = shuffledItems.filter((_, idx) => idx !== i);
    const wrongOptions = shuffleArray(otherItems).slice(0, optionsCount - 1);

    // Create answer options
    const options: AnswerOption[] = [
      {
        id: item.id,
        display: type === 'word-to-emoji' ? item.emoji : item.english,
        isCorrect: true,
      },
      ...wrongOptions.map((wrongItem) => ({
        id: wrongItem.id,
        display: type === 'word-to-emoji' ? wrongItem.emoji : wrongItem.english,
        isCorrect: false,
      })),
    ];

    // Shuffle options and find correct index
    const shuffledOptions = shuffleArray(options);
    const correctIndex = shuffledOptions.findIndex((opt) => opt.isCorrect);

    questions.push({
      id: generateId(),
      type,
      item,
      options: shuffledOptions,
      correctIndex,
    });
  }

  return questions;
}

// Calculate questions per minute based on difficulty
function getQuestionsPerSession(durationMinutes: number, difficulty: string): number {
  const config = getDifficultyConfig(difficulty);
  // Roughly calculate: time per question = learning time + answer time
  const avgTimePerQuestion = config.learningPhaseSeconds + config.timerSeconds;
  const totalSeconds = durationMinutes * 60;
  return Math.floor(totalSeconds / avgTimePerQuestion);
}

// Action types
type GameAction =
  | { type: 'START_GAME'; payload: GameSettings }
  | { type: 'ADVANCE_LEARNING' }
  | { type: 'COMPLETE_LEARNING' }
  | { type: 'ANSWER_QUESTION'; payload: { selectedIndex: number; timeToAnswer: number } }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PAUSE_GAME' }
  | { type: 'RESUME_GAME' }
  | { type: 'END_GAME' }
  | { type: 'RESET_GAME' };

interface GameState {
  session: GameSession | null;
  isActive: boolean;
}

const initialState: GameState = {
  session: null,
  isActive: false,
};

// Reducer
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME': {
      const { categories, difficulty, duration } = action.payload;
      const allVocabulary = getVocabularyByCategories(categories);
      const config = getDifficultyConfig(difficulty);
      const questionCount = getQuestionsPerSession(duration, difficulty);

      // Select vocabulary for learning (subset for the session)
      const learningItems = shuffleArray(allVocabulary).slice(
        0,
        Math.min(questionCount, allVocabulary.length)
      );

      // Generate questions
      const questions = generateQuestions(
        learningItems,
        config.optionsCount,
        questionCount
      );

      const session: GameSession = {
        id: generateId(),
        categories,
        difficulty,
        duration,
        learningItems,
        currentLearningIndex: 0,
        learningComplete: false,
        questions,
        currentQuestionIndex: 0,
        answers: [],
        startTime: Date.now(),
        timeRemaining: duration * 60,
        phase: 'learning',
        isPaused: false,
      };

      return { session, isActive: true };
    }

    case 'ADVANCE_LEARNING': {
      if (!state.session) return state;
      const nextIndex = state.session.currentLearningIndex + 1;
      const isComplete = nextIndex >= state.session.learningItems.length;

      return {
        ...state,
        session: {
          ...state.session,
          currentLearningIndex: nextIndex,
          learningComplete: isComplete,
          phase: isComplete ? 'questions' : 'learning',
        },
      };
    }

    case 'COMPLETE_LEARNING': {
      if (!state.session) return state;
      return {
        ...state,
        session: {
          ...state.session,
          learningComplete: true,
          phase: 'questions',
        },
      };
    }

    case 'ANSWER_QUESTION': {
      if (!state.session) return state;
      const { selectedIndex, timeToAnswer } = action.payload;
      const currentQuestion = state.session.questions[state.session.currentQuestionIndex];
      const isCorrect = selectedIndex === currentQuestion.correctIndex;

      const answerRecord: AnswerRecord = {
        questionId: currentQuestion.id,
        selectedIndex,
        isCorrect,
        timeToAnswer,
      };

      return {
        ...state,
        session: {
          ...state.session,
          answers: [...state.session.answers, answerRecord],
        },
      };
    }

    case 'NEXT_QUESTION': {
      if (!state.session) return state;
      const nextIndex = state.session.currentQuestionIndex + 1;
      const isComplete = nextIndex >= state.session.questions.length;

      return {
        ...state,
        session: {
          ...state.session,
          currentQuestionIndex: nextIndex,
          phase: isComplete ? 'results' : 'questions',
          endTime: isComplete ? Date.now() : undefined,
        },
      };
    }

    case 'PAUSE_GAME': {
      if (!state.session) return state;
      return {
        ...state,
        session: { ...state.session, isPaused: true },
      };
    }

    case 'RESUME_GAME': {
      if (!state.session) return state;
      return {
        ...state,
        session: { ...state.session, isPaused: false },
      };
    }

    case 'END_GAME': {
      if (!state.session) return state;
      return {
        ...state,
        session: {
          ...state.session,
          phase: 'results',
          endTime: Date.now(),
        },
      };
    }

    case 'RESET_GAME':
      return initialState;

    default:
      return state;
  }
}

// Context
interface GameContextType {
  session: GameSession | null;
  isActive: boolean;
  startGame: (settings: GameSettings) => void;
  advanceLearning: () => void;
  completeLearning: () => void;
  answerQuestion: (selectedIndex: number, timeToAnswer: number) => void;
  nextQuestion: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  endGame: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | null>(null);

// Provider
interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const startGame = (settings: GameSettings) =>
    dispatch({ type: 'START_GAME', payload: settings });
  const advanceLearning = () => dispatch({ type: 'ADVANCE_LEARNING' });
  const completeLearning = () => dispatch({ type: 'COMPLETE_LEARNING' });
  const answerQuestion = (selectedIndex: number, timeToAnswer: number) =>
    dispatch({ type: 'ANSWER_QUESTION', payload: { selectedIndex, timeToAnswer } });
  const nextQuestion = () => dispatch({ type: 'NEXT_QUESTION' });
  const pauseGame = () => dispatch({ type: 'PAUSE_GAME' });
  const resumeGame = () => dispatch({ type: 'RESUME_GAME' });
  const endGame = () => dispatch({ type: 'END_GAME' });
  const resetGame = () => dispatch({ type: 'RESET_GAME' });

  return (
    <GameContext.Provider
      value={{
        session: state.session,
        isActive: state.isActive,
        startGame,
        advanceLearning,
        completeLearning,
        answerQuestion,
        nextQuestion,
        pauseGame,
        resumeGame,
        endGame,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

// Hook
export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
