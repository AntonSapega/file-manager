import { storeController } from './storage/initStore.js';

function finishApp(readLineInstance) {
  storeController.sayGoodbye();
  readLineInstance.close();
}

export { finishApp };
