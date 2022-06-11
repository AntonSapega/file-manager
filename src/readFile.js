import { createReadStream } from 'fs';
import path from 'path';
import { access } from 'fs';
import { dirStateController } from './init.js';

const readFile = async (pathToDirectory, file) => {
  await new Promise((resolve, reject) => {
    const rootDirectory = dirStateController._homeDir;
    let sourcePath = path.join(pathToDirectory, file);

    if (file.startsWith(rootDirectory)) {
      sourcePath = path.join(file);
    }
    //! IT WORK SYNCHRONOUSLY
    access(sourcePath, (err) => {
      if (err) {
        reject();
      }
    });

    const readStream = createReadStream(sourcePath, 'utf8');

    readStream.on('data', (chunk) => {
      process.stdout.write(chunk);
      process.stdout.write('\n');
    });
    readStream.on('end', () => {
      resolve();
    });
    readStream.on('error', (e) => {
      reject();
    });
  }).catch(() => {
    throw Error('Operation Failed');
  });
};

export { readFile };
