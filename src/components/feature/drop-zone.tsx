import { cn } from '@/lib/utils';
import Uppy from '@uppy/core';
import { DragEventHandler, useRef, useState, type ReactNode } from 'react';

interface IDropZoneProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onDragEnter' | 'onDragOver' | 'onDrop' | 'onDragLeave' | 'children'
  > {
  uppy: Uppy;
  children: ReactNode | ((isDragging: boolean) => ReactNode);
}

export const DropZone = (props: IDropZoneProps) => {
  const { children, uppy, className, ...rest } = props;

  const [isDragging, setIsDragging] = useState(false);
  const timeRef = useRef<NodeJS.Timeout>(null);

  const onDragEnter: DragEventHandler<HTMLDivElement> = e => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragOver: DragEventHandler<HTMLDivElement> = e => {
    e.preventDefault();
    e.stopPropagation();

    if (timeRef.current) {
      clearTimeout(timeRef.current);

      timeRef.current = null;
    }
  };

  const onDrop: DragEventHandler<HTMLDivElement> = e => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer?.files;
    if (!files) {
      return;
    }

    Array.from(files).forEach(file => {
      uppy.addFile({ data: file, name: file.name });
    });
    setIsDragging(false);
  };

  const onDragLeave: DragEventHandler<HTMLDivElement> = e => {
    e.preventDefault();
    e.stopPropagation();

    // 解决拖拽离开后，300ms 内再次拖拽进入，导致 isDragging 为 true 的问题
    if (timeRef.current) {
      clearTimeout(timeRef.current);
      timeRef.current = null;
    }

    timeRef.current = setTimeout(() => {
      setIsDragging(false);
    }, 300);
  };

  return (
    <div
      className={cn('w-full h-full flex justify-center items-center', className)}
      {...rest}
      onDragEnter={onDragEnter}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}>
      {typeof children === 'function' ? children(isDragging) : children}
    </div>
  );
};
