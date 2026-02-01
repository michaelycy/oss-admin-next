import { Button } from '@/components/ui/button';
import { Trash2, Copy } from 'lucide-react';
import copy from 'copy-to-clipboard';
import { useMutation } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc-client';
import { toast } from 'sonner';

interface IDeleteFileProps {
  fileId: string;
}
export function DeleteFile(props: IDeleteFileProps) {
  const { fileId } = props;

  const { mutate: deleteFile, isPending } = useMutation(
    trpc.file.deleteFileById.mutationOptions({
      onSuccess: () => {
        toast.success('删除成功');
      },
    }),
  );

  return (
    <Button variant='destructive' disabled={isPending} onClick={() => deleteFile({ id: fileId })}>
      <Trash2 />
    </Button>
  );
}

export function CopyPath(props: { path: string; className?: string }) {
  const { path, className } = props;

  return (
    <Button
      variant='ghost'
      onClick={() => {
        if (copy(path)) toast.success('路径复制成功');
      }}
      className={className}>
      <Copy />
    </Button>
  );
}
