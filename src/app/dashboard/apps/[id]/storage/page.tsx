'use client';

import { useQuery } from '@tanstack/react-query';

import { trpc } from '@/utils/trpc-client';
import { Button } from '@/components/ui/button';

export default function StorageDashboard() {
  const { data: storages } = useQuery(trpc.storage.listStorages.queryOptions());
  return (
    <div className='container pt-10 mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Storage </h1>

      <ul className='p-4 border'>
        {storages?.map(storage => (
          <li key={storage.id} className='flex justify-between items-center gap-4'>
            {storage.name}

            <Button>Used</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
