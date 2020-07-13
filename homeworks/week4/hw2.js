const request = require('request');
// api 網址
const API_ENDPOINT = 'https://lidemy-book-store.herokuapp.com';
const arge = process.argv;
const method = arge[2];
const parameter1 = arge[3];
const parameter2 = arge[4];

function listBooks() {
  request(
    // api 設置
    `${API_ENDPOINT}/books?_limit=20`,
    (err, _response, body) => {
      // 判斷如果 err 就返回錯誤訊息
      if (err) {
        return console.log('抓取失敗', err);
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
        bookList.push(`${data[i].id} ${data[i].name}`);
      }
      return console.log(bookList.join('\n'));
    },
  );
}

function readBook(id) {
  request(
    `${API_ENDPOINT}/books/${id}`,
    (err, _response, body) => {
      if (err) {
        return console.log('抓取失敗', err);
      }

      let data = [];
      try {
        data = JSON.parse(body);
      } catch (error) {
        return console.log(error);
      }

      // 將 res 印出
      return console.log(`id 為 ${id}，書名為 ${data.name}`);
    },
  );
}

function deleteBook(id) {
  request({
    url: `${API_ENDPOINT}/books/${id}`,
    method: 'DELETE',
  },
  (err) => {
    if (err) {
      return console.log('抓取失敗', err);
    }

    return console.log(`成功刪除 id 為 ${id} 的書`);
  });
}

function createBook(name) {
  request({
    // api 設置
    url: `${API_ENDPOINT}/books`,
    method: 'POST',
    form: { name },
  },
  (err, _response, body) => {
    if (err) {
      return console.log('抓取失敗', err);
    }

    let data = [];
    try {
      data = JSON.parse(body);
    } catch (error) {
      return console.log(error);
    }

    return console.log(`成功新增一本名為 ${name} 的書，id 為 ${data.id}`);
  });
}

function updateBook(id, name) {
  request({
    url: `${API_ENDPOINT}/books/${id}`,
    method: 'PATCH',
    form: { name },
  },
  (err) => {
    if (err) {
      return console.log('抓取失敗', err);
    }
    return console.log(`更新 id  為 ${id} 的書名為 ${name}`);
  });
}

switch (method) {
  case 'list':
    listBooks();
    break;
  case 'read':
    readBook(parameter1);
    break;
  case 'delete':
    deleteBook(parameter1);
    break;
  case 'create':
    createBook(parameter1);
    break;
  case 'update':
    updateBook(parameter1, parameter2);
    break;
  default:
    console.log('Available commands: list, read, delete, create and update');
}
