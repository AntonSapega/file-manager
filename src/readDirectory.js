import { readdir } from 'fs/promises';

//! Move to store
const readDirectory = async (path) => {
  try {
    const files = await readdir(path, { encoding: 'utf8' });
    console.log(files);
  } catch (e) {
    throw Error(`Operation failed`);
  }
};

export { readDirectory };
