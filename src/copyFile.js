import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { basename, join } from 'path';
import { dirStateController } from './init.js';

const copyFile = async (fileForCopyPath, destinationDir) => {
  const targetFilePath = dirStateController.getAbsolutePath(fileForCopyPath);
  const fileName = basename(targetFilePath);
  const finalDir = dirStateController.getAbsolutePath(destinationDir);
  const fullPath = join(finalDir, fileName);
  try {
    await dirStateController.isExist(targetFilePath);
    const readStream = createReadStream(targetFilePath, { flags: 'r' }, 'utf8');
    const writeStream = createWriteStream(fullPath, { flags: 'w' });
    await pipeline(readStream, writeStream);
  } catch (error) {
    throw Error('Operation failed');
  }
};

export { copyFile };
