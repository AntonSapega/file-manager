import { rm } from 'fs/promises';
import { copyFile } from './copyFile.js';
import { dirStateController } from './init.js';

//! Try catch
const moveFile = async (sourcePath, newDirectoryPath) => {
  const primaryFilePath = dirStateController.getAbsolutePath(sourcePath);
  await copyFile(sourcePath, newDirectoryPath);
  await rm(primaryFilePath);
};

export { moveFile };
