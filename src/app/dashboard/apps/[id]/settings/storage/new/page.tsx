'use client';

import { useMutation } from '@tanstack/react-query';

import { trpc } from '@/utils/trpc-client';
import { Button } from '@/components/ui/button';
import { use } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IS3StorageConfiguration } from '@/server/db/schema';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { redirect } from 'next/navigation';

export default function StorageDashboard({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IS3StorageConfiguration & { name: string }>();

  const { mutateAsync } = useMutation(trpc.storage.createStorage.mutationOptions());
  const onSubmit: SubmitHandler<IS3StorageConfiguration & { name: string }> = async ({
    name,
    ...rest
  }) => {
    await mutateAsync({
      name: name,
      userId: id,
      configuration: rest,
    });

    redirect(`/dashboard/apps/${id}/storage`);
  };
  return (
    <div className='container pt-10 mx-auto'>
      <h1 className='text-2xl font-bold mb-4 mx-auto  max-w-md '>Create Storage</h1>
      <form className='flex flex-col gap-4 max-w-md mx-auto' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Name</Label>
          <Input
            {...register('name', {
              required: 'name is required',
            })}
            placeholder='e.g. my-storage'
          />
          <span className='text-red-500'>{errors.name?.message}</span>
        </div>
        <div>
          <Label>Bucket</Label>
          <Input
            {...register('bucket', {
              required: 'bucket is required',
            })}
            placeholder='e.g. my-bucket'
          />
          <span className='text-red-500'>{errors.bucket?.message}</span>
        </div>
        <div>
          <Label>Region</Label>
          <Input
            {...register('region', {
              required: 'region is required',
            })}
            placeholder='e.g. us-east-1'
          />
          <span className='text-red-500'>{errors.region?.message}</span>
        </div>
        <div>
          <Label>Access Key ID</Label>
          <Input
            {...register('accessKeyId', {
              required: 'accessKeyId is required',
            })}
            placeholder='e.g. AKIAIOSFODNN7EXAMPLE'
          />
          <span className='text-red-500'>{errors.accessKeyId?.message}</span>
        </div>
        <div>
          <Label>Secret Access Key</Label>
          <Input
            type='password'
            {...register('secretAccessKey', {
              required: 'secretAccessKey is required',
            })}
            placeholder='e.g. wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'
          />
          <span className='text-red-500'>{errors.secretAccessKey?.message}</span>
        </div>
        <div>
          <Label>API Endpoint</Label>
          <Input
            {...register('apiEndpoint')}
            placeholder='e.g. https://s3.us-east-1.amazonaws.com'
          />
        </div>
        <div>
          <Label>Actions</Label>
          <Button type='submit'>Create</Button>
        </div>
      </form>
    </div>
  );
}
