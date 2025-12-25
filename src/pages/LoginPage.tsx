import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import type { Id } from '../../convex/_generated/dataModel';
import { useUser } from '../store';
import { Button, Card } from '../components/ui';
import { getLevelInfo } from '../data/levels';

// Avatar emoji options for new users
const AVATAR_EMOJIS = ['😊', '😎', '🤩', '🦸', '🧙', '🐱', '🐶', '🦁', '🐼', '🦄', '🌟', '🎮'];

export function LoginPage() {
  const navigate = useNavigate();
  const { login, createUser } = useUser();
  const users = useQuery(api.users.listUsers);

  // Form state for creating new user
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState<number | null>(null);
  const [selectedEmoji, setSelectedEmoji] = useState('😊');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle selecting an existing user
  const handleSelectUser = async (userId: Id<'users'>) => {
    await login(userId);
    navigate('/');
  };

  // Handle creating a new user
  const handleCreateUser = async () => {
    if (!name.trim() || !age) return;

    setIsSubmitting(true);
    try {
      await createUser(name.trim(), age, selectedEmoji);
      navigate('/');
    } catch (error) {
      console.error('Failed to create user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (users === undefined) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl animate-bounce mb-4">📚</div>
          <p className="text-text-light">טוען...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-text mb-2">🌈 לומדים אנגלית!</h1>
          <p className="text-text-light">בחר את השם שלך או הוסף שחקן חדש</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isCreating ? (
            <motion.div
              key="user-list"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {/* Existing Users */}
              {users.length > 0 && (
                <div className="space-y-3 mb-6">
                  {users.map((user, index) => {
                    const levelInfo = getLevelInfo(0); // Will be updated when we sync progress
                    return (
                      <motion.div
                        key={user._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card
                          variant="elevated"
                          className="cursor-pointer hover:shadow-lg transition-shadow"
                          onClick={() => handleSelectUser(user._id)}
                        >
                          <div className="flex items-center gap-4">
                            <span className="text-4xl">{user.avatarEmoji || '😊'}</span>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-text">{user.name}</h3>
                              <p className="text-sm text-text-light">גיל {user.age}</p>
                            </div>
                            <div className="flex items-center gap-1 bg-accent/20 px-3 py-1 rounded-full">
                              <span>{levelInfo.emoji}</span>
                              <span className="text-sm font-bold">{levelInfo.level}</span>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Add New User Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: users.length * 0.1 }}
              >
                <Button
                  variant={users.length > 0 ? 'outline' : 'primary'}
                  size="lg"
                  fullWidth
                  onClick={() => setIsCreating(true)}
                >
                  ➕ הוסף ילד/ה
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="create-form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Card variant="elevated" className="mb-4">
                <h2 className="text-xl font-bold text-text mb-6 text-center">
                  יצירת שחקן חדש
                </h2>

                {/* Name Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-text mb-2">
                    מה השם שלך?
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="הקלד את השם שלך..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none text-lg text-right"
                    dir="rtl"
                    maxLength={20}
                  />
                </div>

                {/* Age Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-text mb-2">
                    בן/בת כמה אתה?
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {[4, 5, 6, 7, 8, 9, 10, 11, 12].map((ageOption) => (
                      <motion.button
                        key={ageOption}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setAge(ageOption)}
                        className={`py-3 rounded-xl font-bold text-lg transition-colors ${
                          age === ageOption
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-text hover:bg-gray-200'
                        }`}
                      >
                        {ageOption}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Avatar Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-text mb-2">
                    בחר דמות
                  </label>
                  <div className="grid grid-cols-6 gap-2">
                    {AVATAR_EMOJIS.map((emoji) => (
                      <motion.button
                        key={emoji}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedEmoji(emoji)}
                        className={`p-2 text-2xl rounded-xl transition-colors ${
                          selectedEmoji === emoji
                            ? 'bg-accent/30 ring-2 ring-accent'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {emoji}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    setIsCreating(false);
                    setName('');
                    setAge(null);
                    setSelectedEmoji('😊');
                  }}
                >
                  חזרה
                </Button>
                <Button
                  size="lg"
                  fullWidth
                  onClick={handleCreateUser}
                  disabled={!name.trim() || !age || isSubmitting}
                >
                  {isSubmitting ? '...יוצר' : '🚀 בואו נתחיל!'}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
