# 第一週自我檢測（06/12 ~ 06/21）：暖身週

### 你說得出程式如何執行

寫程式就是與電腦溝通，程式會透過內建的編譯翻譯成電腦看得懂的語言，由上到下一行一行執行。

### 你理解寫程式的本質只是一行行的指令

給它什麼指令就只照指令做，因此每次只能做一件事情，如果突然下一個他不知道的指令，就會停止動作，因此指令必須清楚明瞭。


### 你了解前端與後端的區別

#### 前端

##### 網頁上看得到的東西都是前端

* 處理資料的呈現
* 使用者介面互動
* 網站效能調校  
* 確保網站最大化還原設計稿，各種載具體驗一致

#### 後端

##### 網頁上看不到的

* 資料庫的串接設計
* 處理伺服器效能
* 網站效能調校 
* 應用程式介面（AIP）開發


### 你能說出從發出一個 request 到接收 response 中間發生的事

1. 當瀏覽器接收到 request 後會開始解析請求
2. DNS 將 url 解析成 IP 位置
3. 瀏覽器(Client)將 IP 包成一個 Request 發送出去
4. Request 透過 Internet 的層層協定 發送到 Server 端
5. Server 端解析 Reuest 並到資料庫撈去資料
6. 將資料及一些設定 包成一個 Response 回傳
7. Response  透過 Internet 的層層協定 發送到 Client 端
8. 印出 Respose 資料


### 你了解不同載具的差異在哪（Desktop、Mobile、Web）

1. 寬度與解析度不同，因此內容也須配合載具進行增減
2. Mobile 皆為使用無線網路連接，比起有線網路，下載的速度較慢，必須減少 request 避免網頁 loding 過久的問題。
3. Desktop 能使用各種不同的瀏覽所以有時候必須針對不同的瀏覽器做出不同的行為，雖然相較之下 Mobile 僅能使用 chrome 或 safiri 但其實還需包含 app 裡內建的瀏覽器（In-App browser）更為複雜。


* Desktop：chrome、evernote 等軟體。
* Web： GitHub、FB 等需要靠網頁操作的軟體。
* Mobile：手機上使用的軟體。



### 你了解基本的 command line 指令

[command Line 基本指令與操作](https://medium.com/@miahsuwork/%E7%AC%AC%E4%B8%80%E9%80%B1-command-line-%E5%9F%BA%E6%9C%AC%E6%8C%87%E4%BB%A4%E8%88%87%E6%93%8D%E4%BD%9C-f4da8bcfdfa)


### 你知道 Git 在做什麼，以及為何我們需要 Git

Git 是幫助開發者進行軟體的版本控管，讓開發者有時光機，能夠查看、回朔開發過程，更能夠避免多人協作所造成的衝突。


### 你知道 add、commit、push、pull 等基本 Git 指令

[版本控制與 Git 基本指令](https://medium.com/@miahsuwork/%E7%AC%AC%E4%B8%80%E9%80%B1-%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6%E8%88%87-git-%E5%9F%BA%E6%9C%AC%E6%8C%87%E4%BB%A4-fa3c4ba286a2)


### 你知道怎麼使用 branch 並送出 Pull Request

[Git 進階使用 Branch、Merge](https://medium.com/@miahsuwork/%E7%AC%AC%E4%BA%8C%E9%80%B1-git-%E9%80%B2%E9%9A%8E%E4%BD%BF%E7%94%A8-branch-merge-a571cc0a95de)

### 你熟悉 Git Workflow（其實就是交作業的流程）

[Git 本地端連結遠端操作（GitHub）](https://medium.com/@miahsuwork/%E7%AC%AC%E4%BA%8C%E9%80%B1-git-%E6%9C%AC%E5%9C%B0%E7%AB%AF%E8%88%87%E9%81%A0%E7%AB%AF%E6%93%8D%E4%BD%9C-github-78eec4537179)


# 第二週自我檢測（06/22 ~ 06/28）：程式基礎（上）

### 你能靈活運用變數、迴圈、判斷式等等基本概念來解題

已完成 LIOJ 上的題目

### 你能一行行的說出現在程式在做什麼

```js
let arr = [2, 6, 3];
let max = arr[0];
for(let i = 0; i < arr.length; i++) {
  if(arr[i] > max) {
      max = arr[i];
   }
}
console.log(max);
```

1. 假設 arr 為 [2, 6, 3]
2. 令 max 為 arr[0]，也就是 2
3. 設定 i = 1；判斷 0 < 3；是，進入第一迴圈
4. 判斷 arr[1] > 2，是。
5. max 等於 arr[1]，現在 max 為 6
5. 回到第 3 行，i + 1，變成 2，判斷 2 < 3; 是，進入第二迴圈
6. 判斷 arr[2] > 6，不是，繼續往下。
7. 回到第 3 行，i + 1，變成 3，判斷 3 < 3; 不是，結束迴圈
8. 輸出 max

### 你知道「回傳」跟「輸出」的差異

回傳是用 return 
輸出是使用 console log 將值印出

在實務上都是使用 return 因為就是需要得到值，把得到的東西做其他的用途，輸出只是單純印出資料而已。

### 你可以把用文字寫好的演算法轉成程式碼

本來想寫合併排序法...但目前還寫不出來QQ



# 第三週自我檢測（06/29 ~ 07/05）：程式基礎（下）

### 你理解常用內建函式如何使用

[JavaScript — 函式 function](https://medium.com/@miahsuwork/%E7%AC%AC%E5%9B%9B%E9%80%B1-javascript-%E5%87%BD%E5%BC%8F-function-5c6114de5fff)

### 你熟悉程式語法並知道如何解決基礎問題

已完成 LIOJ 上的題目

### 你知道為什麼我們需要 unit test

人工測試費時並且會因為人的關係造成測試程度不一，我們可以藉由 unit test 進行大量的測試，為代碼進行初步除錯，確保程式品質

### 你知道什麼是 unit test
以單一個行為進行測試，通常專案中最小的單位就是 function，因此就是驗證 function 運行是否符合結果

### 你知道如何寫 unit test 來測試一個 function

[JavaScript — 測試框架 Jest](https://medium.com/me/stats/post/eccf0ff2cea2)



# 第四週自我檢測（07/06 ~ 07/12）：網路基礎
### 你知道網路背後大概的運作模式

網路的運作就是不斷的交換資訊，但當中有許多要考量的地方，像是安全性、傳輸方式等等而變成了複雜的運作模式

### 你知道什麼是 DNS 以及運作原理

DNS 會將 Doman 轉為實際 IP 位置

### 你知道 HTTP 與 HTTPS 的差異

兩者的差異是兩種不同的協定
HTTPS 是基於 HTTP 協定下衍生出利用 SSL/TLS 來加密封包進行網路傳遞是另一種更安全的協定。

### 你知道 localhost 跟 127.0.0.1 是什麼

是一樣的東西「本機」。

### 你知道 GET 與 POST 的差別

如果以表單來說的話，GET 會以 query string 的方式傳送資料，而 POST 則 request 的封包中傳送資料。

### 你知道常用的 HTTP Header

* User-Agent：識別發出 client 端代理請求的軟體類型或版本號
* Content-Type：指定攜帶的 HTTP Data 的格式
* Origin：指示 request 的來源
* Authorization：授權，根據使用者的角色來授予應有的權限

### 你知道什麼是 API

是用來交換資訊的管道，不受限於網路，在自己的電腦上進行讀檔、傳輸、寫入等都需要用到 API （你在跟電腦作業系統要東西），對於網頁來說就是 Web API 是透過 HTTP 協定下傳輸資料。

### 你知道什麼是 Request 跟 Response，並使用 node.js 寫出串接 API 的程式

[網路基礎-HTTP、Request、Response](https://medium.com/@miahsuwork/%E7%AC%AC%E5%85%AD%E9%80%B1-%E7%B6%B2%E8%B7%AF%E5%9F%BA%E7%A4%8E-http-request-response-7d7e0cb88ed8)

### 你知道 HTTP method 有哪些

* GET：單純的拿東西，一般的 Request 都是採取此 method 也可以拿來傳資料，但資料會以 Query String 的方式傳遞。
* POST：傳資料到 server 端，資料放在 message-body 進行傳送。
* PATCH：修改部分資料
* PUT：修改全部資料
* DELETE：刪除資料

### 你知道基本的 HTTP statud code，像是 200、301、400、404、500

* 200: 接收成功。
* 301：轉址，永久改變了位置，比如說公司換了新的 IP 但 doman 還是一樣，為了讓使用者進入網站時是看到新的頁面，就要將舊的 IP 轉址到新的 IP。
* 400：clent 端問題，Server 看不懂你要表達的意思。
* 404：clent 端問題，你跟我拿我沒有的東西。
* 500：server 端有問題，Server 發生未知或無法處理的問題。
