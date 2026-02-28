import { cn } from '@/lib/utils';
import { trpcPureClient, useTRPC } from '@/utils/trpc-client';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import Uppy, { Body, Meta, UppyEventMap, UppyFile } from '@uppy/core';
import { useEffect, useRef, useState } from 'react';
import { RemoteFileItem, LocalFileItem } from './file-item';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { CopyPath, DeleteFile } from './file-action';

export const FileList = (props: { uppy: Uppy }) => {
  const { uppy } = props;
  const [uploadingFiles, setUploadingFiles] = useState<UppyFile<Meta, Body>[]>([]);
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const {
    data: infiniteQueryFilesData,
    isPending,
    fetchNextPage,
  } = useInfiniteQuery(
    trpc.file.infiniteListFiles.infiniteQueryOptions(
      {
        limit: 10,
      },
      { getNextPageParam: lastPage => lastPage.nextCursor },
    ),
  );

  const filesData =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    infiniteQueryFilesData?.pages.reduce<any[]>((acc, page) => [...acc, ...page.items], []) || [];

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
          queryClient.setQueriesData<{ pages: { items: UppyFile<Meta, Body>[] }[] }>(
            trpc.file.infiniteListFiles.infiniteQueryOptions({ limit: 10 }),
            prev => {
              if (!prev) {
                return prev;
              }

              return {
                ...prev,
                pages: prev.pages.map((page, index) => {
                  if (index === 0) {
                    return {
                      ...page,
                      items: [...page.items, file],
                    };
                  }

                  return {
                    ...page,
                    items: [...page.items, file],
                  };
                }),
              };
            },
          );
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
  }, [uppy, queryClient, trpc.file.listFiles, trpc.file.infiniteListFiles]);

  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (bottomRef.current) {
      const bottomDom = bottomRef.current;
      const observer = new IntersectionObserver(
        ([e]) => {
          if (e.intersectionRatio > 0.1) {
            fetchNextPage();
          }
        },
        {
          threshold: 0.1,
        },
      );
      observer.observe(bottomDom);

      return () => {
        observer.unobserve(bottomDom);
        observer.disconnect();
      };
    }
  }, [fetchNextPage]);

  return (
    <ScrollArea className='w-full h-full'>
      {isPending && <p>Loading...</p>}

      <div className={cn('flex justify-center flex-wrap gap-4 relative')}>
        {uploadingFiles.map(file => {
          const url = URL.createObjectURL(file.data as Blob);

          return (
            <div key={url} className='w-32 h-32 flex justify-center items-center border'>
              <LocalFileItem file={file.data as Blob} />
            </div>
          );
        })}

        {filesData?.map(file => (
          <div key={file.id} className='w-32 h-32 flex justify-center items-center border relative'>
            <div className='absolute inset-0 flex justify-center items-center bg-primary/30 opacity-0 hover:opacity-100 transition-all'>
              <DeleteFile fileId={file.id} />

              <CopyPath path={file.url} className='absolute right-0 top-0' />
            </div>
            {file.contentType ? (
              <RemoteFileItem contentType={file.contentType} name={file.name} url={file.url} />
            ) : (
              <LocalFileItem file={file.data as Blob} />
            )}
          </div>
        ))}
      </div>

      <div
        className={cn('hidden justify-center p-8', { flex: filesData?.length > 0 })}
        ref={bottomRef}>
        <Button variant='ghost' onClick={() => fetchNextPage()}>
          加载更多
        </Button>
      </div>
    </ScrollArea>
  );
};
