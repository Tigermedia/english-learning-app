import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppShell } from '../components/layout';
import { Button, Card } from '../components/ui';
import { useGame, useProgress } from '../store';
import { categories } from '../data/categories';
import { difficultyConfigs } from '../data/levels';
import type { CategoryId, Difficulty, SessionDuration } from '../types';

const durations: { value: SessionDuration; label: string }[] = [
  { value: 2, label: '2 דקות' },
  { value: 5, label: '5 דקות' },
  { value: 10, label: '10 דקות' },
];

export function SettingsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { startGame } = useGame();
  const { progress } = useProgress();

  // Get initial category from navigation state if provided
  const initialCategory = (location.state as { category?: CategoryId })?.category;

  const [selectedCategories, setSelectedCategories] = useState<CategoryId[]>(
    initialCategory ? [initialCategory] : ['colors', 'animals']
  );
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [duration, setDuration] = useState<SessionDuration>(5);

  const toggleCategory = (categoryId: CategoryId) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        // Don't allow deselecting if it's the last one
        if (prev.length === 1) return prev;
        return prev.filter((id) => id !== categoryId);
      }
      return [...prev, categoryId];
    });
  };

  const handleStartGame = () => {
    startGame({
      categories: selectedCategories,
      difficulty,
      duration,
    });
    navigate('/learn');
  };

  const canStart = selectedCategories.length > 0;

  return (
    <AppShell
      totalXP={progress.totalXP}
      showBack
      onBack={() => navigate('/')}
      title="הגדרות משחק"
    >
      <div className="flex flex-col gap-6 py-4">
        {/* Category Selection */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-lg font-bold text-text mb-3 flex items-center gap-2">
            <span>📚</span>
            בחרו קטגוריות
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category.id);
              return (
                <Card
                  key={category.id}
                  variant="colored"
                  colorClass={isSelected ? category.color : 'bg-gray-100'}
                  interactive
                  selected={isSelected}
                  padding="sm"
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{category.emoji}</span>
                    <div>
                      <p className={`font-semibold ${isSelected ? 'text-text' : 'text-text-light'}`}>
                        {category.nameHebrew}
                      </p>
                      <p className="text-xs text-text-light">
                        {category.items.length} מילים
                      </p>
                    </div>
                    {isSelected && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mr-auto text-xl"
                      >
                        ✓
                      </motion.span>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </motion.section>

        {/* Difficulty Selection */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-lg font-bold text-text mb-3 flex items-center gap-2">
            <span>⚡</span>
            רמת קושי
          </h2>
          <div className="flex gap-3">
            {difficultyConfigs.map((config) => {
              const isSelected = difficulty === config.id;
              const emojis = {
                easy: '🌟',
                medium: '⭐',
                hard: '🔥',
              };
              return (
                <motion.button
                  key={config.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setDifficulty(config.id)}
                  className={`
                    flex-1 py-4 px-3 rounded-2xl text-center
                    transition-all duration-200
                    ${isSelected
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-gray-100 text-text-light hover:bg-gray-200'
                    }
                  `}
                >
                  <span className="text-2xl block mb-1">{emojis[config.id]}</span>
                  <span className="font-bold block">{config.nameHebrew}</span>
                  <span className="text-xs opacity-75 block">
                    {config.timerSeconds} שניות
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.section>

        {/* Duration Selection */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-bold text-text mb-3 flex items-center gap-2">
            <span>⏱️</span>
            משך המשחק
          </h2>
          <div className="flex gap-3">
            {durations.map((d) => {
              const isSelected = duration === d.value;
              return (
                <motion.button
                  key={d.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setDuration(d.value)}
                  className={`
                    flex-1 py-4 px-3 rounded-2xl text-center
                    transition-all duration-200
                    ${isSelected
                      ? 'bg-secondary text-white shadow-lg shadow-secondary/30'
                      : 'bg-gray-100 text-text-light hover:bg-gray-200'
                    }
                  `}
                >
                  <span className="font-bold text-lg">{d.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.section>

        {/* Game Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card variant="outline" padding="sm">
            <div className="flex items-center justify-around text-center">
              <div>
                <p className="text-xs text-text-light">קטגוריות</p>
                <p className="font-bold text-primary">{selectedCategories.length}</p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div>
                <p className="text-xs text-text-light">רמה</p>
                <p className="font-bold text-primary">
                  {difficultyConfigs.find((d) => d.id === difficulty)?.nameHebrew}
                </p>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div>
                <p className="text-xs text-text-light">זמן</p>
                <p className="font-bold text-primary">{duration} דקות</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            size="xl"
            fullWidth
            disabled={!canStart}
            onClick={handleStartGame}
          >
            🚀 התחל!
          </Button>
        </motion.div>
      </div>
    </AppShell>
  );
}
