import { motion } from 'framer-motion';
import { AppShell } from '../components/layout';
import { Card, ProgressBar } from '../components/ui';
import { useProgress } from '../store';
import { categories } from '../data/categories';

export function ProgressPage() {
  const { progress } = useProgress();

  const overallAccuracy = progress.totalQuestionsAnswered > 0
    ? Math.round((progress.totalCorrectAnswers / progress.totalQuestionsAnswered) * 100)
    : 0;

  return (
    <AppShell totalXP={progress.totalXP}>
      <div className="flex flex-col gap-6 py-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-text text-center"
        >
          📊 ההתקדמות שלי
        </motion.h1>

        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card variant="elevated">
            <h2 className="font-bold text-text mb-4">סטטיסטיקות כלליות</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-primary/10 rounded-xl">
                <p className="text-3xl font-bold text-primary">{progress.totalXP}</p>
                <p className="text-xs text-text-light">נקודות XP</p>
              </div>
              <div className="text-center p-3 bg-secondary/10 rounded-xl">
                <p className="text-3xl font-bold text-secondary">{progress.totalSessions}</p>
                <p className="text-xs text-text-light">משחקים</p>
              </div>
              <div className="text-center p-3 bg-success/10 rounded-xl">
                <p className="text-3xl font-bold text-success">{overallAccuracy}%</p>
                <p className="text-xs text-text-light">דיוק</p>
              </div>
              <div className="text-center p-3 bg-accent/10 rounded-xl">
                <p className="text-3xl font-bold text-warning">{progress.longestStreak}</p>
                <p className="text-xs text-text-light">רצף שיא</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Category Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="font-bold text-text mb-3">התקדמות לפי קטגוריה</h2>
          <div className="flex flex-col gap-3">
            {categories.map((category, index) => {
              const catProgress = progress.categoryProgress[category.id];
              const wordsLearned = catProgress?.wordsLearned || 0;
              const wordsMastered = catProgress?.wordsMastered || 0;
              const totalWords = category.items.length;
              const progressPercent = Math.round((wordsLearned / totalWords) * 100);
              const masteryPercent = Math.round((wordsMastered / totalWords) * 100);

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Card variant="colored" colorClass={category.color} padding="sm">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{category.emoji}</span>
                      <div className="flex-1">
                        <p className="font-bold text-text">{category.nameHebrew}</p>
                        <p className="text-xs text-text-light">
                          {wordsLearned}/{totalWords} מילים נלמדו
                        </p>
                      </div>
                      <div className="text-left">
                        <p className="text-lg font-bold text-primary">{progressPercent}%</p>
                      </div>
                    </div>
                    <ProgressBar progress={progressPercent} color="primary" size="sm" />
                    {wordsMastered > 0 && (
                      <p className="text-xs text-success mt-2">
                        ⭐ {wordsMastered} מילים נשלטו ({masteryPercent}%)
                      </p>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AppShell>
  );
}
