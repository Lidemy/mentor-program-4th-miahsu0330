const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

/* 製作迷宮
| 先取得每行值並用 split 分開
| 將值轉成數字 路：1；牆：0
| push 每行陣列
*/
function getMaze(input, H) {
  const result = [];
  for (let i = 1; i <= H; i += 1) {
    const tmp = input[i].split('');
    for (let j = 0; j < tmp.length; j += 1) {
      if (tmp[j] === '.') {
        tmp[j] = 1;
      } else {
        tmp[j] = 0;
      }
    }
    result.push(tmp);
  }
  return result;
}

/* 判斷出口
| 檢查步數陣列有沒有出口，如果有，回傳 true，否則回傳 false
*/
function isExit(arrLastStep, exitY, exitX) {
  for (let i = 0; i < arrLastStep.length; i += 1) {
    if (arrLastStep[i].y === exitY && arrLastStep[i].x === exitX) {
      return true;
    }
  }
  return false;
}

/* 找下一步
| 將最後一次的步數陣列跑回圈得到座標
| 確認上下左右是否有路（要另外判斷邊界）
| 如果有 push 到 arrNextStep，並改變迷宮座標的數字為 -1
| 回傳下一步陣列
*/
function getNextArrStep(maze, arrLastStep) {
  const arrNextStep = [];
  const arrMaze = maze;
  for (let i = 0; i < arrLastStep.length; i += 1) {
    const indexY = arrLastStep[i].y;
    const indexX = arrLastStep[i].x;
    // 下方
    if (indexY + 1 < maze.length // 判斷邊界
        && maze[indexY + 1][indexX] === 1 // 判斷是路還是牆
        && maze[indexY + 1][indexX] !== -1) { // 判斷有沒有走過
      arrMaze[indexY + 1][indexX] = -1;
      arrNextStep.push({ y: indexY + 1, x: indexX });
    }
    // 上方
    if (indexY > 0 && maze[indexY - 1][indexX] === 1 && maze[indexY - 1][indexX] !== -1) {
      arrMaze[indexY - 1][indexX] = -1;
      arrNextStep.push({ y: indexY - 1, x: indexX });
    }
    // 右方
    if (indexX + 1 < maze[0].length
        && maze[indexY][indexX + 1] === 1
        && maze[indexY][indexX + 1] !== -1) {
      arrMaze[indexY][indexX + 1] = -1;
      arrNextStep.push({ y: indexY, x: indexX + 1 });
    }
    // 左方
    if (indexX > 0 && maze[indexY][indexX - 1] === 1 && maze[indexY][indexX - 1] !== -1) {
      arrMaze[indexY][indexX - 1] = -1;
      arrNextStep.push({ y: indexY, x: indexX - 1 });
    }
  }
  return arrNextStep;
}

/* 走迷宮
| 判斷最後一次步數陣列有沒有出口，如果有，回傳步數陣列
| 如果沒有，就走下一步並在 push 到步數陣列
| 遞迴
*/
function goMaze(arrMaze, arrStep) {
  const map = arrMaze;
  const exitY = arrMaze.length - 1;
  const exitX = arrMaze[0].length - 1;
  const arrLastStep = arrStep[arrStep.length - 1];
  if (isExit(arrLastStep, exitY, exitX)) { // 檢查最後一次步數陣列有沒有出口
    return arrStep;
  }
  arrStep.push(getNextArrStep(map, arrLastStep)); // 找下一步
  return goMaze(arrMaze, arrStep); // 遞迴
}

function solve(input) {
  const [H, W] = input[0].split(' ').map(Number); // 將迷宮的高、寬取出轉數字
  const arrMaze = getMaze(input, H, W); // 迷宮陣列
  arrMaze[0][0] = -1; // 讓起點 = -1
  const arrStep = [
    [{ y: 0, x: 0 }], // 將步數陣列放入起點
  ];
  goMaze(arrMaze, arrStep); // 走迷宮
  console.log(arrStep.length - 1); // 步數陣列的長度 - 1 等於最短距離
}

rl.on('close', () => {
  solve(lines);
});
