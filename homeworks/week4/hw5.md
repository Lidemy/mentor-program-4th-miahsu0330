## 請以自己的話解釋 API 是什麼

API 全名為 Application Programmin Interface，中文為應用程式介面。用生活化的例子來比喻的話 API 就像是餐廳的服務生，這邊先撇除任何的客製化餐點的可能性，當顧客（Client 端）告訴服務生（API）需要什麼餐點之後（Data），服務生（API）會傳遞到廚房（Server），開始製作餐點（到 Data Center 撈取資料）再由服務生（API）送到顧客（Client 端）手中。

以上面的例子我們可以知道在交換資訊的過程中中一定會包含兩方：
1. 提供 API 方：Server 端
2. 發出請求方：Client 端

而 API 就是兩方用來交換資訊的管道，交換資訊不止運用在網路上而已，我們也常常在無形之中使用到 API 比如說：
* 在電腦裡對檔案進行操作（讀取、傳輸、寫入、刪除等等）
    * Client 端：自己
    * Server 端：作業系統（電腦）
    * 透過的工具： Terminal 或 圖形化介面
* USB 的傳輸（讀取、傳輸、寫入、刪除等等）
    * Client 端：USB 裝置
    * Server 端：作業系統（電腦）
    * 透過的工具：圖形化介面

對於透過網路來進行資料交換的 API 我們稱之為 WEB API，因為需要透過網路是基於 HTTP 協定下運作的 API 所以又可以稱之為 HTTP API

實際會運用 WEB API 來進行哪些操作呢？

* 一般 登入/ 註冊 或 第三方登入/ 註冊 等會員功能。
* 資料嵌入：Google 地圖、氣象。
* 社群嵌入：FB 分享留言按讚等功能。
* 留言板嵌入。
* 拿取資料：Spotify 上點播排行、Twitch 熱門實況主等。



## 請找出三個課程沒教的 HTTP status code 並簡單介紹
HTTP status code 以開頭區分



| 開頭號碼 | 說明            |
|  ----   | ----           |
|   1xx   | 稍等（比較少見） |
|   2xx   | 成功）          |
|   3xx   | 重新導向        |
|   4xx   | client 端錯誤   |
|   5xx   | Server 端錯誤   |

* 304：請求未改變，可以取用緩存內容。
* 403：沒有權限，有收到 request 但 server 端拒絕提供。
* 429：請求過多。


## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。


### Root URL
`https://api.foodfanta.com/`

### Responses

Responses 的格式皆為 JSON

```js
[
  {
    "id": 1,
    "name": "大俠愛吃漢堡包",
    "tel": "02-23495392",
  },
  {
    "id": 2,
    "name": "肯德G",
    "tel": "02-23495392",
  },
  {
    "id": 3,
    "name": "犇羴鱻",
    "tel": "02-23495192",
  },
  {
    "id": 4,
    "name": "真的好海鮮餐廳",
    "tel": "02-23495191",
  },
  {
    "id": 5,
    "name": "沒有名字食堂",
    "tel": "02-23295191",
  },
]
```

#### 獲取所有餐廳資料

|Method|Path|
|--------|--------|
|GET|/restaurants|

* 可使用的參數

|Name|Type|Description|Example|
|--------|--------|--------|--------|
|_limit|number|限制回傳資料數量|/restaurants?_limit=5

---

#### 獲取單一餐廳資料

|Method|Path|
|--------|--------|
|GET|/restaurants/:id|

* 可使用的參數
    無

---

#### 刪除餐廳資料

|Method|Path|
|--------|--------|
|DELETE|/restaurants/:id|

* 可使用的參數
    無

---

#### 刪除餐廳資料

|Method|Path|
|--------|--------|
|POST|/restaurants|

* 可使用的參數

|Name|Type|Description|
|--------|--------|--------|
|name|string|餐廳名|

---

#### 更改餐廳資料

|Method|Path|
|--------|--------|
|PATCH|/restaurants/:id|

* 可使用的參數

|Name|Type|Description|
|--------|--------|--------|
|name|string|餐廳名（必要參數）|


