## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

* 下拉選單 相關標籤： `select`、`option`、`optgroup`
``` html
<select name="fruit" id="fruit">
    <option value="apple">apple</option>
    <option value="kiwe">kiwe</option>
    <option value="pomelo">pomelo</option>
    <optgroup label="fruit">
      <option value="avocado">avocado</option>
      <option value="banana">banana</option>
    </optgroup>
</select>
```
* `option` ： 選項
  * 屬性
    * `seleced` 將其選項設定為預設選項
    * `value` 其選項傳送到後端的值
    * `disabled` 禁止選取其選項
* `optgroup`： 群組化選項，但本身不可選
  * 屬性
    * `label` 群組名稱
    * `disabled` 禁止選取此群組的選項


* `fieldset` 群組化表單中的欄位
  * 屬性
    * `form` 此群組的歸屬於一個或多個表單（以空格分隔）
    * `name` 此群組的名稱
    * `disabled` 禁止選取此群組中的欄位

## 請問什麼是盒模型（box modal）

打開開發者工具 computed 可以看到 box modal
主要的功能在於，清楚的看到目前所指的元素在瀏覽器中實際的 margin、border、padding 及 寬高，是很重要的 CSS 資訊，當使用 JavaScript 控制元素的尺寸時，就可以透過 box modal 確認是否正確。
我們通常會設定以下CSS 讓 border、padding 算在元素內

```css

*, ::after, ::before {
  box-sizing: border-box;
}

```

## 請問 display: inline, block 跟 inline-block 的差別是什麼？

* block 元素以區塊方式呈現，可設定寬高及上下距離。
* inline 元素在同一行呈現，寬度不足時才換行，無法設定寬高及上下距離。
* inline-block 元素在同一行呈現，寬度不足時才換行，但可以設定寬高及上下距離。

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？

* static 元素靜止不動的狀態，不會根據設定重新定位，是默認屬性。
* relative 元素停留在原位置，但當設定 top left right bottom 時，會以原位置做基準重新定位。
* absolute 元素會浮起，會往上找父元素是否非 static 做相對定位，若找到 body 都沒有就會以 body 做定位。
fixed 元素會浮起，以 viewport 做定位。

