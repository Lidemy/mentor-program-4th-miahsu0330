## Webpack 是做什麼用的？可以不用它嗎？

##### Webpack 是做什麼用的

是一個「module bundler」提供了前端開發缺乏的模組化開發方式。
模組化（module）的意思是將大功能拆分成小功能，這樣的好處是程式間比較不會相互影響（變數、函式等），更能方便管理及 debug。

#####  為什麼要使用 Webpack

1. 瀏覽器在 ES6 版本時，才提供了模組化的語法，因此舊型瀏覽性無法使用模組化的語法，而此語法尚未到成熟階段並存在許多其它的問題，因此在這個過渡期我們還是需要一個工具，讓模組化的語法讓兼容性更高。
2. 在開發上除了自己寫的程式外，也經常使用到別人寫好的 library ，因此如果引用多個 library，每個 library 都會有自己的全域變數，就可能產生「命名衝突」。

而 Webpack 就是為了解決上述的問題的工具，經由 Webpack 轉換編譯生成最佳化過的程式碼，不用擔心無法使用模組化的語法、變數命名的衝突。

假設今天要開發的網站規模不大、不需要模組化開發方式或也不太需要使用 library，在這個情況下使用 webpack 反而有點多此一舉，我們應該根據專案的類型、規模大小來決定使用什麼工具。

## gulp 跟 webpack 有什麼不一樣？

##### gulp 是前端「任務管理」工具

最核心的功能在於自動化網頁開發中涉及的耗時且重複的任務，例如：單元測試、縮小、清除緩存等。

##### webpack 是前端「打包」工具

最核心的功能在於以模組化的概念將各種資源進行打包變成能在瀏覽器上使用的程式碼。

會常被放在一起講的原因在於，我們經常使用到的重複性任務，像是資源(JS、CSS、Image)壓縮像是
    1. JS 做 ES6 轉換 ES5、uglify
    2. CSS 進行 SASS 編譯、minify
    2. 壓縮圖片

兩者都皆可做到上述功能，但這些功能對於 webpack 來說是我幫你「打包」這些資源之前可以先幫你做這些預處理功能。
而對於 gulp 上述每一個功能都是一項任務，你兩者在使用上的定位是完全不一樣的，也因如此 gulp 用在更多元的地方，例如：校正時間、定時 call api等等。


## CSS Selector 權重的計算方式為何？

##### 權重值表示方式：

![](https://i2.wp.com/css-tricks.com/wp-content/csstricks-uploads/specificity-calculationbase.png?resize=570%2C346)

對應到到分別為
(`inline-style` , `id` , `class | attribute | psuedo-class` , `Element | pseudo-elements`)

##### 各選擇器範例

* inline-style(內聯樣式) :  `<li style="color: red;">`
* id(以 # 開頭的 id 選擇器) :  `#text { color: red; }`
* class(以 . 開頭的 class 選擇器) :  `.text { color: red; }`
* attribute(屬性選擇器) :  `[name="nickname"] { color: red; }`
* psuedo-class(偽類選擇器) : `:hover { color: red; }`
* Element(元素名稱選擇器)  :  `p { color: red; }`
* pseudo-elements(偽元素選擇器) :  `::before { color: red; }`

##### 附加 CSS 屬性值: ！important
會蓋過所有權重，只有 !important 能超越 !important，所以不應該濫用。