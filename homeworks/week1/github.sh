#!/bin/bash

username=$1;

#連接 github api
curl -s "https://api.github.com/users/$username" | 
#找到 以下關鍵字 -w 匹配的條件是整個單詞, 不是其中的一部分
grep -w "name\|bio\|blog\|location" | 
#以「"」做為分隔印出值
awk -F'"' '{print $4}'