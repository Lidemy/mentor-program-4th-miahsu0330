const request = require('request');
// api 網址
const API_ENDPOINT = 'https://restcountries.eu/rest/v2';
// 得到參數
const arge = process.argv;
const name = arge[2];
// api 設置
const options = {
  url: `${API_ENDPOINT}/name/${name}`,
  method: 'GET',
};

// log 回傳的資料
function log(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    console.log('============');
    console.log(`國家：${arr[i].name}`);
    console.log(`首都：${arr[i].capital}`);
    console.log(`貨幣：${arr[i].code}`);
    console.log(`國碼：${arr[i].callingCodes}`);
  }
}

function callback(err, response, body) {
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

  // 取得資料
  const result = [];
  for (let i = 0; i < data.length; i += 1) {
    const obj = {};
    obj.name = data[i].name;
    obj.capital = data[i].capital;
    obj.code = data[i].currencies[0].code;
    obj.callingCodes = data[i].callingCodes;
    result.push(obj);
  }
  return log(result);
}


request(options, callback);
