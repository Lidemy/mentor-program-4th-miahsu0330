const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});


function compare(a, b) {
  if (a === b) return 'DRAW';
  if (a.length > b.length) return 'A';
  if (a.length < b.length) return 'B';
  for (let i = 0; i < a.length; i += 1) {
    if (Number(a[i]) > Number(b[i])) return 'A';
    if (Number(a[i]) < Number(b[i])) return 'B';
  }
  return false;
}


function solve(input) {
  const M = input[0];
  for (let i = 1; i <= M; i += 1) {
    const tmp = input[i].split(' ');
    const rule = Number(tmp[2]);
    const a = tmp[0];
    const b = tmp[1];
    if (rule === 1) console.log(compare(a, b));
    if (rule === -1) console.log(compare(b, a));
  }
}

rl.on('close', () => {
  solve(lines);
});
