import type { NextRequest } from 'next/server';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appOpenRouter } from '@/server/trpc/open';

export const handlers = (req: NextRequest) => {
  return fetchRequestHandler({
    endpoint: '/api/open',
    router: appOpenRouter,
    req: req,
  });
};

export { handlers as GET, handlers as POST };
