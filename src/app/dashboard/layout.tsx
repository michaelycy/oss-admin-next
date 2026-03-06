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
    redirect('/api/auth/signin');
  }

  return (
    <>
      <nav className='h-[80px]  border-b relative'>
        <div className='container flex justify-end items-center h-full mx-auto'>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={session.user.image ?? ''} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className='absolute h-full left-1/2 -translate-x-1/2 flex items-center justify-center'>
            {nav}
          </div>
        </div>
      </nav>
      <main className='h-[calc(100vh-80px)]'>{children}</main>
    </>
  );
}
