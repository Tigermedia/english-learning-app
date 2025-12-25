import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  // Users table - basic child profiles
  users: defineTable({
    name: v.string(),
    age: v.number(),
    avatarEmoji: v.optional(v.string()),
    createdAt: v.number(),
    lastLoginAt: v.number(),
  }),

  // User progress - synced from localStorage
  userProgress: defineTable({
    userId: v.id('users'),
    totalXP: v.number(),
    currentLevel: v.number(),
    totalSessions: v.number(),
    totalQuestionsAnswered: v.number(),
    totalCorrectAnswers: v.number(),
    currentStreak: v.number(),
    longestStreak: v.number(),
    lastPlayedDate: v.string(),
    earnedBadges: v.array(v.string()),
    // Category progress stored as JSON string for flexibility
    categoryProgressJson: v.string(),
    updatedAt: v.number(),
  }).index('by_user', ['userId']),

  // Game sessions - individual game records
  gameSessions: defineTable({
    userId: v.id('users'),
    sessionId: v.string(),
    categories: v.array(v.string()),
    difficulty: v.string(),
    accuracy: v.number(),
    correctAnswers: v.number(),
    totalQuestions: v.number(),
    xpEarned: v.number(),
    timeSpentSeconds: v.number(),
    completedAt: v.number(),
  }).index('by_user', ['userId']).index('by_user_date', ['userId', 'completedAt']),
});
