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
    <div className='mx-auto h-full'>
      <div className='container flex justify-between items-center h-[60px] mx-auto'>
        {/* <Button onClick={() => uppy.upload()}>
          Upload
          <p>Progress: {progress}</p>
        </Button> */}
        <Button
          onClick={() =>
            setOrderBy(cur => ({ ...cur, order: cur.order === 'desc' ? 'asc' : 'desc' }))
          }>
          Created At {orderBy.order === 'desc' ? <MoveUp /> : <MoveDown />}
        </Button>

        <div className='flex items-center gap-4'>
          <UploadButton uppy={uppy} />

          <Button asChild>
            <Link href={`/dashboard/apps/new`}>New App</Link>
          </Button>
          <Button asChild>
            <Link href={`/dashboard/apps/${appId}/settings/storage`}>
              <Settings />
            </Link>
          </Button>
        </div>
      </div>

      <UploadPreview uppy={uppy} />

      <DropZone uppy={uppy} className='h-[calc(100%-60px)] container mx-auto'>
        {isDragging => (
          <>
            {isDragging && (
              <div className='absolute z-10 inset-0 flex justify-center items-center bg-secondary/50'>
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
