import * as readline from 'node:readline';
import { storeController, initStore } from './storage/initStore.js';
import { commandsHandler } from './commandsHandler.js';
import { finishApp } from './finishApp.js';

async function flManager() {
  initStore();
  storeController.printCurrentDir();

  const rl = readline.createInterface(process.stdin, process.stdout);

  rl.on('line', async (line) => {
    const [command, ...args] = line.split(' ');
    const param = args.join(' ');
    commandsHandler(command, param, rl);
  });

  rl.on('SIGINT', () => {
    finishApp(rl);
  });
}

flManager();
