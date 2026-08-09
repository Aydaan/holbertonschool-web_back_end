console.log('Welcome to Holberton School, what is your name?');

process.stdin.on('readable', () => {
  const input = process.stdin.read();

  if (input !== null) {
    console.log(`Your name is: ${input.toString().trim()}`);
  }
});

process.stdin.on('end', () => {
  console.log('This important software is now closing');
});
