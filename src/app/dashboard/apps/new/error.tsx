'use client';

import { Button } from '@/components/ui/button';

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <h1 className='text-4xl font-bold'>{error.message}</h1>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
