const request = require('request');
// api 網址
const API_ENDPOINT = 'https://api.twitch.tv/kraken';
// 得到參數
const avgv = process.argv;
const gameName = avgv[2];

// 更新 Options 中的 url
function updateUrl(path, newCursor = '') {
  return `${API_ENDPOINT}${path}&cursor=${newCursor}`;
}

// api 設置
const clientID = '2l9sai4382a94piorthfgjbum3osq6';
const path = `/clips/top?limit=100&game=${gameName}`;
const options = {
  url: updateUrl(path, ''),
  headers: {
    Accept: 'application/vnd.twitchtv.v5+json',
    'Client-ID': clientID,
  },
};

// 計算要撈幾次資料
let count = 1;

function callback(err, response, body) {
  if (!gameName) {
    return console.log('錯誤！請輸入遊戲名稱');
  }
  // 終止遞迴的條件
  while (count > 2) {
    return console.log('結束');
  }

  // 判斷如果 err 就返回錯誤訊息
  if (response.statusCode < 200 || response.statusCode > 299) {
    return console.log(`錯誤代碼：${response.statusCode}，錯誤訊息：${err}`);
  }

  // 確保 res 是合法的 JSON 字串，如果不是，返回錯誤訊息 SyntaxError: Unexpected end of JSON input
  let data = '';
  try {
    data = JSON.parse(body);
  } catch (error) {
    return console.log(error);
  }

  // 撈取資料並打印出來
  const channel = data.clips;
  for (let i = 0; i < channel.length; i += 1) {
    console.log('============');
    console.log(`頻道名稱：${channel[i].curator.display_name}`);
    console.log(`id： ${channel[i].curator.name}`);
  }


  // 有查到畫下線的變數代表私有變數，警告開發者不要操作到，所以不確定我這樣的作法正不正確。
  // 資料:https://medium.com/@realdennis/%E9%96%89%E5%8C%85-%E4%BB%8A%E4%BE%86%E5%8F%A4%E5%BE%80%E7%9A%84-javascript-%E7%A7%81%E6%9C%89%E8%AE%8A%E6%95%B8-290b5cb9240a
  // eslint-disable-next-line no-underscore-dangle
  options.url = updateUrl(path, data._cursor);

  // 計數
  count += 1;
  return request(options, callback);
}

request(options, callback);


// 參考資料：
// https://blog.twitch.tv/zh-tw/2017/08/31/the-new-twitch-api-be3fb2b078e6/
// https://dev.twitch.tv/docs/v5#responses
