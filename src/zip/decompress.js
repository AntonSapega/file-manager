import { createReadStream, createWriteStream } from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream/promises';
import { storeController } from '../storage/initStore.js';

const decompress = async (pathToSource, destination) => {
  const absolutePathToSource = storeController.getAbsolutePath(pathToSource);
  const absoluteDestinationPath = storeController.getAbsolutePath(destination);
  const readStream = createReadStream(absolutePathToSource);
  const decompressStream = zlib.createBrotliDecompress();
  const writeStream = createWriteStream(absoluteDestinationPath);

  try {
    await pipeline(readStream, decompressStream, writeStream);
  } catch (e) {
    throw Error('Operation failed');
  }
};

export { decompress };
