import { rename } from 'fs/promises';
import { join, dirname } from 'path';
import { dirStateController } from './init.js';

const renameFile = async (targetFilePath, newFileName) => {
  try {
    const targetPath = dirStateController.getAbsolutePath(targetFilePath);
    const pathToDir = dirname(targetPath);
    const pathToNewFile = join(pathToDir, newFileName);

    await rename(targetPath, pathToNewFile);
  } catch {
    throw Error('Operation Failed');
  }
};

export { renameFile };
