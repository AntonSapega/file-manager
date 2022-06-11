import { getUserName } from './getUserName.js';
import * as readline from 'node:readline';
import { readDirectory } from './readDirectory.js';
import { setCurrentDir } from './setCurrentDir.js';
import { readFile } from './readFile.js';
import { createFile } from './createFile.js';
import { userName, dirStateController, init } from './init.js';
import { renameFile } from './renameFile.js';
import { copyFile } from './copyFile.js';
import { moveFile } from './moveFile.js';
import { deleteFile } from './deleteFile.js';

async function flManager() {
  // INITIAL FM
  // const userName = getUserName();
  // greetUser(userName);
  // const directoryState = setCurrentDir();
  // directoryState.init();
  // printCurrentDirectory(directoryState.getCurrentPath());
  //************** */

  // INIT FM (SECOND VERSION);
  init();
  // *******************

  const rl = readline.createInterface(process.stdin, process.stdout);

  rl.on('line', async (line) => {
    const [command, ...args] = line.split(' ');
    const param = args.join(' ');
    // console.log(command);
    // console.log(param);

    try {
      switch (command) {
        case '.exit':
          finishFM(rl, userName);
          break;
        case 'ls':
          await readDirectory(dirStateController.getCurrentPath());
          dirStateController.printCurrentPath();
          break;
        case 'cd':
          await dirStateController.cd(param);
          dirStateController.printCurrentPath();
          break;
        case 'up':
          dirStateController.up();
          dirStateController.printCurrentPath();
          break;
        case 'cat':
          await readFile(dirStateController.getCurrentPath(), param);
          dirStateController.printCurrentPath();
          break;
        case 'add':
          createFile(dirStateController.getCurrentPath(), param);
          dirStateController.printCurrentPath();
          break;
        case 'rn':
          const renameData = param.split(' ');
          const [path, newFileName] = renameData;
          await renameFile(path, newFileName);
          dirStateController.printCurrentPath();
          break;
        case 'cp':
          const copyData = param.split(' ');
          const [sourcePath, finalDir] = copyData;
          await copyFile(sourcePath, finalDir);
          dirStateController.printCurrentPath();
          break;
        case 'mv':
          const moveData = param.split(' ');
          const [currentPathToFile, destination] = moveData;
          await moveFile(currentPathToFile, destination);
          dirStateController.printCurrentPath();
          break;
        case 'rm':
          await deleteFile(param);
          dirStateController.printCurrentPath();
          break;
        default:
          console.log('Invalid input');
      }
    } catch (error) {
      console.log(error.message);
    }
  });

  rl.on('SIGINT', () => {
    finishFM(rl, userName);
  });
}

function finishFM(readLineInstance, name) {
  console.log(`Thank you for using File Manager, ${name}!`);
  readLineInstance.close();
}

flManager();
