import type React from 'react';
import {useState, useEffect} from 'react';
import {
  getStaticFiles,
  reevaluateComposition,
  watchPublicFolder,
} from '@remotion/studio';

const getCurrentHash = () => {
  const files = getStaticFiles();
  const codeFiles = files.filter((file) => file.name.startsWith('code'));
  const contents = codeFiles.map((file) => file.src + file.lastModified);
  return contents.join('');
};

export const RefreshOnCodeChange: React.FC = () => {
  const [files, setFiles] = useState(getCurrentHash());

  useEffect(() => {
    const {cancel} = watchPublicFolder(() => {
      const hash = getCurrentHash();
      if (hash !== files) {
        setFiles(hash);
        reevaluateComposition();
      }
    });

    return () => {
      cancel();
    };
  }, [files]);

  return null;
};
