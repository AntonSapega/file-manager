// import os from 'os';
// import { access } from 'node:fs/promises';
// import * as pathMethod from 'path';

// const setCurrentDir = () => {
//   let path = null;

//   return {
//     _homeDir: os.homedir(),

//     init() {
//       path = this._homeDir;
//     },
//     async cd(url) {
//       try {
//         if (url.startsWith(this._homeDir)) {
//           const haveAccess = await access(url);
//           console.log('have access: ', haveAccess)
//           path = url;
//           return;
//         }
//         const newPath = pathMethod.join(path, url);
//         await access(newPath);
//         path = newPath;
//       } catch (err) {
//         throw Error('Operation failed');
//       }
//     },
//     up() {
//       const newPath = pathMethod.join(path, '..');
//       if (!newPath.startsWith(this._homeDir)) {
//         throw Error('Operation failed');
//       }
//       path = newPath;
//     },
//     printCurrentPath() {
//       console.log(`You are currently in ${path}`);
//     },
//     getCurrentPath() {
//       return path;
//     },
//   };
// };

// export { setCurrentDir };

// import os from 'os';
// import { access } from 'node:fs';
// import * as pathMethod from 'path';

// const setCurrentDir = () => {
//   let path = null;

//   return {
//     _homeDir: os.homedir(),

//     init() {
//       path = this._homeDir;
//     },
//     checkExist(pathToDestination) {
//       access(pathToDestination, (err) => {
//         if (err) {
//           throw Error('Operation Failed');
//         } else
//       })
//     },
//     async cd(url) {
//       try {
//         if (url.startsWith(this._homeDir)) {
//           const haveAccess = await access(url);
//           console.log('have access: ', haveAccess)
//           path = url;
//           return;
//         }
//         const newPath = pathMethod.join(path, url);
//         await access(newPath);
//         path = newPath;
//       } catch (err) {
//         throw Error('Operation failed');
//       }
//     },
//     up() {
//       const newPath = pathMethod.join(path, '..');
//       if (!newPath.startsWith(this._homeDir)) {
//         throw Error('Operation failed');
//       }
//       path = newPath;
//     },
//     printCurrentPath() {
//       console.log(`You are currently in ${path}`);
//     },
//     getCurrentPath() {
//       return path;
//     },
//   };
// };

// export { setCurrentDir };

//****************** */

import os from 'os';
import { access } from 'node:fs/promises';
import { stat } from 'fs/promises';
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

      // try {
      //   const stats = await stat(pathToDestination);
      //   return stats ? true : false;
      // } catch {
      //   throw Error('Failed from isExist');
      // }
    },
    getAbsolutePath(destination) {
      // try {
      //   if (destination.startsWith(this._homeDir)) {
      //     await this.isExist(destination);
      //     return destination;
      //   }
      //   const newPath = pathMethod.join(path, destination);
      //   await this.isExist(newPath);
      //   return newPath;
      // } catch (e) {
      //   throw e;
      // }

      if (destination.startsWith(this._homeDir)) {
        return destination;
      }
      const newPath = pathMethod.join(path, destination);
      return newPath;
    },
    async cd(url) {
      try {
        // let preparedPath = null;
        // if (url.startsWith(this._homeDir)) {
        //   await this.isExist(url);
        //   preparedPath = url;
        // } else {
        //   preparedPath = pathMethod.join(path, url);
        // }
        // await this.isExist(preparedPath);
        // path = preparedPath;
        const sourcePath = this.getAbsolutePath(url);
        await this.isExist(sourcePath);
        path = sourcePath;
      } catch (e) {
        throw Error('Operation Filed bbbbbbbb');
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
