const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});


function inputItem(arrWeight, item) {
  const result = [];
  const w = item.weight;
  const p = item.price;
  for (let i = 0; i < arrWeight.length; i += 1) {
    // 每個物品只能放一次，所以要在迴圈裡賦值(記憶體問題)
    result[i] = arrWeight[i];
    // 如果 w 小於等於 包包限重代表有放入的可能性
    if (w <= i) {
      // 取得這輪物品放入包包的最大值
      const value = p + arrWeight[i - w];
      // 判斷前一輪最大值是否小於這輪物品放入包包的最大值，如果是，更新最大值
      if (arrWeight[i] < value) {
        result[i] = value;
      }
    }
  }
  return result;
}


function solve(input) {
  const [n, maxWeight] = input[0].split(' ').map(Number);
  // 放物品包包的 arr 要建立 n + 1 個，因為也有只放入當下物品的情況
  let arrWeight = [];
  for (let i = 0; i <= maxWeight; i += 1) {
    arrWeight[i] = 0;
  }
  // 物品的 arr
  const arrItem = [];
  for (let i = 1; i <= n; i += 1) {
    const [weight, price] = input[i].split(' ').map(Number);
    arrItem.push({
      weight,
      price,
    });
  }
  // 每個物品決定放或不放
  for (let i = 0; i < arrItem.length; i += 1) {
    arrWeight = inputItem(arrWeight, arrItem[i]);
  }
  // log 最大值
  console.log(arrWeight[arrWeight.length - 1]);
}

rl.on('close', () => {
  solve(lines);
});
