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
import { ChevronDown } from 'lucide-react';

export default function DashboardNav() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const { data: apps, isPending } = useQuery(trpc.app.listApps.queryOptions());

  const currentApp = apps?.find(app => app.id === id);
  return (
    <div className='flex items-center justify-center gap-3'>
      <DropdownMenu>
        <DropdownMenuTrigger className='inline-flex h-10 w-[280px] items-center justify-between rounded-lg border border-slate-300 bg-white px-3 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50'>
          <span className='max-w-[220px] truncate'>{isPending ? 'Loading...' : currentApp?.name || 'Select App'}</span>
          <ChevronDown className='h-4 w-4 text-slate-500' />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-[280px] rounded-lg border-slate-200 bg-white text-slate-900'>
          {apps?.map(app => (
            <DropdownMenuItem key={app.id} asChild className='cursor-pointer rounded-md focus:bg-slate-100'>
              <Link href={`/dashboard/apps/${app.id}`} className='truncate'>
                {app.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <span className='rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-500'>/ API Keys</span>
    </div>
  );
}
