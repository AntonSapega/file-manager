import { createReadStream, createWriteStream } from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream/promises';
import { dirStateController } from '../init.js';

const compress = async (pathToSource, destination) => {
  const absolutePathToSource = dirStateController.getAbsolutePath(pathToSource);
  const absoluteDestinationPath = dirStateController.getAbsolutePath(destination);
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
