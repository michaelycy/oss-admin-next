import { v4 as uuid } from 'uuid';

import { createAppSchema } from '@/server/db/validate-schema';
import { protectedProcedure, router } from '../trpc';
import { db } from '@/server/db/db';
import { apps } from '@/server/db/schema';

export const appsRouter = router({
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
});
