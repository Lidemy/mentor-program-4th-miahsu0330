## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？

#### 什麼是 DNS

IP 位置：網路溝通的地址，每一個主機都有一個 IP 位置，都是由 4 個數字組成，例如： 101.12.112.80，但對於使用者來說不容易記憶，因而產生了域名（Domain）。
域名（Domain）：就是網址，因為比起 IP 位置 可讀且好記，所以日常生活中我們都是使用域名來進行網路溝通。

雖然說域名比較好記，但實際上電腦在進行網路溝通時都是使用 IP 位置，因此就必須進行轉換。
DNS 的全名為 Domain Name System，中文為用網域名稱系統，它的作用就是將域名轉換成實際的 IP 位置，例如今天要造訪 Facebook 而 https://zh-tw.facebook.com/，當我們輸入這個網址，DNS 就會將網址轉換成 69.171.250.15:443，這樣電腦就知道你要造訪哪個網站了。


### Google Public DNS 
是 Google 於 2009 年開始提供的一個免費域名解析服務，此服務的 DNS 位址：

**IPv4 位址**：

* 8.8.8.8 (google-public-dns-a.google.com)
* 8.8.4.4 (google-public-dns-b.google.com)

##### 對於 Google 的好處
由於只要進行網路溝通所有的網址都要訪問 DNS 才能得到 IP 位置，因此 Google 就可以知道哪些網址最常被造訪、造訪的次數等等，透過這項服務蒐集大量的數據。

##### 對一般大眾的好處
* 加速瀏覽體驗 
* 提升網路安全
* 直接取得 DNS 查詢結果

綜合上述幾點，就是指使用 google 的 DNS 服務能使上網更快更安全。


#### 資料來源：
* [維基百科 - Google Public DNS](https://zh.wikipedia.org/wiki/Google_Public_DNS)
* [使用 Google Public DNS 服務，上網速度不一定會變快！](https://blog.miniasp.com/post/2009/12/08/Use-Google-Public-DNS-may-not-surfing-faster-as-you-expected)
* [Google Public DNS上網跑更快，用戶端趕快更換IPv4 DNS設定8.8.8.8與8.8.4.4](http://www.pcdiy.com.tw/detail/1412)

## 什麼是資料庫的 lock？為什麼我們需要 lock？

#### 資料庫的 lock

防止當多 Transaction 覆寫資料庫時造成資料不一致與衝突，「同一時間」，「一個值」只能被「一個 transaction」所操作，所以把資料「鎖起來」。
lock 有分等級：row lock、table lock

#### 為什麼我們需要 lock

什麼時候會發生在同一時間對一個值進行多個 transaction 的操作？「搶票系統」。
race condition：當兩個東西操作一個東西時會發生的問題，因此在操作執行完成之前需要把資料鎖起來。

#### mysql 使用 lock

```php
$conn->autommot(FALSE);
$conn->begin_transaction();
$conn->query("SELECT amount from products where id = 1 for update"); // 'for updat' 在 transaction 內才有作用
$conn->commit();
```

#### 參考資料

* [面試官問：請介紹一下MySQL資料庫的鎖機制？](https://iter01.com/443580.html)
* [封鎖 (資料庫)](https://zh.wikipedia.org/wiki/%E5%B0%81%E9%94%81_(%E6%95%B0%E6%8D%AE%E5%BA%93))
* [MySQL學習之—鎖（行鎖、表鎖、頁鎖、樂觀鎖、悲觀鎖等）](https://kknews.cc/code/xenvz88.html)

## NoSQL 跟 SQL 的差別在哪裡？

#### NoSQL 非關聯式資料庫系統

* 市面上常見的關聯式資料庫：MongoSQL。
* 沒有資料欄位也沒有資料庫結構。
* 沒有資料型態上的限制，可以想像成存一個很像 JSON 格式的資料進資料庫。
* 用 key-value 來存，一個 key 對應到一大筆資料。
* 不支援 JOIN 語法。
* 使用的場合：
最適合使用在搜集數據，可能欄位會有超級多個，一旦需要儲存新的資料的時候就必須去改一次資料庫，這是很麻煩的行為。若用 NoSQL，只要直接把資料存進去就好，不必知道裡面到底有多少項資料。
例如：log、日誌、社群上的資訊（按讚數、被分享數）。

#### SQL 屬於關聯式資料庫系統

* 市面上常見的關聯式資料庫：MySQL、PostgreSQL、MSSQL。
* 大部分時機都是使用關聯資料。
* 類似 table 格式，資料間是有明確關聯性，藉由關聯性去撈取不同 table 間的資料。
* 使用的場合：據明確關聯性的資料，例如：學生資料庫，其中明確的的關聯為學號。

#### 參考資料

* [閃開！讓專業的來：SQL 與 NoSQL](https://ithelp.ithome.com.tw/articles/10187443)
* [关于NoSQL与SQL的区别](https://blog.csdn.net/xlgen157387/article/details/47908797)
* [在 NoSQL 和傳統關聯式資料庫之間做出決定](https://navicat.com/cht/company/aboutus/blog/1002-deciding-between-nosql-and-traditional-relational-databases.html)

## 資料庫的 ACID 是什麼？

#### Transaction 交易
是進行資料庫操作執行過程中的一個邏輯單位，而一個 Transaction 會包含了多個 query 的操作，那什麼樣的操作會需要使用到 Transaction 呢？舉例來說：A 轉帳 100 給 B。這項功能其實包含了以下 query 的操作

第一個 query：讀取 A 帳戶的金額
第一個 query：扣除 A 帳戶金額
第二個 query：B 帳戶增加金額

而這兩個 query 必須是全部被執行或著都不被執行，否則資料庫則會產生錯誤
一次牽涉到多個 query 的操作就需要使用 Transation 來處理，例如：轉帳、購物網站上的交易等。

#### ACID

為了保持 Transaction 在執行上是正確可靠的，必須具備四個特性，我們稱之為「ACID」分別為：原子性（Atomicity）、一致性（Consistency）、隔離性（Isolation）、永續性（Durability）

* 原子性（Atomicity）：Transaction 作為一個單位被執行，包含在其中對資料庫進行的 juery 操作，要必須是全部被執行，或著都不執行，如同上述講到的轉帳。
* 一致性（Consistency）：Transaction 應確保資料庫的狀態從一個「一致狀態」轉變為另一個「一致狀態」。
* 隔離性（Isolation）：應該確保 Transaction 間不相互影響，因此「同一時間」，「一個值」只能被「一個 transaction」所操作。

    ```
    舉例來說：A 帳戶裡面有 100
    第一個 Transaction：A 轉帳 20 給 B
    第二個 Transaction：A 轉帳 100 給 C

    若在第一個 Transaction 尚未執行完畢時並發執行第二個 Transaction，可能在讀取 A 帳戶的金額時讀到 100，就以為帳戶裡是有足夠的金額，並執行第二個 Transaction，但事實上 A 帳戶裡只剩下 80 塊，就會導致錯誤。
    ```

* 永續性（Durability）：已被成功執行的 Transaction 對於資料庫的修改應永久儲存在資料庫中。

#### mysql 使用 Transaction

```php
$conn->autocommit(FALSE); // 每執行一個 query 就會自動幫你變成一個 Transaction，要關掉
$conn->begin_transaction(); // 開始 Transaction
$conn->query("update from money set amount = 20"); // Transaction 中的 query
$conn->query("update from money set sum = 10"); // Transaction 中的 query
$conn->commit(); // 執行 Transaction，如果 commit 成功就是上述的 query 都成功，失敗都失敗
```

補充：MyISAM 不支援

#### 參考資料

* [資料庫交易](https://zh.wikipedia.org/wiki/%E6%95%B0%E6%8D%AE%E5%BA%93%E4%BA%8B%E5%8A%A1)
* [如何理解数据库事务中的一致性的概念？](https://www.zhihu.com/question/31346392)
* [MySQL 基本運作介紹，從資料庫交易與 ACID 特性開始](https://tw.alphacamp.co/blog/mysql-intro-acid-in-databases)