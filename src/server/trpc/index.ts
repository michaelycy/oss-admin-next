import { fileRoutes } from './routes/file';
import { router } from './trpc';

export const appRouter = router({
  file: fileRoutes,
});

export type IAppRouter = typeof appRouter;

export { protectedProcedure, router, withLoggerProcedure, withSessionMiddleware } from './trpc';
