const apiURL = 'https://api.twitch.tv/kraken';
const clientId = '2l9sai4382a94piorthfgjbum3osq6';
const accept = 'application/vnd.twitchtv.v5+json';
const request = new XMLHttpRequest();
const template = `
<div class="card__inner">
  <a class="card__headerBg" target="_blank" href="$url">
    <div class="card__header gameImg" style="background-image: url($preview)">
    <span class="card__viewers">$viewers viewers</span></div>
  </a>
  <div class="card__body">
      <div class="card__authorImg" style="background-image: url($logo)"></div>
      <div class="card__desc">
        <div class="card__title gameChannel">$status}</div>
        <div class="card__author gameAuthor">$name}</div>
      </div>
  </div>
</div>
`;
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// render 直播頻道
function createCard(data) {
  const card = document.querySelector('.card');
  const cardGroup = document.createElement('div');
  cardGroup.classList.add('card__group');
  cardGroup.innerHTML = template
    .replace('$url', data.channel.url)
    .replace('$preview', data.preview.medium)
    .replace('$viewers', data.viewers)
    .replace('$logo', data.channel.logo)
    .replace('$status', escapeHtml(data.channel.status))
    .replace('$name', escapeHtml(data.channel.name));
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
  request.open('GET', `${apiURL}/streams/?game=${encodeURIComponent(game)}&limit=${limit}`);
  request.setRequestHeader('Accept', accept);
  request.setRequestHeader('Client-ID', clientId);
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      let data = '';
      try {
        data = JSON.parse(request.responseText);
      } catch (err) {
        console.log(err);
      }
      getChannel(data);
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
      let data = '';
      try {
        data = JSON.parse(request.responseText);
      } catch (err) {
        console.log(err);
      }
      getTopGame(data);
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
