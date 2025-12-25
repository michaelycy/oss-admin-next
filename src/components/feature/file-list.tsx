import { cn } from '@/lib/utils';
import { trpcPureClient, useTRPC } from '@/utils/trpc-client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Uppy, { Body, Meta, UppyEventMap, UppyFile } from '@uppy/core';
import { useEffect, useState } from 'react';
import { RemoteFileItem, LocalFileItem } from './file-item';

export const FileList = (props: { uppy: Uppy }) => {
  const { uppy } = props;
  const [uploadingFiles, setUploadingFiles] = useState<UppyFile<Meta, Body>[]>([]);
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data: filesData, isPending } = useQuery(trpc.file.listFiles.queryOptions());

  useEffect(() => {
    const handler: UppyEventMap<Meta, Body>['upload-success'] = async (file, response) => {
      if (!file) return;

      return await trpcPureClient.file.saveFile
        .mutate({
          name: file.name || 'test',
          path: response.uploadURL || '',
          type: file.type || 'image/png',
        })
        .then(() => {
          queryClient.invalidateQueries(trpc.file.listFiles.queryOptions());
        });
    };

    const errorHandler: UppyEventMap<Meta, Body>['upload-error'] = (file, response) => {
      console.log(file, response);
    };

    const uploadProgressHandler: UppyEventMap<Meta, Body>['upload-progress'] = file => {
      if (file) {
        setUploadingFiles(prev => [...prev, file]);
      }
    };
    const uploadCompleteHandler: UppyEventMap<Meta, Body>['complete'] = () => {
      setUploadingFiles([]);
    };

    uppy.on('upload-success', handler);
    uppy.on('upload-error', errorHandler);
    uppy.on('upload-progress', uploadProgressHandler);

    uppy.on('complete', uploadCompleteHandler);
    return () => {
      uppy.off('upload-success', handler);
      uppy.off('upload-error', errorHandler);
      uppy.off('upload-progress', uploadProgressHandler);
      uppy.off('complete', uploadCompleteHandler);
    };
  }, [uppy, queryClient, trpc.file.listFiles]);

  return (
    <>
      {isPending && <p>Loading...</p>}

      <div className={cn('flex flex-wrap gap-4 w-full relative')}>
        {uploadingFiles.map(file => {
          const url = URL.createObjectURL(file.data as Blob);

          return (
            <div key={url} className='w-32 h-32 flex justify-center items-center border'>
              <LocalFileItem file={file.data as Blob} />
            </div>
          );
        })}

        {filesData?.map(file => (
          <div key={file.id} className='w-32 h-32 flex justify-center items-center border'>
            <RemoteFileItem contentType={file.contentType} name={file.name} url={file.url} />
          </div>
        ))}
      </div>
    </>
  );
};
