import { createStorageSchema } from '@/server/db/validate-schema';
import { protectedProcedure, router } from '../trpc';
import { db } from '@/server/db/db';
import { storageConfiguration } from '@/server/db/schema';
import { desc } from 'drizzle-orm';

export const storageRouter = router({
  /** Create a new storage configuration */
  createStorage: protectedProcedure.input(createStorageSchema).mutation(async ({ ctx, input }) => {
    const app = await db
      .insert(storageConfiguration)
      .values({
        name: input.name,
        userId: ctx.session.user.id,
        configuration: input.configuration,
      })
      .returning();
    return app[0];
  }),

  /** List all storage configurations for the current user */
  listStorages: protectedProcedure.query(async ({ ctx }) => {
    console.log(ctx);

    const apps = await db.query.storageConfiguration.findMany({
      where: (storageConfiguration, { eq, and, isNull }) =>
        and(
          eq(storageConfiguration.userId, ctx.session.user.id),
          isNull(storageConfiguration.deletedAt),
        ),
      orderBy: storageConfiguration => [desc(storageConfiguration.createdAt)],
    });
    return apps;
  }),
});
