import { cn } from '@/lib/utils';
import { trpcPureClient, useTRPC } from '@/utils/trpc-client';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import Uppy, { Body, Meta, UppyEventMap, UppyFile } from '@uppy/core';
import { useEffect, useRef, useState } from 'react';
import { RemoteFileItem, LocalFileItem } from './file-item';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { CopyPath, DeleteFile } from './file-action';
import type { IFilesOrderByFieldColumns } from '@/server/trpc/routes/file';

interface IFileListProps {
  uppy: Uppy;
  orderBy?: IFilesOrderByFieldColumns;
  appId: string;
}
export const FileList = (props: IFileListProps) => {
  const { uppy, orderBy, appId } = props;
  const [uploadingFiles, setUploadingFiles] = useState<UppyFile<Meta, Body>[]>([]);
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const {
    data: infiniteQueryFilesData,
    isPending,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    trpc.file.infiniteListFiles.infiniteQueryOptions(
      {
        limit: 10,
        orderBy,
        appId,
      },
      {
        getNextPageParam: lastPage => (lastPage.hasNextPage ? lastPage.nextCursor : undefined),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
      },
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
          appId,
        })
        .then(() => {
          queryClient.setQueriesData<{ pages: { items: UppyFile<Meta, Body>[] }[] }>(
            trpc.file.infiniteListFiles.infiniteQueryOptions({ limit: 10, appId }),
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
  }, [uppy, queryClient, trpc.file.listFiles, trpc.file.infiniteListFiles, appId]);

  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (bottomRef.current) {
      const bottomDom = bottomRef.current;
      const observer = new IntersectionObserver(
        ([e]) => {
          if (e.intersectionRatio > 0.1 && hasNextPage && !isFetchingNextPage) {
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
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <ScrollArea className='h-full w-full'>
      {isPending && (
        <p className='rounded-lg border border-slate-200 bg-slate-50 py-8 text-center text-slate-500'>
          Loading...
        </p>
      )}

      <div className={cn('relative flex flex-wrap justify-start gap-5')}>
        {uploadingFiles.map(file => {
          const url = URL.createObjectURL(file.data as Blob);

          return (
            <div
              key={url}
              className='h-32 w-32 overflow-hidden rounded-lg border border-slate-200 bg-white p-1 shadow-sm'>
              <LocalFileItem file={file.data as Blob} />
            </div>
          );
        })}

        {filesData?.map(file => (
          <div
            key={file.id}
            className='relative h-32 w-32 overflow-hidden rounded-lg border border-slate-200 bg-white p-1 shadow-sm transition hover:border-slate-300'>
            <div className='absolute inset-0 flex items-center justify-center bg-white/85 opacity-0 transition-all hover:opacity-100'>
              <DeleteFile fileId={file.id} />

              <CopyPath path={file.url} className='absolute right-0 top-0' />
            </div>
            {file.contentType ? (
              <RemoteFileItem contentType={file.contentType} name={file.name} id={file.id} />
            ) : (
              <LocalFileItem file={file.data as Blob} />
            )}
          </div>
        ))}
      </div>

      <div className={cn('hidden justify-center py-8', { flex: hasNextPage })} ref={bottomRef}>
        <Button
          variant='outline'
          className='border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
          disabled={isFetchingNextPage}
          onClick={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}>
          {isFetchingNextPage ? '加载中...' : '加载更多'}
        </Button>
      </div>
    </ScrollArea>
  );
};
