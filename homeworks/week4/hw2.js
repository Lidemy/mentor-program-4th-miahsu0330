const request = require('request');
// api 網址

const API_ENDPOINT = 'https://lidemy-book-store.herokuapp.com';
const arge = process.argv;
const method = arge[2];
const parameter1 = arge[3];
const parameter2 = arge[4];

function getList() {
  request(
    // api 設置
    `${API_ENDPOINT}/books?_limit=20`,
    // 判斷如果 err 就返回錯誤訊息
    (err, response, body) => {
      if (response.statusCode > 299 || response.statusCode < 200) {
        return console.log(`錯誤代碼：${response.statusCode}錯誤訊息：${err}`);
      }

      // 確保 res 是合法的 JSON 字串，如果不是，返回錯誤訊息 SyntaxError: Unexpected end of JSON input
      let data = [];
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
    },
  );
}

function getBook() {
  request(
    `${API_ENDPOINT}/books/${parameter1}`,
    (err, response, body) => {
      if (response.statusCode > 299 || response.statusCode < 200) {
        return console.log(`錯誤代碼：${response.statusCode}，錯誤訊息：${err}`);
      }

      let data = [];
      try {
        data = JSON.parse(body);
      } catch (error) {
        return console.log(error);
      }

      // 將 res 印出
      return console.log(`id 為 ${parameter1}，書名為 ${data.name}`);
    },
  );
}

function deleteBook() {
  request({
    url: `${API_ENDPOINT}/books/${parameter1}`,
    method: 'DELETE',
  },
  (err, response) => {
    if (response.statusCode > 299 || response.statusCode < 200) {
      return console.log(`錯誤代碼：${response.statusCode}，錯誤訊息：${err}`);
    }

    return console.log(`成功刪除 id 為 ${parameter1} 的書`);
  });
}

function createBook() {
  request({
    // api 設置
    url: `${API_ENDPOINT}/books`,
    method: 'POST',
    form: { name: parameter1 },
  },
  (err, response, body) => {
    if (response.statusCode > 299 || response.statusCode < 200) {
      return console.log(`錯誤代碼：${response.statusCode}，錯誤訊息：${err}`);
    }

    let data = [];
    try {
      data = JSON.parse(body);
    } catch (error) {
      return console.log(error);
    }

    return console.log(`成功新增一本名為 ${parameter1} 的書，id 為 ${data.id}`);
  });
}

function updateBook() {
  request({
    url: `${API_ENDPOINT}/books/${parameter1}`,
    method: 'PATCH',
    form: { name: parameter2 },
  },
  (err, response, body) => {
    if (response.statusCode > 299 || response.statusCode < 200) {
      return console.log(`錯誤代碼：${response.statusCode}，錯誤訊息：${err}`);
    }

    let data = [];
    try {
      data = JSON.parse(body);
    } catch (error) {
      return console.log(error);
    }

    return console.log(`更新 id  為 ${parameter1} 的書名為 ${data.name}`);
  });
}

switch (method) {
  case 'list':
    getList();
    break;
  case 'read':
    getBook();
    break;
  case 'delete':
    deleteBook();
    break;
  case 'create':
    createBook();
    break;
  case 'update':
    updateBook();
    break;
  default:
    console.log(`抱歉，我們沒有提供 ${method} 此方法`);
}
