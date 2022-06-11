import { createWriteStream } from 'fs';
import path from 'path';
import { pipeline } from 'stream';

// File was created successfully
const createFile = (dirPath, fileName) => {
  const newFilePath = path.join(dirPath, fileName);
  const writeStream = createWriteStream(newFilePath);
  // const output = process.stdout.write('File was created successfully\n')

  // pipeline(
  //   writeStream,
  //   output,
  //   // (err) => {
  //   //   if (err) {
  //   //     throw Error('Operation Failed');
  //   //   } else {
  //   //     console.log('Hi')
  //   //   }
  //   // }
  // );
};

export { createFile };
