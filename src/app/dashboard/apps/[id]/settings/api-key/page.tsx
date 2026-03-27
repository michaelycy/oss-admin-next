'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { trpc } from '@/utils/trpc-client';
import { Button } from '@/components/ui/button';
import { use, useState } from 'react';
import { Plus } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';

export default function StorageDashboard({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const queryClient = useQueryClient();

  const { data: apiKeys } = useQuery(trpc.apiKey.listApiKeys.queryOptions({ appId: id }));

  const { mutateAsync: createApiKeyAsync } = useMutation(
    trpc.apiKey.createApiKey.mutationOptions(),
  );
  const [name, setName] = useState('');
  return (
    <div className='pt-10 mx-auto'>
      <div className='flex justify-between items-center gap-4'>
        <h1 className='text-2xl font-bold'>API Keys</h1>

        <Popover>
          <PopoverTrigger>
            <Button variant='outline'>
              <Plus />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className='flex flex-col gap-4'>
              <Input value={name} onChange={e => setName(e.target.value)} placeholder='Name' />

              <Button
                onClick={() => {
                  createApiKeyAsync({ appId: id, name }).then(res => {
                    setName('');
                    queryClient.setQueryData(
                      trpc.apiKey.listApiKeys.queryOptions({ appId: id }).queryKey,
                      (old: typeof apiKeys) => {
                        if (!old) return old;

                        return [...old, res];
                      },
                    );
                  });
                }}>
                Submit
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <ul className='p-4 '>
        {apiKeys?.map(apiKey => (
          <li key={apiKey.id} className='border flex justify-between items-center mb-4 p-2 rounded'>
            <div>{apiKey.name}</div>

            <div>{apiKey.key}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
