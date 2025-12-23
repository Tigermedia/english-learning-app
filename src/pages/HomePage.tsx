import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppShell } from '../components/layout';
import { Button, Card } from '../components/ui';
import { useProgress } from '../store';
import { categories } from '../data/categories';
import { getLevelInfo } from '../data/levels';

export function HomePage() {
  const navigate = useNavigate();
  const { progress } = useProgress();
  const levelInfo = getLevelInfo(progress.totalXP);

  return (
    <AppShell totalXP={progress.totalXP}>
      <div className="flex flex-col items-center gap-6 py-4">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-text mb-2">
            שלום! 👋
          </h1>
          <p className="text-text-light">
            בואו נלמד אנגלית ביחד!
          </p>
        </motion.div>

        {/* Level Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full"
        >
          <Card variant="elevated" className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-5xl animate-float">{levelInfo.emoji}</span>
              <div>
                <p className="text-sm text-text-light">דרגה {levelInfo.level}</p>
                <p className="text-xl font-bold text-primary">{levelInfo.title}</p>
              </div>
            </div>
            <div className="flex justify-around text-center">
              <div>
                <p className="text-2xl font-bold text-accent">{progress.totalXP}</p>
                <p className="text-xs text-text-light">נקודות XP</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">{progress.totalSessions}</p>
                <p className="text-xs text-text-light">משחקים</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-success">{progress.currentStreak}</p>
                <p className="text-xs text-text-light">ימים ברצף</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Start Game Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full"
        >
          <Button
            size="xl"
            fullWidth
            onClick={() => navigate('/settings')}
            className="animate-pulse-glow"
          >
            🎮 התחל משחק!
          </Button>
        </motion.div>

        {/* Quick Category Access */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full"
        >
          <h2 className="text-lg font-semibold text-text mb-3">
            קטגוריות
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category, index) => {
              const categoryProgress = progress.categoryProgress[category.id];
              const wordsLearned = categoryProgress?.wordsLearned || 0;
              const totalWords = category.items.length;
              const progressPercent = Math.round((wordsLearned / totalWords) * 100);

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Card
                    variant="colored"
                    colorClass={category.color}
                    interactive
                    padding="sm"
                    onClick={() => navigate('/settings', { state: { category: category.id } })}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{category.emoji}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-text">{category.nameHebrew}</p>
                        <p className="text-xs text-text-light">
                          {wordsLearned}/{totalWords} מילים
                        </p>
                        {/* Mini progress bar */}
                        <div className="mt-1 h-1 bg-white/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all duration-500"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Tip of the day */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="w-full"
        >
          <Card variant="outline" padding="sm">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <p className="font-semibold text-text text-sm">טיפ היום</p>
                <p className="text-xs text-text-light">
                  תרגול יומי קצר יעזור לך לזכור את המילים טוב יותר!
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </AppShell>
  );
}
