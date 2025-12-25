import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

// Get all users (for login page user picker)
export const listUsers = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query('users').collect();
    return users;
  },
});

// Get a single user by ID
export const getUser = query({
  args: { userId: v.id('users') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});

// Create a new user
export const createUser = mutation({
  args: {
    name: v.string(),
    age: v.number(),
    avatarEmoji: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const userId = await ctx.db.insert('users', {
      name: args.name,
      age: args.age,
      avatarEmoji: args.avatarEmoji,
      createdAt: now,
      lastLoginAt: now,
    });
    return userId;
  },
});

// Update last login time
export const updateLastLogin = mutation({
  args: { userId: v.id('users') },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      lastLoginAt: Date.now(),
    });
  },
});

// Delete a user and their data
export const deleteUser = mutation({
  args: { userId: v.id('users') },
  handler: async (ctx, args) => {
    // Delete user's progress
    const progress = await ctx.db
      .query('userProgress')
      .withIndex('by_user', (q) => q.eq('userId', args.userId))
      .first();
    if (progress) {
      await ctx.db.delete(progress._id);
    }

    // Delete user's game sessions
    const sessions = await ctx.db
      .query('gameSessions')
      .withIndex('by_user', (q) => q.eq('userId', args.userId))
      .collect();
    for (const session of sessions) {
      await ctx.db.delete(session._id);
    }

    // Delete user
    await ctx.db.delete(args.userId);
  },
});
