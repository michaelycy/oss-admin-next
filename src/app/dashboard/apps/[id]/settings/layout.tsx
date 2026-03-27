'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type ReactNode, use } from 'react';
import { cn } from '@/lib/utils';

export default function SettingsLayout({
  params,
  children,
}: {
  params: Promise<{ id: string }>;
  children: ReactNode;
}) {
  const { id: appId } = use(params);
  const pathname = usePathname();

  return (
    <div className='container flex justify-start'>
      <div className='flex flex-col w-40 pt-5 shrink-0 gap-4'>
        {/* <h1 className='text-2xl font-bold'>Settings</h1> */}
        <Button
          asChild
          variant='ghost'
          className={cn({
            'text-gray-500!': pathname === `/dashboard/apps/${appId}/settings/storage`,
          })}>
          <Link href={`/dashboard/apps/${appId}/settings/storage`}>Storage</Link>
        </Button>
        <Button
          asChild
          variant='ghost'
          className={cn({
            'text-gray-500': pathname === `/dashboard/apps/${appId}/settings/api-key`,
          })}>
          <Link href={`/dashboard/apps/${appId}/settings/api-key`}>API Key</Link>
        </Button>
      </div>
      <div className='grow'>{children}</div>
    </div>
  );
}
