import { createReadStream, createWriteStream } from 'fs';
import zlib from 'zlib';
import { pipeline } from 'stream/promises';
import { dirStateController } from '../init.js';

const decompress = async (pathToSource, destination) => {
  const absolutePathToSource = dirStateController.getAbsolutePath(pathToSource);
  const absoluteDestinationPath = dirStateController.getAbsolutePath(destination);
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
