const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

// 求長度
function getLength(num) {
  let l = 0;
  let n = num;
  while (n >= 1) {
    n /= 10;
    l += 1;
  }
  return l;
}
// 判斷水仙花數
function isNarcissistic(num, l) {
  let result = 0;
  let n = num;
  const power = l;
  while (n >= 1) {
    result += n ** power;
    n = Math.floor(n / 10);
  }
  return result === num;
}

function solve(input) {
  const tmp = input[0].split(' ').map(Number);
  const form = tmp[0];
  const to = tmp[1];
  for (let i = form; i <= to; i += 1) {
    const l = getLength(i);
    if (isNarcissistic(i, l)) {
      console.log(i);
    }
  }
}

rl.on('close', () => {
  solve(lines);
});
