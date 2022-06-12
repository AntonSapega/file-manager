import { rm } from 'fs/promises';
import { copyFile } from './copyFile.js';
import { storeController } from './storage/initStore.js';

const moveFile = async (sourcePath, newDirectoryPath) => {
  const primaryFilePath = storeController.getAbsolutePath(sourcePath);
  try {
    await copyFile(sourcePath, newDirectoryPath);
    await rm(primaryFilePath);
  } catch (e) {
    throw Error('Operation failed');
  }
};

export { moveFile };
