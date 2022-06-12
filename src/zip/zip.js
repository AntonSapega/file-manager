import { createReadStream, createWriteStream } from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream/promises';
import { storeController } from '../storage/initStore.js';

const zip = async (operation, pathToSource, destination) => {
  const absolutePathToSource = storeController.getAbsolutePath(pathToSource);
  const absoluteDestinationPath = storeController.getAbsolutePath(destination);
  const readStream = createReadStream(absolutePathToSource);
  const writeStream = createWriteStream(absoluteDestinationPath);
  let archiver = null;

  switch (operation) {
    case 'compress':
      archiver = zlib.createBrotliCompress();
      break;
    case 'decompress':
      archiver = zlib.createBrotliDecompress();
  }

  try {
    await pipeline(readStream, archiver, writeStream);
  } catch (e) {
    throw Error('Operation failed');
  }
};

export { zip };
