const apiURL = 'https://api.twitch.tv/kraken';
const clientId = '2l9sai4382a94piorthfgjbum3osq6';
const accept = 'application/vnd.twitchtv.v5+json';
const request = new XMLHttpRequest();

// render 直播頻道
function createCard(data) {
  const card = document.querySelector('.card');
  const cardGroup = document.createElement('div');
  cardGroup.classList.add('card__group');
  cardGroup.innerHTML = `
    <div class="card__inner">
      <a class="card__headerBg" target="_blank" href="${data.channel.url}">
        <div class="card__header gameImg" style="background-image: url(${data.preview.medium})">
        <span class="card__viewers">${data.viewers} viewers</span></div>
      </a>
      <div class="card__body">
          <div class="card__authorImg" style="background-image: url(${data.channel.logo})"></div>
          <div class="card__desc">
            <div class="card__title gameChannel">${data.channel.status}</div>
            <div class="card__author gameAuthor">${data.channel.name}</div>
          </div>
      </div>
    </div>
  `;
  card.appendChild(cardGroup);
}

// 清除所有卡片
function reomveAllChild(parentNode) {
  const el = parentNode;
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}

// 得到直播頻道
function getChannel(value) {
  const channels = value.streams;
  reomveAllChild(document.querySelector('.card'));
  for (let i = 0; i < channels.length; i += 1) {
    createCard(channels[i]);
  }
}


// 切換頁面遊戲名稱
function gameName(activeEl) {
  activeEl.forEach((element) => {
    if (element.classList.contains('active')) {
      document.querySelector('.gameName').innerText = element.innerText;
    }
  });
}


// 發出直播頻道 request
function reqLiveChannel(game) {
  const limit = 20;
  request.open('GET', `${apiURL}/streams/?game=${game}&limit=${limit}`);
  request.setRequestHeader('Accept', accept);
  request.setRequestHeader('Client-ID', clientId);
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      getChannel(JSON.parse(request.responseText));
      gameName(document.querySelectorAll('.gameList__item'));
    } else {
      console.log('error');
    }
  };
  request.onerror = function () {
    console.log('error');
  };
  request.send();
}


// render top game 清單
function gameList(name) {
  const list = document.querySelector('.gameList');
  const item = document.createElement('li');
  item.classList.add('gameList__item');
  item.innerText = name;
  list.appendChild(item);

  const firstEl = document.querySelector('.gameList__item');
  firstEl.classList.add('active');
  reqLiveChannel(firstEl.innerText);
}

// 得到 top game 清單
function getTopGame(value) {
  const topGames = value.top;
  for (let i = 0; i < topGames.length; i += 1) {
    gameList(topGames[i].game.name);
  }
}

// 發出 top game request
function reqTopGame() {
  const limit = 5;
  request.open('GET', `${apiURL}/games/top?limit=${limit}`);
  request.setRequestHeader('Accept', accept);
  request.setRequestHeader('Client-ID', clientId);
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      getTopGame(JSON.parse(request.responseText));
      gameName(document.querySelectorAll('.gameList__item'));
    } else {
      console.log('error');
    }
  };
  request.onerror = function () {
    console.log('error');
  };
  request.send();
}


// 監聽 top game click
function clickEvent() {
  const list = document.querySelector('.gameList');
  list.addEventListener('click', (e) => {
    if (e.target.classList.contains('gameList__item')) {
      [...list.children].forEach((element) => {
        element.classList.remove('active');
        e.target.classList.add('active');
      });
    }
    const name = e.target.innerText;
    reqLiveChannel(name);
  });
}

window.onload = function () {
  reqTopGame();
  clickEvent();
};
