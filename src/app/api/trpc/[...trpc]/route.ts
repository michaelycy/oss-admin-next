import type { NextRequest } from 'next/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { createContext } from '@/server/trpc/context';
import { appRouter } from '@/server/trpc/router';

export const handlers = (req: NextRequest) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    router: appRouter,
    req: req,
    createContext,
  });
};

export { handlers as GET, handlers as POST };
