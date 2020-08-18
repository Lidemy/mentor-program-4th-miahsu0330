/* eslint-disable func-names */
const URL = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery';
const objPrize = {
  first: {
    text: '恭喜你中頭獎了！日本東京來回雙人遊！',
    elClass: 'first',
  },
  second: {
    text: '二獎！90 吋電視一台！',
    elClass: 'second',
  },
  third: {
    text: '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！',
    elClass: 'third',
  },
  none: {
    text: '銘謝惠顧',
    elClass: 'none',
  },
};
const errorMessage = '系統不穩定，請再試一次';

// 內容置換
function renderPrize(obj) {
  const { text, elClass } = obj;
  const prizeSection = document.querySelector('.prizeDraw');
  const descBlock = document.querySelector('.lotteryDesc');
  const resultBlock = document.querySelector('.lotteryResult');
  const resultText = resultBlock.querySelector('.prize__text');

  descBlock.classList.add('hide');
  resultBlock.classList.add('show');
  resultText.innerText = text;
  prizeSection.classList.add(elClass);
}

// 抽獎
function lottery(resText) {
  const prize = resText.prize || null;
  let prizeText = '';
  switch (prize) {
    case 'FIRST':
      prizeText = objPrize.first;
      break;
    case 'SECOND':
      prizeText = objPrize.second;
      break;
    case 'THIRD':
      prizeText = objPrize.third;
      break;
    case 'NONE':
      prizeText = objPrize.none;
      break;
    default:
      alert(errorMessage);
      return;
  }
  renderPrize(prizeText);
}

// 發送 request
function draw(cb) {
  const request = new XMLHttpRequest();
  request.open('GET', URL);
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      let data = '';
      // 新增測試
      try {
        data = JSON.parse(request.responseText);
      } catch (err) {
        cb(errorMessage);
        console.log(err);
        return;
      }
      cb(null, data);
    } else {
      cb(errorMessage);
    }
  };
  request.onerror = function () {
    cb(errorMessage);
  };
  request.send();
}


// 監聽 click 事件
window.onload = function () {
  document.querySelector('.btn-prizeDraw').addEventListener('click', () => {
    draw((err, data) => {
      if (err) {
        alert(err);
        return;
      }
      lottery(data);
    });
  });
  document.querySelector('.resetLottery').addEventListener('click', () => {
    const prizeSection = document.querySelector('.prizeDraw');
    const descBlock = document.querySelector('.lotteryDesc');
    const resultBlock = document.querySelector('.lotteryResult');
    descBlock.classList.remove('hide');
    resultBlock.classList.remove('show');
    prizeSection.className = 'prizeDraw';
  });
};
