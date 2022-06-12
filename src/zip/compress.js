import { createReadStream, createWriteStream } from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream/promises';
import { storeController } from '../storage/initStore.js';

const compress = async (pathToSource, destination) => {
  const absolutePathToSource = storeController.getAbsolutePath(pathToSource);
  const absoluteDestinationPath = storeController.getAbsolutePath(destination);
  const readStream = createReadStream(absolutePathToSource);
  const writeStream = createWriteStream(absoluteDestinationPath);
  const compressStream = zlib.createBrotliCompress();

  try {
    await pipeline(readStream, compressStream, writeStream);
  } catch (e) {
    throw Error('Operation failed');
  }
};

export { compress };
