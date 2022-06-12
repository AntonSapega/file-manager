import * as readline from 'node:readline';
import { readDirectory } from './readDirectory.js';
import { readFile } from './basicFileOperations/readFile.js';
import { createFile } from './basicFileOperations/createFile.js';
import { storeController, initStore } from './storage/initStore.js';
import { renameFile } from './basicFileOperations/renameFile.js';
import { copyFile } from './basicFileOperations/copyFile.js';
import { moveFile } from './basicFileOperations/moveFile.js';
import { deleteFile } from './basicFileOperations/deleteFile.js';
import { osHandler } from './os/osHandler.js';
import { makeHash } from './makeHash.js';
import { compress } from './zip/compress.js';
import { decompress } from './zip/decompress.js';

async function flManager() {
  initStore();
  storeController.printCurrentDir();

  const rl = readline.createInterface(process.stdin, process.stdout);

  rl.on('line', async (line) => {
    const [command, ...args] = line.split(' ');
    const param = args.join(' ');

    try {
      switch (command) {
        case '.exit':
          finishFM(rl);
          break;
        case 'ls':
          await readDirectory(storeController.getCurrentDir());
          storeController.printCurrentDir();
          break;
        case 'cd':
          await storeController.cd(param);
          storeController.printCurrentDir();
          break;
        case 'up':
          storeController.up();
          storeController.printCurrentDir();
          break;
        case 'cat':
          await readFile(param);
          storeController.printCurrentDir();
          break;
        case 'add':
          await createFile(param);
          storeController.printCurrentDir();
          break;
        case 'rn':
          const renameData = param.split(' ');
          const [path, newFileName] = renameData;
          await renameFile(path, newFileName);
          storeController.printCurrentDir();
          break;
        case 'cp':
          const copyData = param.split(' ');
          const [sourcePath, finalDir] = copyData;
          await copyFile(sourcePath, finalDir);
          storeController.printCurrentDir();
          break;
        case 'mv':
          const moveData = param.split(' ');
          const [currentPathToFile, destination] = moveData;
          await moveFile(currentPathToFile, destination);
          storeController.printCurrentDir();
          break;
        case 'rm':
          await deleteFile(param);
          storeController.printCurrentDir();
          break;
        case 'os':
          osHandler(param);
          storeController.printCurrentDir();
          break;
        case 'hash':
          await makeHash(param);
          storeController.printCurrentDir();
          break;
        case 'compress':
          const compressData = param.split(' ');
          const [pathToSourceFile, finalPath] = compressData;
          await compress(pathToSourceFile, finalPath);
          storeController.printCurrentDir();
          break;
        case 'decompress':
          const decompressData = param.split(' ');
          const [routeToSourceFile, finalRoute] = decompressData;
          await decompress(routeToSourceFile, finalRoute);
          storeController.printCurrentDir();
          break;
        default:
          console.log('Invalid input');
      }
    } catch (error) {
      console.log(error.message);
    }
  });

  rl.on('SIGINT', () => {
    finishFM(rl);
  });
}

function finishFM(readLineInstance) {
  storeController.sayGoodbye();
  readLineInstance.close();
}

flManager();
