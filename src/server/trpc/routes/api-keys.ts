import { createApiKeysSchema } from '@/server/db/validate-schema';
import { protectedProcedure, router } from '../trpc';
import { db } from '@/server/db/db';
import { apiKeys } from '@/server/db/schema';
import { desc } from 'drizzle-orm';
import z from 'zod';
import { v4 as uuid } from 'uuid';

export const apiKeysRouter = router({
  /** Create a new apiKeys configuration */
  createApiKey: protectedProcedure
    .input(createApiKeysSchema.pick({ name: true, appId: true }))
    .mutation(async ({ input }) => {
      const app = await db
        .insert(apiKeys)
        .values({
          name: input.name,
          key: uuid(),
          appId: input.appId,
        })
        .returning();
      return app[0];
    }),

  /** List all apiKeys for the current app */
  listApiKeys: protectedProcedure
    .input(
      z.object({
        appId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const apps = await db.query.apiKeys.findMany({
        where: (apiKeys, { eq, and, isNull }) =>
          and(eq(apiKeys.appId, input.appId), isNull(apiKeys.deletedAt)),
        orderBy: apiKeys => [desc(apiKeys.createdAt)],
      });
      return apps;
    }),
});
