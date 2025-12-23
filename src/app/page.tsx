'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Body, Meta, Uppy, UppyEventMap } from '@uppy/core';
import AwsS3 from '@uppy/aws-s3';
import { useQuery } from '@tanstack/react-query';

import { useUppyState } from '@/hooks/use-uppy-state';
import { UploadButton } from '@/components/feature/upload-button';
import { DropZone } from '@/components/feature/drop-zone';

import { Button } from '@/components/ui/button';
import { usePasteFiles } from '@/hooks/use-paste-files';
import { trpc, trpcPureClient } from '@/utils/trpc-client';
import { cn } from '@/lib/utils';
export default function Home() {
  const [uppy] = useState(() =>
    new Uppy().use(AwsS3, {
      shouldUseMultipart: false,
      getUploadParameters: async file => {
        const contentType = file.type || 'image/png';

        const result = await trpcPureClient.file.createPresignedUrl.mutate({
          filename: file.name || '',
          contentType,
          size: file.size || 0,
        });

        return { ...result, headers: { 'Content-Type': contentType } };
      },
    })
  );

  const files = useUppyState(uppy, s => Object.values(s.files));
  const progress = useUppyState(uppy, s => s.totalProgress);

  const { data: filesData, isPending } = useQuery(trpc.file.listFiles.queryOptions());

  useEffect(() => {
    const handler: UppyEventMap<Meta, Body>['upload-success'] = async (file, response, ...rest) => {
      if (!file) return;

      return await trpcPureClient.file.saveFile.mutate({
        name: file.name || 'test',
        path: response.uploadURL || '',
        type: file.type || 'image/png',
      });
    };

    const errorHandler: UppyEventMap<Meta, Body>['upload-error'] = (file, response) => {
      console.log(file, response);
    };
    uppy.on('upload-success', handler);
    uppy.on('upload-error', errorHandler);

    return () => {
      uppy.off('upload-success', handler);
      uppy.off('upload-error', errorHandler);
    };
  }, [uppy]);

  usePasteFiles(files => {
    files.forEach(file => {
      uppy.addFile({ data: file, name: file.name });
    });
  });

  return (
    <div className='container mx-auto py-4'>
      <UploadButton uppy={uppy} />

      <Button onClick={() => uppy.upload()}>
        Upload
        <p>Progress: {progress}</p>
      </Button>

      <p> 待上传文件：</p>

      {files.map(file => {
        const url = URL.createObjectURL(file.data as Blob);
        return (
          <Image
            key={file.id}
            src={url}
            alt={file.name}
            width={200}
            objectFit='cover'
            height={200}
          />
        );
      })}

      {isPending && <p>Loading...</p>}
      <DropZone uppy={uppy}>
        {isDragging => (
          <div
            className={cn('flex flex-wrap gap-4 w-full relative', isDragging ? 'bg-red-100' : '')}>
            {isDragging && (
              <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                请释放文件
              </div>
            )}

            {filesData?.map(file => (
              <div key={file.id} className='w-32 h-32 flex justify-center items-center border'>
                {file.contentType.startsWith('image') ? (
                  <Image
                    src={file.url}
                    alt={file.name}
                    width={200}
                    objectFit='cover'
                    height={200}
                  />
                ) : (
                  <Image
                    src='/file.svg'
                    alt={file.name}
                    width={200}
                    objectFit='cover'
                    height={200}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </DropZone>
    </div>
  );
}
