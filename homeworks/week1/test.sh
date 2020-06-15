#!/bin/bash



#功能開始說明
echo "產生 1~$1 個檔案，檔名是 {number}.js";

#設定起始
counter=1


####寫法1. until

## -le 大於 
# until [ $counter -gt $1 ]; do

#     #建立檔案
#    touch "$counter.js";

#     #遞增
#    counter=`expr $counter + 1`;
# done


####寫法2.while
#迴圈 -le 直到 
while [ $counter -le $1 ]; do

    #建立檔案
    touch $counter.js

    #遞增
    counter=`expr $counter + 1`   
done


#功能結束說明
echo "檔案建立完成";