import { QueryClient } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { createTRPCContext, createTRPCOptionsProxy } from '@trpc/tanstack-react-query';
import type { IAppRouter } from '@/server/trpc/router';

export const { TRPCProvider, useTRPC, useTRPCClient } = createTRPCContext<IAppRouter>();

export const queryClient = new QueryClient();
export const trpcClient = createTRPCClient<IAppRouter>({
  links: [httpBatchLink({ url: '/api/trpc' })],
});

export const trpc = createTRPCOptionsProxy<IAppRouter>({
  client: trpcClient,
  queryClient,
});
