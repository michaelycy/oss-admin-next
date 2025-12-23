import 'server-only';
import { initTRPC, TRPCError } from '@trpc/server';
import { getServerSession } from '../auth';

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

