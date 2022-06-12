function getUserName() {
  const args = process.argv.slice(2);
  const userNameArg = args.find((arg) => arg.startsWith('--username'));
  const name = userNameArg.split('=')[1];
  return name;
}

export { getUserName };
