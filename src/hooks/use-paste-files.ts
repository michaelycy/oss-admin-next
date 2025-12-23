import { useEffect } from 'react';

export const usePasteFiles = (onFilePaste: (files: File[]) => void) => {
  useEffect(() => {
    const pasteHandler = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      const newFiles: File[] = [];
      for (const item of items) {
        if (item.type.indexOf('image') !== -1) {
          const current = item.getAsFile();
          if (!current) continue;
          newFiles.push(current);
        }
      }

      if (newFiles.length > 0) {
        onFilePaste(newFiles);
      }
    };

    document.addEventListener('paste', pasteHandler);

    return () => {
      document.removeEventListener('paste', pasteHandler);
    };
  }, []);
};
