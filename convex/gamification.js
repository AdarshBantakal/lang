import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const updateGamification = internalMutation({
  args: {
    userId: v.id("users"),
    xpEarned: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) return;

    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    
    let newStreak = user.streak || 0;
    let lastPracticeDate = user.lastPracticeDate || 0;

    if (now - lastPracticeDate < oneDay * 2 && now - lastPracticeDate > oneDay) {
      newStreak += 1;
    } else if (now - lastPracticeDate >= oneDay * 2) {
      newStreak = 1;
    } else if (lastPracticeDate === 0) {
      newStreak = 1;
    }

    const newTotalXp = (user.totalXp || 0) + args.xpEarned;
    const newXp = (user.xp || 0) + args.xpEarned;

    await ctx.db.patch(args.userId, {
      xp: newXp,
      totalXp: newTotalXp,
      streak: newStreak,
      lastPracticeDate: now,
    });

    // Check for achievements
    if (newStreak === 7) {
      await ctx.db.insert("achievements", {
        userId: args.userId,
        name: "7 Day Streak",
        description: "You practiced for 7 days in a row!",
        unlockedAt: now,
      });
    }
  },
});
