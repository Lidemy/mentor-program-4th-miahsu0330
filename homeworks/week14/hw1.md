<img src="https://upload.cc/i1/2020/10/24/qJcFEm.png" alt="drawing" width="500"/>

1. 使用者發出短網址的需求，在到達 Sever 之前會先經過 Load balance  (負載平衡器)自動分配新進來的請求要導到哪一台 Server。
2. 查詢資料庫是否已存在短網址
    * **是**：讀取資料庫裡的短網址，並一路回傳回去。
    * **否**：新增一個短網址儲存到資料庫後，一路回傳回去。