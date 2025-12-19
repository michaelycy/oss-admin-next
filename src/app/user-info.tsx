'use client';

import { useSession, SessionProvider } from 'next-auth/react';
import { useTRPC } from '@/utils/trpc-client';
import { useQuery } from '@tanstack/react-query';
export default function UserInfo() {
  const user = useSession();

  const trpc = useTRPC();

  const { data } = useQuery(trpc.hello.queryOptions(void 0, {}));

  console.log('user', user, data);

  return (
    <div>
      <h1>User Info</h1>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SessionProvider1 = (props: any) => <SessionProvider {...props} />;
