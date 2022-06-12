import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { basename, join } from 'path';
import { storeController } from '../storage/initStore.js';

const copyFile = async (fileForCopyPath, destinationDir) => {
  const targetFilePath = storeController.getAbsolutePath(fileForCopyPath);
  const fileName = basename(targetFilePath);
  const finalDir = storeController.getAbsolutePath(destinationDir);
  const fullPath = join(finalDir, fileName);
  try {
    await storeController.isExist(targetFilePath);
    const readStream = createReadStream(targetFilePath, { flags: 'r' }, 'utf8');
    const writeStream = createWriteStream(fullPath, { flags: 'w' });
    await pipeline(readStream, writeStream);
  } catch (error) {
    throw Error('Operation failed');
  }
};

export { copyFile };
