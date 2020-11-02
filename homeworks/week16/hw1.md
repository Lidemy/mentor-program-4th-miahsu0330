### 程式碼

```js
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)

```

### 輸出

``` js
1
3
5
2
4
```

### 解析

![Understanding Event Loop, Call Stack, Event & Job Queue in Javascript 裡面附的 codepen 截圖](https://static.coderbridge.com/img/techbridge/images/huli/js-async/eventloop.png)

#### 執行程式碼

1. 將主函式 main() 放入 stack 中
    * `主函式 main()`：就是指這個檔案本身
    * `stack`：在 JavaScript 中的執行堆疊會記錄目前執行到程式的哪個部分，如果進入了某一個函式，便會把這個函式添加到堆疊（stack）當中的最上方，函式執行完畢則會將其函式從堆疊中抽離（pop of）。
    
    |    stack    | web APIs  | callback queue | console |
    | ----------- | --------- | -------------- | ------- |
    | main()      |           |                |         |

2. 進入第一行 `console.log(1)` 放入 stack

    |    stack       |     web APIs   | callback queue | console |
    | -------------- | -------------- | -------------- | ------- |
    | console.log(1) |                |                |         |
    | main()         |                |                |         |

3. 執行 `console.log(1)` pop of stack

    |    stack       |     web APIs   | callback queue | console |
    | -------------- | -------------- | -------------- | ------- |
    | main()         |                |                | 1       |

4. 進入第二行 `setTimeout(cb1, 0)` 
    * 4-1： `setTimeout(cb1, 0)` 放入 stack

        |      stack         |       web APIs     |   callback queue   | console |
        | ------------------ | ------------------ | ------------------ | ------- |
        | setTimeout(cb1, 0) |                    |                    | 1       |
        | main()             |                    |                    |         |

    * 4-2：setTimeout 是瀏覽器提供給我們的 API，開始執行 JavaScript runtime 呼叫 web APIs 0 秒後執行 cb1，所以現在它會開始倒數計時， pop of stack。

        |      stack         |       web APIs     |   callback queue   | console |
        | ------------------ | ------------------ | ------------------ | ------- |
        | main()             | setTimeout(cb1, 0) |                    | 1       |

    * 4-3: 0 秒到了，callbalck function 被放到callback queue 去。
        * callback queue: 任務佇列，就像是一個排隊機制，因為可能會有很多 callback function 都在等待執行，而這邊著任務會等到 stack 空了才執行。

        |      stack         |       web APIs     |   callback queue   | console |
        | ------------------ | ------------------ | ------------------ | ------- |
        | main()             |                    | setTimeout(cb1, 0) | 1       |

5. 進入第五行 `console.log(3)` 放入 stack

    |      stack         |       web APIs     |   callback queue   | console |
    | ------------------ | ------------------ | ------------------ | ------- |
    | console.log(3)     |                    | setTimeout(cb1, 0) | 1       |
    | main()             |                    |                    |         |

6. 執行 `console.log(3)` pop of stack

    |      stack         |       web APIs     |   callback queue   | console |
    | ------------------ | ------------------ | ------------------ | ------- |
    | main()             |                    | setTimeout(cb1, 0) | 1       |
    |                    |                    |                    | 3       |

7. 進入第六行 `setTimeout(cb2, 0)` 同步驟4. 

    |      stack         |       web APIs     |   callback queue   | console |
    | ------------------ | ------------------ | ------------------ | ------- |
    | main()             |                    | setTimeout(cb1, 0) | 1       |
    |                    |                    | setTimeout(cb2, 0) | 3       |

8. 進入第九行 `console.log(5)` 放入 stack

    |      stack         |       web APIs     |   callback queue   | console |
    | ------------------ | ------------------ | ------------------ | ------- |
    | console.log(5)     |                    | setTimeout(cb1, 0) | 1       |
    | main()             |                    | setTimeout(cb2, 0) | 3       |

9. 執行 `console.log(5)` pop of stack

    |      stack         |       web APIs     |   callback queue   | console |
    | ------------------ | ------------------ | ------------------ | ------- |
    | main()             |                    | setTimeout(cb1, 0) | 1       |
    |                    |                    | setTimeout(cb2, 0) | 3       |
    |                    |                    |                    | 5       |

10. 全部執行完畢。 `main()` pop of stack

    |      stack         |       web APIs     |   callback queue   | console |
    | ------------------ | ------------------ | ------------------ | ------- |
    |                    |                    | setTimeout(cb1, 0) | 1       |
    |                    |                    | setTimeout(cb2, 0) | 3       |
    |                    |                    |                    | 5       |

11. `event loop` 偵測到 stack 空了就把 callback queue 裡面的東西丟到 stack 中，`setTimeout(cb1, 0)` 放入 stack。

    |      stack         |       web APIs     |   callback queue   | console |
    | ------------------ | ------------------ | ------------------ | ------- |
    | setTimeout(cb1, 0) |                    | setTimeout(cb2, 0) | 1       |
    |                    |                    |                    | 3       |
    |                    |                    |                    | 5       |

12. 執行 `setTimeout(cb1, 0)` 呼叫 `cb1()`，放入 stack 中

    |      stack         |       web APIs     |   callback queue   | console |
    | ------------------ | ------------------ | ------------------ | ------- |
    | cb1()              |                    | setTimeout(cb2, 0) | 1       |
    | setTimeout(cb1, 0) |                    |                    | 3       |
    |                    |                    |                    | 5       |

13. 執行 `cb1()` 後 `cb1()`、 `setTimeout(cb1, 0)` pop of stack

    |      stack         |       web APIs     |   callback queue   | console |
    | ------------------ | ------------------ | ------------------ | ------- |
    |                    |                    | setTimeout(cb2, 0) | 1       |
    |                    |                    |                    | 3       |
    |                    |                    |                    | 5       |
    |                    |                    |                    | 2       |



13. 同步驟 11~13. 偵測到 stack 空了 `setTimeout(cb2, 0)` 放入 stack，執行 `setTimeout(cb2, 0)` 呼叫 `cb2()`，放入 stack 中，接著執行 `cb2()` 後 `cb2()`、 `setTimeout(cb2, 0)` pop of stack

    |      stack         |       web APIs     |   callback queue   | console |
    | ------------------ | ------------------ | ------------------ | ------- |
    |                    |                    |                    | 1       |
    |                    |                    |                    | 3       |
    |                    |                    |                    | 5       |
    |                    |                    |                    | 2       |
    |                    |                    |                    | 4       |

14. 執行完畢，輸出結果為：

```
1
3
5
2
4
```

