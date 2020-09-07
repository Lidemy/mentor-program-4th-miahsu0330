## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼

* VARCHAR：查詢速度比較快，可有默認值。
* TEXT：會附加兩個位元組用來紀錄長度，不能有默認值。

## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？

Cookie 是一個小型的文字檔， client 端可以用 JavaScript 把資料寫到 cookie 中，特性是當送出 request 時會自動把 cookie 帶到 server 端，而 server 端也可以把資料寫到 response 的 header 中 set-cookie ，傳到 client 端，當這兩者同時執行時就開啟了一段 Session，讓後續的 Request 之間有了狀態，Cookie 原本就是為了建立 Session 而誕生的。

當有了 Session 我們就可以紀錄一些資訊，執行一些功能像是：廣告追蹤、身份驗證（通行證）、購物車 等。



## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？

1. 可能會有人在一開始偽造 cookie 內容（例如：sessionID），讓使用者用帶著這個身份進行操作（例如：登入）， Server 端就會將此內容與使用者的帳號綁在一起，接著再用同樣的 cookie 內容，就可以用使用者的身份登入並且使用網站。
2. 可能不同的 domain 中紀錄著相同的 cookie 內容，導致相互影響。
3. 留言內容沒有做防範，若插入 html 、js 程式碼就會有問題。

