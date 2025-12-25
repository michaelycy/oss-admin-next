'use client';

import { useState } from 'react';
import { Uppy } from '@uppy/core';
import AwsS3 from '@uppy/aws-s3';

import { useUppyState } from '@/hooks/use-uppy-state';
import { UploadButton } from '@/components/feature/upload-button';
import { DropZone } from '@/components/feature/drop-zone';
import { FileList } from '@/components/feature/file-list';

import { Button } from '@/components/ui/button';
import { usePasteFiles } from '@/hooks/use-paste-files';
import { trpcPureClient } from '@/utils/trpc-client';
import { UploadPreview } from '@/components/feature/upload-preview';
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

  const progress = useUppyState(uppy, s => s.totalProgress);

  // 粘贴文件到上传队列
  usePasteFiles(files => {
    files.forEach(file => {
      uppy.addFile({ data: file, name: file.name });
    });
  });

  return (
    <div className='container mx-auto py-4'>
      <div className='flex justify-between items-center mb-4'>
        <Button onClick={() => uppy.upload()}>
          Upload
          <p>Progress: {progress}</p>
        </Button>
        <UploadButton uppy={uppy} />
      </div>

      <UploadPreview uppy={uppy} />

      <DropZone uppy={uppy} className='relative'>
        {isDragging => (
          <>
            {isDragging && (
              <div className='absolute z-10 inset-0 flex justify-center items-center bg-secondary/50'>
                请释放文件
              </div>
            )}

            <FileList uppy={uppy} />
          </>
        )}
      </DropZone>
    </div>
  );
}
