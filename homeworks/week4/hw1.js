const request = require('request');
// api 網址
const API_ENDPOINT = 'https://lidemy-book-store.herokuapp.com';
// api 設置
const options = {
  url: `${API_ENDPOINT}/books?_limit=10`,
};

// 得到 res 後處理動作
function callback(err, response, body) {
  // 判斷如果 err 就返回錯誤訊息
  if (response.statusCode < 200 || response.statusCode > 299) {
    return console.log(`錯誤代碼：${response.statusCode}， 錯誤訊息：${err}`);
  }

  // 確保 res 是合法的 JSON 字串，如果不是，返回錯誤訊息 SyntaxError: Unexpected end of JSON input
  let data = '';
  try {
    data = JSON.parse(body);
  } catch (error) {
    return console.log(error);
  }

  // 將 res 轉成陣列後回傳
  const bookList = [];
  for (let i = 0; i < data.length; i += 1) {
    bookList.push(`${i + 1} ${data[i].name}`);
  }
  return console.log(bookList.join('\n'));
}

request(options, callback);
