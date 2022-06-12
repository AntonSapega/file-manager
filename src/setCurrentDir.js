import os from 'os';
import { access } from 'node:fs/promises';
import * as pathMethod from 'path';

const setCurrentDir = () => {
  let path = null; // current path

  return {
    _homeDir: os.homedir(),

    init() {
      path = this._homeDir;
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
      const newPath = pathMethod.join(path, destination);
      return newPath;
    },
    async cd(url) {
      try {
        const sourcePath = this.getAbsolutePath(url);
        await this.isExist(sourcePath);
        path = sourcePath;
      } catch (e) {
        throw Error('Operation failed');
      }
    },
    up() {
      const newPath = pathMethod.join(path, '..');
      if (!newPath.startsWith(this._homeDir)) {
        throw Error('Operation failed');
      }
      path = newPath;
    },
    printCurrentPath() {
      console.log(`You are currently in ${path}`);
    },
    getCurrentPath() {
      return path;
    },
  };
};

export { setCurrentDir };
