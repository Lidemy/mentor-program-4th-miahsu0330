## 請簡單解釋什麼是 Single Page Application

#### Single Page Application

網站只用一個頁面完成所有的功能，在 Single Page Application 還沒出現時，都是由 Server 端這邊生成 view，必須使用框架提供的 template 生成出 html，所以後端的程式會跟 html 混在一起，而前端工程師就是要負責這些檔案，在 Ajax 技術越來越成熟後，我們可以以非同步的方式去傳送 request，並取回必須的資料，並在  client 端用 JavaScript 處理來自伺服器的回應，所以我們不需要在 Server 端處理 View 的部分，只要用 javaScript 發一個 request 拿到資料，我就可以用 javaScript 在 html 中渲染。

Single Page Application 就是以 Ajax 作為根本的一個技術，我們可以在同一個畫面做完所有的功能！為什麼要這麼做？

「增進使用者體驗」最經典的例子是 Gmail，在用 gmail 時會發現網址從來沒有變過，因為所有的動作：發信、收信、寫信...等，都是在同一個頁面上發生，每個操作都非常流暢，所以在使用時有點不太像網頁，反而比較像 APP

#### 基本 SPA 架構

前端只有一個 html 檔案，透過解析路由知道使用者想要進行什麼操作，並呼叫對應的的 controller 再呼叫 modal 發送 API，傳到 Server，後端解析 request 後，並呼叫對應的的 controller，到資料庫拿資料，包成 response 回傳，前端解析 response 後拿到資料並且把資料丟給 view 渲染出畫面。

---

## SPA 的優缺點為何

#### 優點
1. 增進使用者體驗：
   前面有以 Gmail 作為舉例，此外像是 youtube 當你在觀看影片的途中想再找其他影片觀看時，會變成小小的視窗在下方繼續播放，有沒有發現根本就是音樂播放器的概念，所以 youtube 近年也推出了 youtube music 來佔據音樂播放網站的市場。
2. 前後端分離：
   後端就好好制定 API 文件、跟資料庫拿資料，再也不用去管 view 那邊的問題；前端只要找一個放 html 的檔案就好，不用在 Server 端使用框架提供的 template 生成出 html，Sever 的負載量會減少、假設某天 Server 掛了，API 也跟著掛了，使用者依然可以造訪網站，前端可以針對 Server 出錯時，顯示一個錯誤的圖案告知使用者。

#### 缺點
1. 前端變得超級複雜：
   不是像 APP 而已，就是在網頁的方式實作 APP，所以當然複雜，現在的技術真的已經可以將 html 包成一個能夠在不同裝置上可以安裝的應用程式。
2. 載入很多不必要的東西：
   像是 JavaScript 或是其他頁面的 template 會被一起下載下來。
3. 對 SEO 不太友善： 
   由於資料都是由 JavaScript 動態產生，所以檢視原始碼會發現 body 裡面空空如也，雖然 Google 搜尋引擎已經厲害到會爬 JavaScript 執行完後的結果，但還是不太好。

## 這週這種後端負責提供只輸出資料的 API，前端一律都用 Ajax 串接的寫法，跟之前透過 PHP 直接輸出內容的留言板有什麼不同？

* 只輸出資料的 API：動態產生資料，所以檢視原始碼會發現 body 裡面空空如也。
* PHP 直接輸出內容：Server 端回傳完整的 html 檔，所以檢視原始碼是有資料的。

---

### 參考資料

* [前後端分離與 SPA](https://blog.techbridge.cc/2017/09/16/frontend-backend-mvc/)
* [單一頁面應用程式](https://medium.com/@mybaseball52/%E5%96%AE%E4%B8%80%E9%A0%81%E9%9D%A2%E6%87%89%E7%94%A8%E7%A8%8B%E5%BC%8F-c98c8a17081)
