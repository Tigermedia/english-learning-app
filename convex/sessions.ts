import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

// Save a game session
export const saveSession = mutation({
  args: {
    userId: v.id('users'),
    sessionId: v.string(),
    categories: v.array(v.string()),
    difficulty: v.string(),
    accuracy: v.number(),
    correctAnswers: v.number(),
    totalQuestions: v.number(),
    xpEarned: v.number(),
    timeSpentSeconds: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('gameSessions', {
      ...args,
      completedAt: Date.now(),
    });
  },
});

// Get recent sessions for a user
export const getRecentSessions = query({
  args: {
    userId: v.id('users'),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const sessions = await ctx.db
      .query('gameSessions')
      .withIndex('by_user', (q) => q.eq('userId', args.userId))
      .order('desc')
      .take(args.limit ?? 10);
    return sessions;
  },
});

// Get session stats for a user
export const getSessionStats = query({
  args: { userId: v.id('users') },
  handler: async (ctx, args) => {
    const sessions = await ctx.db
      .query('gameSessions')
      .withIndex('by_user', (q) => q.eq('userId', args.userId))
      .collect();

    if (sessions.length === 0) {
      return {
        totalSessions: 0,
        averageAccuracy: 0,
        totalXP: 0,
        totalTimeSpent: 0,
      };
    }

    const totalSessions = sessions.length;
    const averageAccuracy = Math.round(
      sessions.reduce((sum, s) => sum + s.accuracy, 0) / totalSessions
    );
    const totalXP = sessions.reduce((sum, s) => sum + s.xpEarned, 0);
    const totalTimeSpent = sessions.reduce((sum, s) => sum + s.timeSpentSeconds, 0);

    return {
      totalSessions,
      averageAccuracy,
      totalXP,
      totalTimeSpent,
    };
  },
});
