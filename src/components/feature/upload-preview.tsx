import Uppy from '@uppy/core';
import Image from 'next/image';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useUppyState } from '@/hooks/use-uppy-state';
import { useState } from 'react';
import { Button } from '../ui/button';
import { LocalFileItem } from './file-item';

export const UploadPreview = (props: { uppy: Uppy }) => {
  const { uppy } = props;
  const files = useUppyState(uppy, s => Object.values(s.files));
  const [idx, setIdx] = useState(0);
  const currentFile = files[idx];

  const onOpenChange = (open: boolean) => {
    if (!open && currentFile) {
      uppy.removeFile(currentFile.id);
    }
  };

  // 处理当前文件不存在的情况
  if (!currentFile) {
    return null;
  }

  const isImage = currentFile.type.startsWith('image/');
  const url = URL.createObjectURL(currentFile.data as Blob);

  return (
    <>
      <Dialog open={files.length > 0} onOpenChange={onOpenChange}>
        <DialogContent onPointerDownOutside={e => e.preventDefault()}>
          <DialogTitle>上传预览</DialogTitle>

          <div className='flex gap-2 w-full justify-between items-center'>
            <Button variant='ghost' onClick={() => setIdx(idx - 1)} disabled={idx === 0}>
              <ChevronLeft />
            </Button>

            <LocalFileItem file={currentFile.data as Blob} />

            <Button
              variant='ghost'
              onClick={() => setIdx(idx + 1)}
              disabled={idx === files.length - 1}>
              <ChevronRight />
            </Button>
          </div>
          <DialogFooter>
            <Button
              variant='destructive'
              onClick={() => {
                uppy.removeFile(currentFile.id);

                if (idx === files.length - 1) {
                  const newIdx = idx === 0 ? 0 : idx - 2;
                  setIdx(newIdx);
                }
              }}>
              删除
            </Button>
            <Button
              onClick={() =>
                uppy.upload().then(() => {
                  uppy.clear();
                  setIdx(0);
                })
              }>
              上传
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
