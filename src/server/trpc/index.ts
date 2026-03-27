import { apiKeysRouter } from './routes/api-keys';
import { appsRouter } from './routes/apps';
import { fileRoutes } from './routes/file';
import { storageRouter } from './routes/storage';
import { router } from './trpc';

export const appRouter = router({
  file: fileRoutes,
  app: appsRouter,
  storage: storageRouter,
  apiKey: apiKeysRouter,
});

export type IAppRouter = typeof appRouter;

export { protectedProcedure, router, withLoggerProcedure, withSessionMiddleware } from './trpc';
