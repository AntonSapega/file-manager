import { createReadStream } from 'fs';
import { storeController } from './storage/initStore.js';
import { pipeline } from 'stream/promises';
import { Writable } from 'stream';

const readFile = async (pathToDirectory) => {
  const targetFilePath = storeController.getAbsolutePath(pathToDirectory);
  const readStream = createReadStream(targetFilePath);
  const writeStream = new Writable({
    write(chunk, encoding, callback) {
      console.log(chunk.toString());
      callback();
    },
  });

  try {
    await pipeline(readStream, writeStream);
  } catch {
    throw Error('Operation failed');
  }
};

export { readFile };
