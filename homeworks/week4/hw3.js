const request = require('request');
// api 網址
const API_ENDPOINT = 'https://restcountries.eu/rest/v2';
// 得到參數
const arge = process.argv;
const name = arge[2];

request(`${API_ENDPOINT}/name/${name}`,
  (err, response, body) => {
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
    // 如果 404 就回傳找不到
    if (response.statusCode === 404) {
      return console.log('找不到國家資訊');
    }

    // 取得資料
    for (let i = 0; i < data.length; i += 1) {
      console.log('============');
      console.log(`國家：${data[i].name}`);
      console.log(`首都：${data[i].capital}`);
      console.log(`貨幣：${data[i].currencies[0].code}`);
      console.log(`國碼：${data[i].callingCodes[0]}`);
    }
    return true;
  });
