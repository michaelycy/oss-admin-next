import { v4 as uuid } from 'uuid';

import { createAppSchema } from '@/server/db/validate-schema';
import { protectedProcedure, router } from '../trpc';
import { db } from '@/server/db/db';
import { apps } from '@/server/db/schema';
import { and, desc, eq } from 'drizzle-orm';
import z from 'zod';
import { TRPCError } from '@trpc/server';

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

  /** 切换 storage */
  changeStorage: protectedProcedure
    .input(z.object({ appId: z.string(), storageId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      // 校验 当前的storage 是否属于当前用户
      const storage = await db.query.storageConfiguration.findFirst({
        where: (storages, { eq, and, isNull }) =>
          and(eq(storages.id, input.storageId), isNull(storages.deletedAt)),
      });
      if (!storage) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Storage not found' });
      }

      if (storage.userId !== ctx.session.user.id) {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Storage not belong to you' });
      }

      // 更新 app
      await db
        .update(apps)
        .set({ storageId: input.storageId })
        .where(and(eq(apps.id, input.appId), eq(apps.userId, ctx.session.user.id)));
    }),
});
