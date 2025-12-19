import 'server-only';
import { getServerSession } from '@/server/auth';
import { TRPCError } from '@trpc/server';

export async function createContext() {
  const session = await getServerSession();

  if (!session?.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource',
    });
  }

  return { session };
}

