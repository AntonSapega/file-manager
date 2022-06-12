import { createReadStream } from 'fs';
import crypto from 'crypto';
import { storeController } from './storage/initStore.js';

const makeHash = async (pathToFile) => {
  const absolutePath = storeController.getAbsolutePath(pathToFile);
  const readStream = createReadStream(absolutePath, 'utf8');
  let content = '';

  await new Promise((resolve, reject) => {
    readStream
      .on('error', (error) => {
        reject(error);
      })
      .on('data', (chunk) => (content = content + chunk))
      .on('end', () => {
        const hash = getHash(content);
        resolve(hash);
      });
  })
    .then((result) => {
      console.log('hash: ', result);
    })
    .catch((e) => {
      throw Error('Operation failed');
    });
};

function getHash(str) {
  return crypto.createHash('sha256').update(str).digest('hex');
}

export { makeHash };
