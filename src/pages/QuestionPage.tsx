import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame, useProgress } from '../store';
import { getDifficultyConfig, calculateXP } from '../data/levels';
import { ProgressBar } from '../components/ui';

export function QuestionPage() {
  const navigate = useNavigate();
  const { session, answerQuestion, nextQuestion } = useGame();
  const { addXP, recordAnswer } = useProgress();

  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [streak, setStreak] = useState(0);
  const questionStartTime = useRef(Date.now());

  // Redirect if no session or learning not complete
  useEffect(() => {
    if (!session) {
      navigate('/settings');
    } else if (!session.learningComplete) {
      navigate('/learn');
    } else if (session.phase === 'results') {
      navigate('/results');
    }
  }, [session, navigate]);

  // Get current question and config
  const config = session ? getDifficultyConfig(session.difficulty) : null;
  const currentQuestion = session?.questions[session.currentQuestionIndex];
  const totalQuestions = session?.questions.length || 0;
  const currentIndex = session?.currentQuestionIndex || 0;

  // Initialize timer for current question
  useEffect(() => {
    if (config && currentQuestion) {
      setTimeLeft(config.timerSeconds);
      questionStartTime.current = Date.now();
      setSelectedIndex(null);
      setShowFeedback(false);
    }
  }, [currentIndex, config, currentQuestion]);

  // Countdown timer
  useEffect(() => {
    if (!session || session.isPaused || showFeedback || !currentQuestion) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up - count as wrong answer
          handleAnswer(-1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [session, showFeedback, currentQuestion]);

  // Speak function for audio questions
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  // Auto-speak for audio questions
  useEffect(() => {
    if (currentQuestion?.type === 'audio-to-word' && !showFeedback) {
      const timer = setTimeout(() => {
        speak(currentQuestion.item.english);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentQuestion, showFeedback]);

  // Handle answer selection
  const handleAnswer = (index: number) => {
    if (showFeedback || selectedIndex !== null) return;

    const timeToAnswer = Date.now() - questionStartTime.current;
    const isCorrect = index === currentQuestion?.correctIndex;

    setSelectedIndex(index);
    setShowFeedback(true);

    // Record the answer
    answerQuestion(index, timeToAnswer);

    // Update progress
    if (currentQuestion) {
      recordAnswer(currentQuestion.item.category, currentQuestion.item.id, isCorrect);

      if (isCorrect && config) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        const xp = calculateXP(
          session!.difficulty,
          timeToAnswer,
          config.timerSeconds,
          newStreak
        );
        addXP(xp);
      } else {
        setStreak(0);
      }
    }

    // Move to next question after delay
    setTimeout(() => {
      nextQuestion();
    }, 1500);
  };

  if (!session || !currentQuestion || !config) {
    return null;
  }

  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;
  const isCorrect = selectedIndex === currentQuestion.correctIndex;

  // Determine what to display based on question type
  const getQuestionDisplay = () => {
    switch (currentQuestion.type) {
      case 'emoji-to-word':
        return (
          <span className="emoji-display-large">{currentQuestion.item.emoji}</span>
        );
      case 'word-to-emoji':
        return (
          <span className="text-3xl font-bold text-primary">
            {currentQuestion.item.english}
          </span>
        );
      case 'audio-to-word':
        return (
          <button
            onClick={() => speak(currentQuestion.item.english)}
            className="text-6xl animate-pulse-glow p-6 bg-primary/10 rounded-full"
          >
            🔊
          </button>
        );
    }
  };

  const getQuestionPrompt = () => {
    switch (currentQuestion.type) {
      case 'emoji-to-word':
        return 'מה השם באנגלית?';
      case 'word-to-emoji':
        return 'בחרו את הציור המתאים';
      case 'audio-to-word':
        return 'מה שמעתם?';
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card shadow-md px-4 py-3">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-light">
              שאלה {currentIndex + 1} מתוך {totalQuestions}
            </span>
            <div className="flex items-center gap-4">
              {streak > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1 bg-success/20 px-2 py-1 rounded-full"
                >
                  <span>🔥</span>
                  <span className="text-sm font-bold text-success">{streak}</span>
                </motion.div>
              )}
              <div className={`
                flex items-center gap-2 px-3 py-1 rounded-full
                ${timeLeft <= 3 ? 'bg-red-100 animate-pulse' : 'bg-accent/20'}
              `}>
                <span className="text-lg">⏱️</span>
                <span className={`font-bold ${timeLeft <= 3 ? 'text-red-500' : 'text-primary'}`}>
                  {timeLeft}
                </span>
              </div>
            </div>
          </div>
          <ProgressBar progress={progressPercent} color="secondary" size="sm" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Question Prompt */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-lg text-text-light mb-6"
          >
            {getQuestionPrompt()}
          </motion.p>

          {/* Question Display */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex justify-center mb-8"
          >
            {getQuestionDisplay()}
          </motion.div>

          {/* Answer Options */}
          <div className="grid grid-cols-2 gap-3">
            <AnimatePresence>
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedIndex === index;
                const isCorrectAnswer = index === currentQuestion.correctIndex;
                const showAsCorrect = showFeedback && isCorrectAnswer;
                const showAsWrong = showFeedback && isSelected && !isCorrectAnswer;

                return (
                  <motion.button
                    key={option.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={!showFeedback ? { scale: 1.05 } : undefined}
                    whileTap={!showFeedback ? { scale: 0.95 } : undefined}
                    onClick={() => handleAnswer(index)}
                    disabled={showFeedback}
                    className={`
                      py-6 px-4 rounded-2xl font-bold text-lg
                      transition-all duration-200
                      ${showAsCorrect
                        ? 'bg-success text-white ring-4 ring-success/50'
                        : showAsWrong
                        ? 'bg-red-500 text-white ring-4 ring-red-500/50'
                        : isSelected
                        ? 'bg-primary text-white'
                        : 'bg-card shadow-md hover:shadow-lg'
                      }
                    `}
                  >
                    {currentQuestion.type === 'word-to-emoji' ? (
                      <span className="text-4xl">{option.display}</span>
                    ) : (
                      <span>{option.display}</span>
                    )}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Feedback Overlay */}
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 text-center"
              >
                {isCorrect ? (
                  <div className="text-success">
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-5xl block"
                    >
                      🎉
                    </motion.span>
                    <p className="font-bold text-lg mt-2">מעולה!</p>
                  </div>
                ) : (
                  <div className="text-text-light">
                    <span className="text-4xl block">💪</span>
                    <p className="font-bold text-lg mt-2">נסו שוב בפעם הבאה!</p>
                    <p className="text-sm mt-1">
                      התשובה הנכונה: {currentQuestion.item.english}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
