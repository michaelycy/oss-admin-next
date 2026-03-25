'use client';
import { Dialog } from '@/components/ui/dialog';
import { useRouter, usePathname } from 'next/navigation';

export default function SupportBackCreateApp({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = pathname === '/dashboard/apps/new';

  return (
    <Dialog open={isOpen} onOpenChange={() => router.back()}>
      {children}
    </Dialog>
  );
}
