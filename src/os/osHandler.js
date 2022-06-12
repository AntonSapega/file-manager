import os from 'os';

const osHandler = (command) => {
  switch (command) {
    case '--EOL':
      console.log(JSON.stringify(os.EOL));
      break;
    case '--cpus':
      const cpus = os.cpus();
      console.log(`Overall amount of CPUS: ${cpus.length}`);
      const requestedInfo = cpus.map((cpu) => {
        return {
          model: cpu.model,
          speed: cpu.speed / 1000,
        };
      });
      console.log(requestedInfo);
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
