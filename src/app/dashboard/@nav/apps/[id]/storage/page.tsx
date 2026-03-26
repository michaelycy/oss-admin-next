'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { trpc } from '@/utils/trpc-client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export default function DashboardNav() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const { data: apps, isPending } = useQuery(trpc.app.listApps.queryOptions());

  const currentApp = apps?.find(app => app.id === id);
  return (
    <div className='flex items-center justify-between gap-4'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='w-[200px] justify-between'>
            {isPending ? 'Loading...' : currentApp?.name || 'Select App'}
            <ChevronDown className='h-4 w-4 opacity-50' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-[200px]'>
          {apps?.map(app => (
            <DropdownMenuItem key={app.id} asChild>
              <Link href={`/dashboard/apps/${app.id}`} className='cursor-pointer'>
                {app.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      / Storage
    </div>
  );
}
