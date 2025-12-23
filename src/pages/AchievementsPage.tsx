import { motion } from 'framer-motion';
import { AppShell } from '../components/layout';
import { Card } from '../components/ui';
import { useProgress } from '../store';
import { badges } from '../data/achievements';

export function AchievementsPage() {
  const { progress } = useProgress();

  const earnedCount = progress.earnedBadges.length;
  const totalBadges = badges.length;

  return (
    <AppShell totalXP={progress.totalXP}>
      <div className="flex flex-col gap-6 py-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold text-text">
            🏆 ההישגים שלי
          </h1>
          <p className="text-text-light mt-1">
            {earnedCount}/{totalBadges} הישגים
          </p>
        </motion.div>

        {/* Badges Grid */}
        <div className="grid grid-cols-3 gap-3">
          {badges.map((badge, index) => {
            const isEarned = progress.earnedBadges.includes(badge.id);

            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  variant={isEarned ? 'elevated' : 'outline'}
                  padding="sm"
                  className={`
                    text-center
                    ${!isEarned ? 'opacity-40 grayscale' : ''}
                  `}
                >
                  <span className={`text-4xl block mb-2 ${isEarned ? '' : 'filter blur-sm'}`}>
                    {badge.emoji}
                  </span>
                  <p className="text-xs font-bold text-text truncate">
                    {badge.nameHebrew}
                  </p>
                  {isEarned && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-success text-xs"
                    >
                      ✓
                    </motion.span>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Next Achievement Hint */}
        {earnedCount < totalBadges && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Card variant="outline" padding="sm">
              <div className="flex items-center gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <p className="font-semibold text-text text-sm">המשיכו לשחק!</p>
                  <p className="text-xs text-text-light">
                    כל משחק מקרב אתכם להישג הבא
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </AppShell>
  );
}
