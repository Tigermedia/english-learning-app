import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

// Get user progress
export const getProgress = query({
  args: { userId: v.id('users') },
  handler: async (ctx, args) => {
    const progress = await ctx.db
      .query('userProgress')
      .withIndex('by_user', (q) => q.eq('userId', args.userId))
      .first();
    return progress;
  },
});

// Sync progress from localStorage
export const syncProgress = mutation({
  args: {
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
    categoryProgressJson: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('userProgress')
      .withIndex('by_user', (q) => q.eq('userId', args.userId))
      .first();

    const progressData = {
      userId: args.userId,
      totalXP: args.totalXP,
      currentLevel: args.currentLevel,
      totalSessions: args.totalSessions,
      totalQuestionsAnswered: args.totalQuestionsAnswered,
      totalCorrectAnswers: args.totalCorrectAnswers,
      currentStreak: args.currentStreak,
      longestStreak: args.longestStreak,
      lastPlayedDate: args.lastPlayedDate,
      earnedBadges: args.earnedBadges,
      categoryProgressJson: args.categoryProgressJson,
      updatedAt: Date.now(),
    };

    if (existing) {
      // Update existing progress - take higher values for cumulative stats
      await ctx.db.patch(existing._id, {
        totalXP: Math.max(existing.totalXP, args.totalXP),
        currentLevel: Math.max(existing.currentLevel, args.currentLevel),
        totalSessions: Math.max(existing.totalSessions, args.totalSessions),
        totalQuestionsAnswered: Math.max(existing.totalQuestionsAnswered, args.totalQuestionsAnswered),
        totalCorrectAnswers: Math.max(existing.totalCorrectAnswers, args.totalCorrectAnswers),
        currentStreak: args.currentStreak, // Current streak comes from client
        longestStreak: Math.max(existing.longestStreak, args.longestStreak),
        lastPlayedDate: args.lastPlayedDate,
        earnedBadges: args.earnedBadges,
        categoryProgressJson: args.categoryProgressJson,
        updatedAt: Date.now(),
      });
      return existing._id;
    } else {
      // Create new progress record
      return await ctx.db.insert('userProgress', progressData);
    }
  },
});

// Reset progress for a user
export const resetProgress = mutation({
  args: { userId: v.id('users') },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('userProgress')
      .withIndex('by_user', (q) => q.eq('userId', args.userId))
      .first();

    if (existing) {
      await ctx.db.delete(existing._id);
    }
  },
});
