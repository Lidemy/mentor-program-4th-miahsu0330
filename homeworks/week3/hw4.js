const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});


function solve(input) {
  const tmp = input[0];
  let reverse = '';
  for (let i = tmp.length - 1; i >= 0; i -= 1) {
    reverse += tmp[i];
  }
  if (tmp === reverse) {
    console.log('True');
  } else {
    console.log('False');
  }
}

rl.on('close', () => {
  solve(lines);
});
