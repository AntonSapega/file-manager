import { store } from './store.js';

let storeController = null;

const initStore = () => {
  storeController = store();
  storeController.init();
};

export { storeController, initStore };
