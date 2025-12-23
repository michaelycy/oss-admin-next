import { QueryClient } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { createTRPCContext, createTRPCOptionsProxy } from '@trpc/tanstack-react-query';
import type { IAppRouter } from '@/server/trpc';

export const { TRPCProvider, useTRPC, useTRPCClient } = createTRPCContext<IAppRouter>();

export const queryClient = new QueryClient();
export const trpcClient = createTRPCClient<IAppRouter>({
  links: [httpBatchLink({ url: '/api/trpc' })],
});

export const trpc = createTRPCOptionsProxy<IAppRouter>({
  client: trpcClient,
  queryClient,
});

/** 无上下文的 TRPC 客户端 */
export const trpcPureClient = createTRPCClient<IAppRouter>({
  links: [httpBatchLink({ url: '/api/trpc' })],
});
