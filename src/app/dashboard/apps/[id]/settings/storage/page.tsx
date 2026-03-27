'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { trpc } from '@/utils/trpc-client';
import { Button } from '@/components/ui/button';
import { use } from 'react';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function StorageDashboard({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const queryClient = useQueryClient();

  const { data: storages } = useQuery(trpc.storage.listStorages.queryOptions());
  const { data: apps } = useQuery(trpc.app.listApps.queryOptions());
  const { mutateAsync: changeStorageAsync } = useMutation(trpc.app.changeStorage.mutationOptions());

  const currentApp = apps?.find(app => app.id === id);

  return (
    <div className='pt-10 mx-auto'>
      <div className='flex justify-between items-center gap-4'>
        <h1 className='text-2xl font-bold'>Storage </h1>

        <Button variant='outline' asChild>
          <Link href={`/dashboard/apps/${id}/storage/new`}>
            <Plus />
          </Link>
        </Button>
      </div>

      <ul className='p-4 '>
        {storages?.map(storage => (
          <li
            key={storage.id}
            className='border flex justify-between items-center mb-4 p-2 rounded'>
            {storage.name}

            <Button
              disabled={currentApp?.storageId === storage.id}
              onClick={() =>
                changeStorageAsync({ appId: id, storageId: storage.id }).then(res => {
                  queryClient.setQueryData(
                    trpc.app.listApps.queryOptions().queryKey,
                    (old: typeof apps) => {
                      if (!old) return old;

                      return old.map(app =>
                        app.id === id ? { ...app, storageId: storage.id } : app,
                      );
                    },
                  );
                  return res;
                })
              }>
              {currentApp?.storageId === storage.id ? 'Used' : 'Use'}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
