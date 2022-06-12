import { finishApp } from './finishApp.js';
import { storeController } from './storage/initStore.js';
import { readDirectory } from './folderOperations/readDirectory.js';
import { readFile } from './basicFileOperations/readFile.js';
import { createFile } from './basicFileOperations/createFile.js';
import { renameFile } from './basicFileOperations/renameFile.js';
import { copyFile } from './basicFileOperations/copyFile.js';
import { moveFile } from './basicFileOperations/moveFile.js';
import { deleteFile } from './basicFileOperations/deleteFile.js';
import { osHandler } from './os/osHandler.js';
import { makeHash } from './hash/makeHash.js';
import { compress } from './zip/compress.js';
import { decompress } from './zip/decompress.js';

const commandsHandler = async (command, params, readline) => {
  try {
    switch (command) {
      case '.exit':
        finishApp(readline);
        break;
      case 'ls':
        await readDirectory(storeController.getCurrentDir());
        storeController.printCurrentDir();
        break;
      case 'cd':
        await storeController.cd(params);
        storeController.printCurrentDir();
        break;
      case 'up':
        storeController.up();
        storeController.printCurrentDir();
        break;
      case 'cat':
        await readFile(params);
        storeController.printCurrentDir();
        break;
      case 'add':
        await createFile(params);
        storeController.printCurrentDir();
        break;
      case 'rn':
        const renameData = params.split(' ');
        const [path, newFileName] = renameData;
        await renameFile(path, newFileName);
        storeController.printCurrentDir();
        break;
      case 'cp':
        const copyData = params.split(' ');
        const [sourcePath, finalDir] = copyData;
        await copyFile(sourcePath, finalDir);
        storeController.printCurrentDir();
        break;
      case 'mv':
        const moveData = params.split(' ');
        const [currentPathToFile, destination] = moveData;
        await moveFile(currentPathToFile, destination);
        storeController.printCurrentDir();
        break;
      case 'rm':
        await deleteFile(params);
        storeController.printCurrentDir();
        break;
      case 'os':
        osHandler(params);
        storeController.printCurrentDir();
        break;
      case 'hash':
        await makeHash(params);
        storeController.printCurrentDir();
        break;
      case 'compress':
        const compressData = params.split(' ');
        const [pathToSourceFile, finalPath] = compressData;
        await compress(pathToSourceFile, finalPath);
        storeController.printCurrentDir();
        break;
      case 'decompress':
        const decompressData = params.split(' ');
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
};

export { commandsHandler };
