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
  let result = '';
  for (let i = 1; i <= tmp; i += 1) {
    result += '*';
    console.log(result);
  }
}

rl.on('close', () => {
  solve(lines);
});
