import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from '../ui';
import { getLevelInfo, getLevelProgress } from '../../data/levels';

interface HeaderProps {
  totalXP: number;
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
}

export function Header({ totalXP, showBack = false, onBack, title }: HeaderProps) {
  const navigate = useNavigate();
  const levelInfo = getLevelInfo(totalXP);
  const levelProgress = getLevelProgress(totalXP);

  return (
    <header className="sticky top-0 z-50 bg-card shadow-md px-4 py-3">
      <div className="max-w-lg mx-auto flex items-center justify-between gap-4">
        {/* Back button or spacer */}
        <div className="w-10">
          {showBack && onBack && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-xl"
              aria-label="חזרה"
            >
              ➡️
            </motion.button>
          )}
        </div>

        {/* Title or XP display */}
        {title ? (
          <h1 className="text-lg font-bold text-text">{title}</h1>
        ) : (
          <div className="flex-1 flex items-center gap-3">
            {/* Level badge */}
            <motion.div
              className="flex items-center gap-1 bg-accent/20 px-3 py-1 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-xl">{levelInfo.emoji}</span>
              <span className="font-bold text-sm">{levelInfo.level}</span>
            </motion.div>

            {/* XP Progress */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-text-light">{levelInfo.title}</span>
                <span className="text-xs font-semibold text-primary">{totalXP} XP</span>
              </div>
              <ProgressBar progress={levelProgress} size="sm" color="accent" />
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* Parents info button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/parents')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-lg"
            aria-label="מידע להורים"
          >
            ℹ️
          </motion.button>

          {/* Settings button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/settings')}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-xl"
            aria-label="הגדרות"
          >
            ⚙️
          </motion.button>
        </div>
      </div>
    </header>
  );
}
