import { fileOpenRoutes } from './routes/file-open';
import { router } from './trpc';

export const appOpenRouter = router({
  file: fileOpenRoutes,
});

export type IAppOpenRouter = typeof appOpenRouter;
