## 什麼是 Ajax？

在瀏覽器上使用 JavaScript 交換資料的一種方式，將 response 回傳的資料轉傳到 JavaScript 中，這樣開發者就可以將回傳的資料做另外的處理。
Ajax 全名為 Asynchronous JavaScript and XML，中文為「非同步的 JavaScript 與 XML」一般我們在寫 Javsscript 時幾乎都是「同步執行」，意思是當執行到某一行是必須等這行執行完畢才會執行下一行，確保執行順序，但牽扯到交換資料時，我們不能確保 server 端何時才會回傳資料，因此假設使用同步執行，就必須一定要等到 server 端回傳資料後，程式碼才會繼續往下執行，代表說這段期間，點擊任何扯到 JavaScript 上的東西都不會有反應。
因此「非同步執行」的 JavaScript 就是執行後，不會等結果回來就繼續往下執行，避免等待結果太耗時過長造成程式阻塞。所以只要牽涉到網路的操作一定是使用「非同步執行」，後面的 XML 指的是回傳的資料格式，不過現在大部分都是使用 JSON 作為資料格式。

## 用 Ajax 與我們用表單送出資料的差別在哪？

使用表單送出資料時一定會換頁，比較像是發一個 request 到某個網址，這個網址回傳什麼結果就會直接渲染出來。
而 Ajax 是將 response 回傳的資料轉傳到 JavaScript 中，透過這樣的方式達成不換頁得到資料。

## JSONP 是什麼？

利用 html 中某些標籤不受同源政策限制的特性（`<img>`、`<script>`），就有人利用 `<script>` 拿到資料，做法是將資料放入 function 的參數中，client 端利用 `<script src="...">` 並在載入此 js 之前去宣告這個 function 就可以拿到資料

```js
<script>
function setData(users) {
    console.log(users)
}
</script>
<script src="https://text.com/user.js">
// 以下是 user.js 的內容
setData([
    {
        name: 'Tim',
        old: 24,
    }, {
        name: 'Lucy',
        old: 28,
    },
])
```

## 要如何存取跨網域的 API？


使用瀏覽器進行交換資料時會受到同源政策（Same-origin policy）的限制，只要是不同 Domain 就沒有辦法取得 response，這是因為安全性的考量。

因此為了要解決不同源拿資料的問題，就有了另一個規範說明了「如果你想在不同的源之間傳輸資料的話，你應該怎麼做」，這個規範就叫做 CORS。

Server 端必須開啟允許跨來源請求，在 Response 的 Header 加上 Access-Control-Allow-Origin，這樣 Client 端才能收到資料。

反之來，Server 端也不會隨隨便便地去接受 Request，CORS 把 Request 分成兩種，簡單請求、預檢請求
* 簡單請求：沒有加任何自定義的 Header，又是 GET 的話就一定是簡單請求
* 在接受 Request 之前會先以 HTTP 的 OPTIONS 方法送出請求到另一個網域，確認後續實際（actual）請求是否可安全送出。


## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？

因為執行環境的不同，「瀏覽器」因為安全性的考量而有了「同源政策」、「CORS」等規範，不能任意的交換資料，而 node.js 是直接將 request 傳送到 server 端，因此不會有任何限制與干擾。

**為什麼 node.js 就不管安全性的問題？**
因為那是你自己的電腦，沒有人會幫你處理 response，而瀏覽器像是守門員的角色為安全性把關，確認雙方都願意交換的情況下，才會把 response 給你。


