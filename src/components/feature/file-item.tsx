import Image from 'next/image';
import { useMemo } from 'react';

interface IFileItemProps {
  isImage: boolean;
  name: string;
  url: string;
}
export const FileItem = (props: IFileItemProps) => {
  const { isImage, name, url } = props;
  return isImage ? (
    <Image src={url} className='h-full object-contain' alt={name} width={120} height={120} />
  ) : (
    <Image src='/file.svg' alt={name} width={120} height={120} className='h-full' />
  );
};

interface ILocalFileItemProps {
  file: File | Blob;
}

export const LocalFileItem = (props: ILocalFileItemProps) => {
  const { file } = props;
  const isImage = file.type.startsWith('image/');

  const url = useMemo(() => (isImage ? URL.createObjectURL(file) : ''), [file, isImage]);

  return <FileItem isImage={isImage} name={file instanceof File ? file.name : 'File'} url={url} />;
};

interface IRemoteFileItemProps {
  url: string;
  name: string;
  contentType: string;
}
export const RemoteFileItem = (props: IRemoteFileItemProps) => {
  const { url, name, contentType } = props;

  const isImage = contentType.startsWith('image/');
  return <FileItem isImage={isImage} name={name} url={url} />;
};
