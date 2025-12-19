'use client';
import { QueryClientProvider } from '@tanstack/react-query';
import { TRPCProvider, queryClient, trpcClient } from '@/utils/trpc-client';
 export function TrpcProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}
