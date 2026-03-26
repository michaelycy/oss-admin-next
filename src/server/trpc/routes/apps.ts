import { v4 as uuid } from 'uuid';

import { createAppSchema } from '@/server/db/validate-schema';
import { protectedProcedure, router } from '../trpc';
import { db } from '@/server/db/db';
import { apps } from '@/server/db/schema';
import { desc } from 'drizzle-orm';

export const appsRouter = router({
  /** Create a new app */
  createApp: protectedProcedure
    .input(createAppSchema.pick({ name: true, description: true }))
    .mutation(async ({ ctx, input }) => {
      const app = await db
        .insert(apps)
        .values({
          id: uuid(),
          name: input.name,
          description: input.description,
          userId: ctx.session.user.id,
        })
        .returning();
      return app[0];
    }),

  /** List all apps for the current user */
  listApps: protectedProcedure.query(async ({ ctx }) => {
    const apps = await db.query.apps.findMany({
      where: (apps, { eq, and, isNull }) =>
        and(eq(apps.userId, ctx.session.user.id), isNull(apps.deletedAt)),
      orderBy: apps => [desc(apps.createdAt)],
    });
    return apps;
  }),
});
