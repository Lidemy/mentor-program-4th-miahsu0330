const URL = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery';
const request = new XMLHttpRequest();
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

// 內容置換
function renderPrize(obj) {
  const { text, elClass } = obj;
  const textBlock = document.querySelector('.prize__text');
  const prizeSection = document.querySelector('.prizeDraw');
  const descBlock = document.querySelector('.prizeDraw__desc');
  const btnLottery = document.querySelector('.btn-prizeDraw');

  textBlock.innerText = text;
  textBlock.classList.add('show');
  prizeSection.classList.add(elClass);
  descBlock.classList.add('hide');
  btnLottery.innerText = '再抽一次';
}

// 錯誤訊息
function alertError() {
  alert('系統不穩定，請再試一次');
}

// 抽獎
function lottery(resText) {
  const prize = JSON.parse(resText).prize || null;
  switch (prize) {
    case 'FIRST':
      renderPrize(objPrize.first);
      break;
    case 'SECOND':
      renderPrize(objPrize.second);
      break;
    case 'THIRD':
      renderPrize(objPrize.third);
      break;
    case 'NONE':
      renderPrize(objPrize.none);
      break;
    default:
      alertError();
  }
}

// 發送 request
request.onload = function () {
  if (request.status >= 200 && request.status < 400) {
    lottery(request.responseText);
  } else {
    alertError();
  }
};
request.onerror = function () {
  alertError();
};

// 監聽 click 事件
window.onload = function () {
  document.querySelector('.btn-prizeDraw').addEventListener('click', () => {
    request.open('GET', URL);
    request.send();
  });
};
