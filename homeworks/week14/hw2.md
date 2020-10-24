主要是跟著 @krebikshaw 同學 [[ 紀錄 ] 部屬 AWS EC2 雲端主機 + LAMP Server + phpMyAdmin](https://mtr04-note.coderbridge.io/2020/09/15/-%E7%B4%80%E9%8C%84-%08-%E9%83%A8%E5%B1%AC-aws-ec2-%E9%9B%B2%E7%AB%AF%E4%B8%BB%E6%A9%9F-/)，超級詳細的教學文下去執行，不過很不幸的事在 AWS 註冊驗證時就碰到了難題，手機收不到驗證簡訊，，然後自己第一次在這種國外網站操作，很緊張就按了超多次重新發送，後來上網爬文看到 [台灣之星註冊amazon帳號收不到驗証碼](https://www.ptt.cc/bbs/MobileComm/M.1594860626.A.14C.html)，（嗯...我是台灣之星，但不知道有沒有關係），隔天果不其然的帳號直接鎖住，不能發送驗證信，只能找客服處理人工驗證身份。
帳號終於驗證成功後，就開始設定主機，到連線主機時又發生了問題，，不管是用 網頁版還是 CMD 都連線不上...一直噴下面的錯誤給我請我晚點再試試看
```
There was a problem setting up the instance connection
An error occurred and we were unable to connect or stay connected to your instance. If this instance has just started up, try again in a minute or two.
```
上網查說可能要[重新再啟動](https://stackoverflow.com/questions/57646205/why-am-i-failing-to-connect-to-my-linux-instance)一次，按了好幾次還是不給進，另外還看到是可能是 [DNS 的問題](https://stackoverflow.com/questions/20252294/ssh-could-not-resolve-hostname-hostname-nodename-nor-servname-provided-or-n)，但我不敢下那個指令
上網查了錯誤試著重新啟動還是不行，最後是使出大決砍掉重練，重新開一次主機，就很順利地連上去了！但還是不知道為什麼第一次無法連上。
域名設定的部分很順利的設定成功，接著設定 FTP、github 等方便上傳檔案。

在使用 phpmyadmin 設定資料庫時，進入資料表時跳出了紅色警訊

<img src="https://2.bp.blogspot.com/-2d5ykm8Bz0A/W_Y7QfRVNDI/AAAAAAAABsY/onfDPDDK08w_v6RKYNn8Vs7yWUmr3lOUQCLcBGAs/s1600/0001.png" alt="drawing" width="500"/>

上網查了一下找到[解決的辦法](https://stackoverflow.com/questions/48001569/phpmyadmin-count-parameter-must-be-an-array-or-an-object-that-implements-co)是要去改 phpmyadmin 裡面的檔案，一開始先用了 FTP 修改，結果不知道為什麼沒有權限不能上傳，但是我是使用 root 身份進去應該可以才對。後來就很害怕的到終端機輸入 `sudo sed -i "s/|\s*\((count(\$analyzed_sql_results\['select_expr'\]\)/| (\1)/g" /usr/share/phpmyadmin/libraries/sql.lib.php` 此指令，解決了這個問題，另外其他中間因為一些小失誤，像是資料庫欄位沒有設定好，導致的問題都很快速的解決掉，最後終於看到頁面的時候非常感動。

* [留言板](http://miahsuwork.tw/mtr04/comments/index.php)
* [部落格](http://miahsuwork.tw/mtr04/blog/index.php)

其實整個過程下來遇到蠻多小插曲，雖然問題解決但很多都不知道為什麼會發生，但也體驗到了架設網站的困難度，超級感謝 @krebikshaw 同學詳細的教學文真的很厲害，如果沒有教學文可能要花更久的時間去完成這項功課。

