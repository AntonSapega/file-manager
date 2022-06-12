import { rm } from 'fs/promises';
import { copyFile } from './copyFile.js';
import { storeController } from './storage/initStore.js';

//! Try catch
const moveFile = async (sourcePath, newDirectoryPath) => {
  const primaryFilePath = storeController.getAbsolutePath(sourcePath);
  await copyFile(sourcePath, newDirectoryPath);
  await rm(primaryFilePath);
};

export { moveFile };
