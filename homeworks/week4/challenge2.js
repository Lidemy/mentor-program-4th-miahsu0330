const https = require('https');
const querystring = require('querystring');

const API_ENDPOINT = 'lidemy-book-store.herokuapp.com';
const arge = process.argv;
const method = arge[2];
const parameter1 = arge[3];
const parameter2 = arge[4];

function getList() {
  const req = https.request({
    hostname: API_ENDPOINT,
    path: '/books?_limit=20',
    method: 'GET',
  },
  (res) => {
    res.on('data', (d) => {
      let data = [];

      try {
        // 將 Buffer 先轉成 str 再轉成 obj
        // 參考資料：https://stackoverflow.com/questions/41951307/convert-a-json-object-to-buffer-and-buffer-to-json-object-back
        data = JSON.parse(d.toString());
      } catch (error) {
        return console.log('資料格式錯誤');
      }

      const bookList = [];
      for (let i = 0; i < data.length; i += 1) {
        bookList.push(`${i + 1} ${data[i].name}`);
      }
      return console.log(bookList.join('\n'));
    });
  });
  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
}


function getBook() {
  const req = https.request({
    hostname: API_ENDPOINT,
    path: `/books/${parameter1}`,
    method: 'GET',
  },
  (res) => {
    res.on('data', (d) => {
      let data = [];

      try {
        data = JSON.parse(d.toString());
      } catch (error) {
        return console.log('資料格式錯誤');
      }

      return console.log(`id 為 ${parameter1}，書名為 ${data.name}`);
    });
  });
  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
}


function deleteBook() {
  const req = https.request({
    hostname: API_ENDPOINT,
    path: `/books/${parameter1}`,
    method: 'DELETE',
  },
  (res) => {
    res.on('data', () => console.log(`成功刪除 id 為 ${parameter1} 的書`));
  });
  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
}


function createBook() {
  const postData = querystring.stringify({
    name: parameter1,
  });
  const req = https.request({
    hostname: API_ENDPOINT,
    path: '/books',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData),
    },
  },
  (res) => {
    res.on('data', (d) => {
      let data = [];

      try {
        data = JSON.parse(d.toString());
      } catch (error) {
        return console.log('資料格式錯誤');
      }

      return console.log(`成功新增一本名為 ${parameter1} 的書，id 為 ${data.id}`);
    });
    res.on('end', () => {
      console.log('No more data in response.');
    });
  });
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
  // 將資料寫入 request body 中
  req.write(postData);
  req.end();
}


function updateBook() {
  const postData = querystring.stringify({
    name: parameter2,
  });
  const req = https.request({
    hostname: API_ENDPOINT,
    path: `/books/${parameter1}`,
    method: 'PATCH',
    headers: {
      // 提交數據的方式
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData),
    },
  },
  (res) => {
    res.on('data', (d) => {
      let data = [];

      try {
        data = JSON.parse(d.toString());
      } catch (error) {
        return console.log('資料格式錯誤');
      }

      return console.log(`更新 id  為 ${parameter1} 的書名為 ${data.name}`);
    });
    res.on('end', () => {
      console.log('No more data in response.');
    });
  });
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
  // 將資料寫入 request body 中
  req.write(postData);
  req.end();
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
