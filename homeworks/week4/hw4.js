const request = require('request');
// api 網址
const API_ENDPOINT = 'https://api.twitch.tv/kraken';
const clientID = '2l9sai4382a94piorthfgjbum3osq6';
// api 設置
const options = {
  url: `${API_ENDPOINT}/games/top`,
  headers: {
    Accept: 'application/vnd.twitchtv.v5+json',
    'Client-ID': clientID,
  },
};

// log 回傳的資料
function log(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    console.log(`${arr[i].viewers} ${arr[i].name}`);
  }
}

function callback(err, response, body) {
  // 判斷如果 err 就返回錯誤訊息
  if (err) {
    return console.log('抓取失敗', err);
  }

  // 確保 res 是合法的 JSON 字串，如果不是，返回錯誤訊息 SyntaxError: Unexpected end of JSON input
  let data = '';
  try {
    data = JSON.parse(body);
  } catch (error) {
    return console.log(error);
  }

  // 得到 top 10
  const { top } = data;
  const result = [];
  for (let i = 0; i < top.length; i += 1) {
    const obj = {};
    obj.viewers = top[i].viewers;
    obj.name = top[i].game.name;
    result.push(obj);
  }
  return log(result);
}

request(options, callback);
