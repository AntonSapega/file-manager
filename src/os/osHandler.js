import os from 'os';

const osHandler = (command) => {
  switch (command) {
    case '--EOL':
      console.log(JSON.stringify(os.EOL));
      break;
    case '--cpus':
      const cpus = os.cpus();
      console.log(`Overall amount: ${cpus.length}`);
      cpus.forEach((cpu) => {
        console.log('Model and clock rate: ', cpu.model);
      });
      break;
    case '--homedir':
      console.log(os.homedir());
      break;
    case '--username':
      console.log(os.userInfo().username);
      break;
    case '--architecture':
      console.log(os.arch());
      break;
    default:
      console.log('Invalid input');
  }
};

export { osHandler };
