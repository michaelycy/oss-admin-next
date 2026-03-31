'use client';

import { use, useState } from 'react';
import { Uppy } from '@uppy/core';
import AwsS3 from '@uppy/aws-s3';
import { MoveUp, MoveDown, Settings } from 'lucide-react';

// import { useUppyState } from '@/hooks/use-uppy-state';
import { UploadButton } from '@/components/feature/upload-button';
import { DropZone } from '@/components/feature/drop-zone';
import { FileList } from '@/components/feature/file-list';
import { Button } from '@/components/ui/button';

import { usePasteFiles } from '@/hooks/use-paste-files';
import { trpcPureClient } from '@/utils/trpc-client';
import { UploadPreview } from '@/components/feature/upload-preview';
import { IFilesOrderByFieldColumns } from '@/server/trpc/routes/file';
import Link from 'next/link';

interface IAppDashboardProps {
  params: Promise<{
    id: string;
  }>;
}
export default function AppDashboard(props: IAppDashboardProps) {
  const { params } = props;
  const { id: appId } = use(params);

  const [uppy] = useState(() =>
    new Uppy().use(AwsS3, {
      shouldUseMultipart: false,
      getUploadParameters: async file => {
        const contentType = file.type || 'image/png';

        const result = await trpcPureClient.file.createPresignedUrl.mutate({
          filename: file.name || '',
          contentType,
          size: file.size || 0,
          appId,
        });

        return { ...result, headers: { 'Content-Type': contentType } };
      },
    }),
  );

  // const progress = useUppyState(uppy, s => s.totalProgress);

  // 粘贴文件到上传队列
  usePasteFiles(files => {
    files.forEach(file => {
      uppy.addFile({ data: file, name: file.name });
    });
  });

  const [orderBy, setOrderBy] = useState<Exclude<IFilesOrderByFieldColumns, undefined>>({
    field: 'createdAt',
    order: 'desc',
  });

  return (
    <div className='mx-auto h-full bg-slate-50'>
      <div className='container mx-auto pt-6'>
        <div className='flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:h-[88px] md:flex-row md:items-center md:justify-between md:p-5'>
          {/* <Button onClick={() => uppy.upload()}>
          Upload
          <p>Progress: {progress}</p>
        </Button> */}
          <Button
            variant='outline'
            className='border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
            onClick={() =>
              setOrderBy(cur => ({ ...cur, order: cur.order === 'desc' ? 'asc' : 'desc' }))
            }>
            Created At {orderBy.order === 'desc' ? <MoveUp /> : <MoveDown />}
          </Button>

          <div className='flex items-center gap-3'>
            <UploadButton uppy={uppy} />

            <Button asChild className='bg-slate-900 text-white hover:bg-slate-800'>
              <Link href={`/dashboard/apps/new`}>New App</Link>
            </Button>
            <Button
              asChild
              variant='outline'
              className='border-slate-300 bg-white text-slate-700 hover:bg-slate-50'>
              <Link href={`/dashboard/apps/${appId}/settings/storage`}>
                <Settings />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* <div className='container mx-auto mt-4 rounded-xl border border-slate-200 bg-white p-3 shadow-sm'> */}
      <UploadPreview uppy={uppy} />
      {/* </div> */}

      <DropZone
        uppy={uppy}
        className='container mx-auto mt-4 h-[calc(100%-188px)] rounded-xl border border-slate-200 bg-white p-4 shadow-sm'>
        {isDragging => (
          <>
            {isDragging && (
              <div className='absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-slate-900/10 text-lg font-semibold text-slate-700 backdrop-blur-sm'>
                请释放文件
              </div>
            )}

            <FileList uppy={uppy} orderBy={orderBy} appId={appId} />
          </>
        )}
      </DropZone>
    </div>
  );
}
