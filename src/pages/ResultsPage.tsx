import { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGame, useProgress } from '../store';
import { calculateStars } from '../data/levels';
import { checkBadges } from '../utils/checkBadges';
import { Button, Card } from '../components/ui';

export function ResultsPage() {
  const navigate = useNavigate();
  const { session, resetGame } = useGame();
  const { progress, incrementSessions, updateStreak, earnBadge } = useProgress();
  const badgesCheckedRef = useRef(false);

  // Redirect if no session
  useEffect(() => {
    if (!session) {
      navigate('/');
    }
  }, [session, navigate]);

  // Update progress on first load
  useEffect(() => {
    if (session?.phase === 'results') {
      incrementSessions();
      updateStreak();
    }
  }, []);

  // Check and award badges after progress is updated
  useEffect(() => {
    if (session?.phase === 'results' && !badgesCheckedRef.current) {
      badgesCheckedRef.current = true;

      // Calculate accuracy for badge checking
      const totalQuestions = session.questions.length;
      const correctAnswers = session.answers.filter((a) => a.isCorrect).length;
      const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

      // Check which badges should be awarded
      const newBadges = checkBadges(progress, { sessionAccuracy: accuracy });

      // Award each new badge
      newBadges.forEach((badgeId) => {
        earnBadge(badgeId);
      });
    }
  }, [session, progress, earnBadge]);

  // Calculate results
  const results = useMemo(() => {
    if (!session) return null;

    const totalQuestions = session.questions.length;
    const correctAnswers = session.answers.filter((a) => a.isCorrect).length;
    const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
    const stars = calculateStars(accuracy);

    // Calculate total XP earned (already added during gameplay)
    const xpEarned = session.answers
      .filter((a) => a.isCorrect)
      .length * 10; // Simplified calculation

    const timeSpent = session.endTime
      ? Math.round((session.endTime - session.startTime) / 1000)
      : 0;

    return {
      totalQuestions,
      correctAnswers,
      accuracy,
      stars,
      xpEarned,
      timeSpent,
    };
  }, [session]);

  const handlePlayAgain = () => {
    resetGame();
    navigate('/settings');
  };

  const handleGoHome = () => {
    resetGame();
    navigate('/');
  };

  if (!session || !results) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Celebration Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
            className="text-6xl mb-4"
          >
            {results.accuracy >= 80 ? '🎉' : results.accuracy >= 50 ? '👏' : '💪'}
          </motion.div>
          <h1 className="text-3xl font-bold text-text">
            {results.accuracy >= 80 ? 'מדהים!' : results.accuracy >= 50 ? 'יפה מאוד!' : 'כל הכבוד!'}
          </h1>
          <p className="text-text-light mt-2">
            סיימת את המשחק!
          </p>
        </motion.div>

        {/* Stars Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-4 mb-8"
        >
          {[1, 2, 3].map((star, index) => (
            <motion.span
              key={star}
              initial={{ scale: 0, rotate: -180 }}
              animate={{
                scale: star <= results.stars ? 1 : 0.5,
                rotate: 0,
                opacity: star <= results.stars ? 1 : 0.3,
              }}
              transition={{
                delay: 0.5 + index * 0.2,
                type: 'spring',
                bounce: 0.5,
              }}
              className={`text-5xl ${star <= results.stars ? 'animate-star-spin' : 'grayscale'}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              ⭐
            </motion.span>
          ))}
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card variant="elevated" className="mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-primary/10 rounded-xl">
                <p className="text-3xl font-bold text-primary">{results.accuracy}%</p>
                <p className="text-sm text-text-light">דיוק</p>
              </div>
              <div className="text-center p-4 bg-success/10 rounded-xl">
                <p className="text-3xl font-bold text-success">
                  {results.correctAnswers}/{results.totalQuestions}
                </p>
                <p className="text-sm text-text-light">תשובות נכונות</p>
              </div>
              <div className="text-center p-4 bg-accent/10 rounded-xl">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-3xl font-bold text-warning"
                >
                  +{results.xpEarned}
                </motion.p>
                <p className="text-sm text-text-light">נקודות XP</p>
              </div>
              <div className="text-center p-4 bg-secondary/10 rounded-xl">
                <p className="text-3xl font-bold text-secondary">
                  {Math.floor(results.timeSpent / 60)}:{String(results.timeSpent % 60).padStart(2, '0')}
                </p>
                <p className="text-sm text-text-light">זמן משחק</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Encouragement Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-6"
        >
          <Card variant="outline" padding="sm">
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                {results.accuracy >= 80 ? '🌟' : results.accuracy >= 50 ? '📈' : '💡'}
              </span>
              <p className="text-sm text-text-light">
                {results.accuracy >= 80
                  ? 'אתם אלופים! המשיכו כך!'
                  : results.accuracy >= 50
                  ? 'התקדמות יפה! עוד קצת תרגול ותהיו מושלמים!'
                  : 'כל תרגול עוזר! נסו שוב ותראו שיפור!'}
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col gap-3"
        >
          <Button
            size="lg"
            fullWidth
            onClick={handlePlayAgain}
          >
            🎮 שחק שוב
          </Button>
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={handleGoHome}
          >
            🏠 חזרה הביתה
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
