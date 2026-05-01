import { query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => ctx.db.get(args.userId),
});

export const getLeaderboard = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("users")
      .order("desc") // We'd ideally index by totalXp, but keeping it simple
      .take(10);
  },
});