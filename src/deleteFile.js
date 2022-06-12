import { rm } from 'fs/promises';
import { dirStateController } from './init.js';

const deleteFile = async (sourcePath) => {
  try {
    const absolutePath = dirStateController.getAbsolutePath(sourcePath);
    await dirStateController.isExist(absolutePath);
    await rm(absolutePath);
  } catch (error) {
    throw Error('Operation failed');
  }
};

export { deleteFile };
