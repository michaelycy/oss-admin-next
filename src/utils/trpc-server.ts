import 'server-only';
import { appRouter } from '@/server/trpc';
import { createCallerFactory } from '@trpc/server/unstable-core-do-not-import';

/** 服务器端调用 TRPC 路由 */
export const appServerCaller = createCallerFactory()(appRouter);
