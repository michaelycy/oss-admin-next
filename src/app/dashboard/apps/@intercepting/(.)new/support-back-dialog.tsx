'use client';
import { Dialog } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';

export default function SupportBackCreateApp({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <Dialog open onOpenChange={() => router.back()}>
      {children}
    </Dialog>
  );
}
