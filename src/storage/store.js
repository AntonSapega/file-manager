import os from 'os';
import { access } from 'node:fs/promises';
import * as pathMethod from 'path';
import { getUserName } from './getUserName.js';

const store = () => {
  let currentDir = null;

  return {
    userName: null,
    _homeDir: os.homedir(),

    init() {
      this.userName = getUserName();
      currentDir = this._homeDir;
      this.greet(this.userName);
    },
    async isExist(pathToDestination) {
      try {
        await access(pathToDestination);
      } catch (e) {
        throw e;
      }
    },
    getAbsolutePath(destination) {
      if (destination.startsWith(this._homeDir)) {
        return destination;
      }
      const newPath = pathMethod.join(currentDir, destination);
      return newPath;
    },
    async cd(url) {
      try {
        const sourcePath = this.getAbsolutePath(url);
        await this.isExist(sourcePath);
        currentDir = sourcePath;
      } catch (e) {
        throw Error('Operation failed');
      }
    },
    up() {
      const newPath = pathMethod.join(currentDir, '..');
      if (!newPath.startsWith(this._homeDir)) {
        throw Error('Operation failed');
      }
      currentDir = newPath;
    },
    printCurrentDir() {
      console.log(`You are currently in ${currentDir}`);
    },
    getCurrentDir() {
      return currentDir;
    },
    greet() {
      console.log(`Welcome to the File Manager, ${this.userName}\n`);
    },
    sayGoodbye() {
      console.log(`Thank you for using File Manager, ${this.userName}!`);
    },
  };
};

export { store };
