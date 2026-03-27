import 'server-only';
import { initTRPC, TRPCError } from '@trpc/server';
import { getServerSession } from '../auth';
import { headers } from 'next/headers';
import { db } from '../db/db';
import { isNotNull } from 'drizzle-orm';

const t = initTRPC.context().create();

export const router = t.router;
export const procedure = t.procedure;

export const withLoggerProcedure = procedure.use(async ({ next }) => {
  const start = Date.now();
  const result = await next();

  console.log(` ---> [API] time: ${Date.now() - start}ms`);
  return result;
});

export const withSessionMiddleware = t.middleware(async ({ ctx, next }) => {
  const session = await getServerSession();

  return next({ ctx: { ...ctx, session } });
});

export const protectedProcedure = withLoggerProcedure
  .use(withSessionMiddleware)
  .use(async ({ ctx, next }) => {
    if (!ctx.session?.user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You must be logged in to access this resource',
      });
    }
    return next({ ctx: { ...ctx, session: ctx.session } });
  });

export const withAppProcedure = withLoggerProcedure.use(async ({ ctx, next }) => {
  const header = await headers();

  const apiKey = header.get('x-api-key');
  if (!apiKey) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'You must provide an API key',
    });
  }
  const apiKeyRecord = await db.query.apiKeys.findFirst({
    where: (apiKeys, { eq, and }) => and(eq(apiKeys.key, apiKey), isNotNull(apiKeys.deletedAt)),
    with: {
      app: {
        with: { user: true },
      },
    },
  });

  if (!apiKeyRecord) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'App with API key not found',
    });
  }
  return next({
    ctx: {
      ...ctx,
      app: apiKeyRecord.app,
      user: apiKeyRecord.app.user,
    },
  });
});
