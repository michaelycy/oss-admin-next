import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getServerSession } from '@/server/auth';
import { redirect } from 'next/navigation';

interface IDashboardLayoutProps {
  children: React.ReactNode;

  /**
   * 导航栏 parallel route
   */
  nav: React.ReactNode;
}

export default async function DashboardLayout({ children, nav }: IDashboardLayoutProps) {
  const session = await getServerSession();

  if (!session?.user) {
    return redirect('/api/auth/signin');
  }

  return (
    <>
      <nav className='h-[84px] border-b border-slate-200 bg-white'>
        <div className='container mx-auto grid h-full grid-cols-[1fr_auto_1fr] items-center gap-4'>
          <div className='h-10' />
          <div className='flex items-center justify-center'>
            {nav}
          </div>
          <div className='flex items-center justify-end'>
            <DropdownMenu>
              <DropdownMenuTrigger className='rounded-full border border-slate-200 bg-white p-0.5 shadow-sm transition hover:border-slate-300'>
                <Avatar className='h-9 w-9'>
                  <AvatarImage src={session.user.image ?? ''} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='border-slate-200 bg-white text-slate-900'>
                <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
      <main className='h-[calc(100dvh-84px)]'>{children}</main>
    </>
  );
}
