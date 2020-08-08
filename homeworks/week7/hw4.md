## 什麼是 DOM？

全名文 Document Object Model，中文為文件物件模型，是瀏覽器提供使用 JavaScript 時操作 document 上元素的橋樑，讓元素變成類似物件的概念去呈現，如下圖：

 ![img](https://miro.medium.com/max/440/0*2A4IwPK7aH947zzu.png)

配合選取到 DOM 上元素的 API 有以下方法
* `.getElementById`：以 id 屬性返回指定的元素。
* `.getElementsByTagName`： 以 HTML 標籤返回指定的對象之集合。
* `.getElementsByClassName`：以 class 屬性返回指定的對象之集合。
* `.querySelector`：使用關係選擇器(css 使用的選擇器)返回指定的元素。
* `.querySelectorAll`：使用關係選擇器(css 使用的選擇器)返回指定對象之集合。
* `.children`：返回全部子元素之集合。
* `.firstChild`：返回第一個元素。
* `.lastChild`：返回最後一個元素。
* `.parentNode`：返回父元素。

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？
以下簡單圖示說明事件傳遞
 ![img](https://miro.medium.com/max/1400/1*_rUdchHcIyvMIHIFfjNVJQ.gif)

當我們對每個元素綁定 click 事件，會發現點擊內層元素時，同時也會點擊到外層元素，事件觸發可以分成三個階段，依序順序是 `捕捉 > 目標 > 冒泡` 我們可以利用事件資訊裡面的 `eventPhase`，知道事件是在哪一個階段觸發。

* 數字 1 ：捕捉 CAPTURING_PHASE
* 數字 2 ：目標 AT_TARGET
* 數字 3 ：冒泡 BUBBLING_PHASE

 ![img](https://miro.medium.com/max/142/0*Cmkip_371vjgUTa-)

 我們將內元素新增 `ecentPhase` 就可以知道我們可以知道當點擊 .btn時觸發順序時從目標階段（.btn）到 冒泡階段（.inner、.outer），這樣的情形代表事件是在「冒泡階段」被觸發

**事件傳遞機制的順序為先「捕獲」在「冒泡」。**

 在使用 addEventListener 時沒有特別設定的情況下，默認是在「冒泡階段」被觸發，如果想改成在「捕獲階段」階段觸發，可以將第三個參數 `useCapture` 設成 true 就會改成在「捕獲階段」階段觸發。


## 什麼是 event delegation，為什麼我們需要它？
`event delegation` 中文為事件代理，利用事件傳遞機制的冒泡特性，只要點擊內元素就會觸發到外層元素，因此我們可以直接針對父元素來進行事件監聽，這樣不僅可以減少事件的綁定大大增加效率，也可以解決動態新增按鈕時無法綁定的問題。

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

* `event.preventDefault()`：阻止事件的默認動作，例如：
    * `form` 標籤的 sumbit 事件，阻止送出表單
    * `a` 標籤 click 事件，阻止跳轉網址
* `event.stopPropagation()`：阻止事件冒泡，事件到捕獲階段即止，就是點擊子元素時不會點擊到外層元素。