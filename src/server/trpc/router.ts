import 'server-only';
import { initTRPC } from '@trpc/server';
import { TRPCError } from '@trpc/server';
import { createContext } from './context';

const t = initTRPC.context<typeof createContext>().create();
const router = t.router;
const publicProcedure = t.procedure;

const loggerMiddleware = t.middleware(async ({ next }) => {
  const start = Date.now();
  const result = await next();
  console.log(` took ${Date.now() - start}ms`);
  return result;
});

const checkAuthMiddleware = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource',
    });
  }

  return next();
});

const loggerProcedure = publicProcedure.use(loggerMiddleware);
export const protectedProcedure = publicProcedure.use(checkAuthMiddleware);

export const appRouter = router({
  hello: loggerProcedure.query(({ ctx }) => {
    console.log('\x1b[30m\x1b[102m[INFO]\x1b[102m  ctx.session.user: ', ctx.session.user);
    return {
      greeting: 'hello world',
    };
  }),
});

export type IAppRouter = typeof appRouter;
