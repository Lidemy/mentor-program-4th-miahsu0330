## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫

##### 加密（Encryption）
* 將明文資訊改變為難以讀取的密文，可透過「解密」還原出內容。
* 加密跟解密都必須要透過金鑰（key）才能進行。
* 為一對一之對應關係。

##### 雜湊（Hash function）
* 把明文丟進一串公式後變成秘文
* 無論內容長短，透過雜湊演算法後都會輸出固定長度的值。
* 當不同的內容卻輸出一樣的值時，這個情況稱為「碰撞」，但好的雜湊演算法，產生碰撞的機率是很低的。

#### 雜湊跟加密的差別
雜湊由於無法「逆向解出明文」，因此安全性相較於加密更高，也是跟加密最大的區別。

#### 為什麼密碼要雜湊過後才存入資料庫
假設很不幸的資料庫被入侵，最重要的密碼也不會拿走或輕易的被猜出來。

## `include`、`require`、`include_once`、`require_once` 的差別

四種都是用於引入檔案

`include`、`require` 兩者的差別在於，引入的檔案不存在時，拋出的錯誤不同
`include`：如果遇到錯誤會提示錯誤並繼續執行
`require`：如果遇到錯誤會提示錯誤但會終止執行

`include_once()`、`require_once()` 兩者會先判斷檔案是否已被引入，如果是則會忽略。

## 請說明 SQL Injection 的攻擊原理以及防範方法

#### 攻擊原理
攻擊者注入 SQL 語法去更改語法邏輯或加入特殊指令的方式，擅自竊取、修改資料。

#### 防範方法
##### prepared statement

中文為「參數化查詢」是指在使用資料庫語法時，在需要填入數值或資料的地方，使用參數來給值，就可以防範 SQL Injection

```php
$sql = 'INSERT INTO comments (username, content) VALUE (?, ?)'; // 準備好 SQL 語法，用問號（稱為佔位符或參數）替換查詢中的所有變量
$stmt = $connect->prepare($sql); // 準備結果查詢
$stmt->bind_param('ss', $username, $content); //將所有變量綁定到先前準備的語句
$result = $stmt->execute(); // 執行語句
```

##  請說明 XSS 的攻擊原理以及防範方法

#### 攻擊原理
全名：Cross-site scripting，中文為 跨網站指令碼攻擊，泛指通過利用網頁開發時留下的漏洞，通常是 JavaScript，但也可能是 Java、VBScript、ActiveX、Flash 或者甚至是普通的 HTML。

#### 防範方法
在網站顯示使用的內容時，對內容進行過濾，針對某些特殊字元進行跳脫或轉換，

##### htmlspecialchars()
* 把預定義的特殊字元轉換成 HTML 僅能顯示用的編碼
* 語法：

```php
htmlspecialchars( $string , $quote_flags , $encoding , $double_encode )
```
`$string`：需轉換的字串。
`$quote_flags`：用來設定對引號的轉換，基本上建議使用 ENT_QUOTES 單雙引號都轉換（預設是僅轉換雙引號）。
`$encoding`：用來設定要轉換的編碼，預設值則是 UTF-8。
`$double_encode`： 是否要對全部進行轉換，預設值是轉換全部的 HTML 碼。

## 請說明 CSRF 的攻擊原理以及防範方法

#### 攻擊原理
在網站使用者處於已經登入的狀態，攻擊者可以從不同的 Domain 下將網站關聯的 cookie 帶上後就能偽造出 「使用者本人發出的 request」到網站中。

#### 防範方法
防範原則：阻擋從不同 Domain 來的 request。


##### Double Submit Cookie
由 Server 產生一組隨機的 token 加在 form 中，同時也讓 client 端設定一個名叫 csrftoken 的 cookie，值也是同一組 token。

```
Set-Cookie: csrftoken=fj1iro2jro12ijoi1

<form action="https://blog.com/delete" method="POST">
  <input type="hidden" name="id" value="3"/>
  <input type="hidden" name="csrftoken" value="fj1iro2jro12ijoi1"/>
  <input type="submit" value="刪除文章"/>
</form>
```

當使用者發送 request 時， server 比對 cookie 內的 csrfrtoken 與 form 裡面的 csrftoken，檢查是否有值並且相等，如此一來就可以區分 request 是不是來自於相同的 domain

這個方法也可以是由 client 端生成 token，因為此 token 不包含任合資訊，所以由 Server 端或 client 生成都是可以的。

##### browser 本身的防範方法（chrome v51^）

chrome 瀏覽器有對 CSRF 的攻擊額外做了防禦機制，開發者是要在原本設置的 Cookie 的 header 中多加上 SameSite ，瀏覽器就會驗證，此 request 是不是同一個 site 底下發出的，如果不是，就不會帶上關聯的 cookie

```
Set-Cookie: session_id=vmcupz23o1; SameSite
```

