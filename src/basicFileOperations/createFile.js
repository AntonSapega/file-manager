import { createWriteStream } from 'fs';
import { Readable } from 'stream';
import { pipeline } from 'stream/promises';
import { storeController } from '../storage/initStore.js';

const createFile = async (fileName) => {
  const absolutePath = storeController.getAbsolutePath(fileName);

  const writeStream = createWriteStream(absolutePath);
  const readStream = new Readable({
    read() {},
  });
  readStream.push(null);

  try {
    await pipeline(readStream, writeStream);
  } catch (e) {
    throw Error('Operation failed');
  }
};

export { createFile };
