import Uppy from '@uppy/core';
export const UploadButton = (props: { uppy: Uppy }) => {
  const { uppy } = props;

  return (
    <input
      type='file'
      onChange={e => {
        if (!e.target.files) {
          return;
        }

        Array.from(e.target.files).forEach(file => {
          uppy.addFile({ data: file, name: file.name });
        });
      }}
    />
  );
};
