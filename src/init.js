import { getUserName } from './getUserName.js';
import { setCurrentDir } from './setCurrentDir.js';

const userName = getUserName();
let dirStateController = null;

const init = () => {
  greetUser(userName);

  dirStateController = setCurrentDir();
  dirStateController.init();
  dirStateController.printCurrentPath();
};

function greetUser(name) {
  console.log(`Welcome to the File Manager, ${name}\n`);
}

export { userName, dirStateController, init };
