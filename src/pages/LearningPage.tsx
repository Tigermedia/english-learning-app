import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../store';
import { getDifficultyConfig } from '../data/levels';
import { Button, Card, ProgressBar } from '../components/ui';

export function LearningPage() {
  const navigate = useNavigate();
  const { session, advanceLearning, completeLearning } = useGame();

  const [timeLeft, setTimeLeft] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Redirect if no session
  useEffect(() => {
    if (!session) {
      navigate('/settings');
    }
  }, [session, navigate]);

  // Get current item and config
  const config = session ? getDifficultyConfig(session.difficulty) : null;
  const currentItem = session?.learningItems[session.currentLearningIndex];
  const totalItems = session?.learningItems.length || 0;
  const currentIndex = session?.currentLearningIndex || 0;

  // Initialize timer for current item
  useEffect(() => {
    if (config) {
      setTimeLeft(config.learningPhaseSeconds);
    }
  }, [currentIndex, config]);

  // Countdown timer
  useEffect(() => {
    if (!session || session.isPaused || isTransitioning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNext();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [session, isTransitioning]);

  // Handle next item
  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setTimeout(() => {
      if (currentIndex >= totalItems - 1) {
        completeLearning();
        navigate('/play');
      } else {
        advanceLearning();
      }
      setIsTransitioning(false);
    }, 300);
  }, [currentIndex, totalItems, advanceLearning, completeLearning, navigate, isTransitioning]);

  // Skip to questions
  const handleSkipToQuestions = () => {
    completeLearning();
    navigate('/play');
  };

  // Speak the English word
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  // Auto-speak when item changes
  useEffect(() => {
    if (currentItem && !isTransitioning) {
      const timer = setTimeout(() => {
        speak(currentItem.english);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentItem, isTransitioning]);

  if (!session || !currentItem || !config) {
    return null;
  }

  const progressPercent = ((currentIndex + 1) / totalItems) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card shadow-md px-4 py-3">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-light">
              מילה {currentIndex + 1} מתוך {totalItems}
            </span>
            <div className="flex items-center gap-2 bg-accent/20 px-3 py-1 rounded-full">
              <span className="text-lg">⏱️</span>
              <span className="font-bold text-primary">{timeLeft}</span>
            </div>
          </div>
          <ProgressBar progress={progressPercent} color="primary" size="sm" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-md"
          >
            <Card variant="elevated" className="text-center py-10">
              {/* Emoji */}
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="emoji-display-large block mb-6"
              >
                {currentItem.emoji}
              </motion.span>

              {/* English Word */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-4"
              >
                <button
                  onClick={() => speak(currentItem.english)}
                  className="inline-flex items-center gap-2 text-3xl font-bold text-primary hover:text-primary-dark transition-colors"
                >
                  <span>{currentItem.english}</span>
                  <span className="text-2xl">🔊</span>
                </button>
              </motion.div>

              {/* Hebrew Translation */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-text-light"
              >
                {currentItem.hebrew}
              </motion.p>
            </Card>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Actions */}
      <footer className="sticky bottom-0 bg-card shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-4">
        <div className="max-w-lg mx-auto flex gap-3">
          <Button
            variant="outline"
            fullWidth
            onClick={handleSkipToQuestions}
          >
            דלג לשאלות ⏭️
          </Button>
          <Button
            variant="primary"
            fullWidth
            onClick={handleNext}
          >
            הבא ➡️
          </Button>
        </div>
      </footer>
    </div>
  );
}
