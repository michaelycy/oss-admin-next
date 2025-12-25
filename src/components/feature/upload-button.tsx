import Uppy from '@uppy/core';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';
export const UploadButton = (props: { uppy: Uppy }) => {
  const { uppy } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const onClick = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <Button onClick={onClick} variant='secondary'>
        <Plus className='h-4 w-4' />
      </Button>
      <input
        ref={inputRef}
        className='fixed left-[-9999px] top-[-9999px]'
        type='file'
        multiple
        onChange={e => {
          if (!e.target.files) {
            return;
          }

          Array.from(e.target.files).forEach(file => {
            uppy.addFile({ data: file, name: file.name });
          });

          e.target.value = '';
        }}
      />
    </>
  );
};
