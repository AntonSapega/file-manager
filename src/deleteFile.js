import { rm } from 'fs/promises';
import { storeController } from './storage/initStore.js';

const deleteFile = async (sourcePath) => {
  try {
    const absolutePath = storeController.getAbsolutePath(sourcePath);
    await storeController.isExist(absolutePath);
    await rm(absolutePath);
  } catch (error) {
    throw Error('Operation failed');
  }
};

export { deleteFile };
