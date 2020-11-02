### 程式碼

``` js
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
``` 

### 輸出

``` js
i: 0
i: 1
i: 2
i: 3
i: 4

5 // 每經過 1 秒印出
5 // 每經過 1 秒印出
5 // 每經過 1 秒印出
5 // 每經過 1 秒印出
5 // 每經過 1 秒印出

```

### 解析

1. 進入 Global EC：
    * 產生執行環境（execution context），簡稱 EC。每個 EC 裡面會包含著一個變數物件（Variable Object），以下簡稱 VO，可以把 VO 直接想像成一個物件，宣告的變數跟函式都會被加進 VO 裡面，如果是 Function，那參數也會被加到 VO 裡

    ``` js
    Global EC = {
        phase: 'Creation',
        VO: {
            i: undefined
        },
    }
    ```
2. 執行程式碼，將主函式 main() 放入 stack 中

    ``` js
    Global EC = {
        phase: 'Execution',
        VO: {
            i: undefined
        },
    }
    ```

    |    stack    | web APIs  | callback queue | console |
    | ----------- | --------- | -------------- | ------- |
    | main()      |           |                |         |

2. 進入 for 迴圈， i 賦值為 0，檢查 `i<5` ，是，進入第一圈迴圈

3. 進入第二行，`console.log('i: ' + i)`  放入 stack

    ``` js
    Global EC = {
        phase: 'Execution',
        VO: {
            i: 0
        },
        scopeChain: globalEC.VO
    }
    ```
    |         stack          |        web APIs        |     callback queue     | console |
    | ---------------------- | ---------------------- | ---------------------- | ------- |
    | console.log('i: ' + i) |                        |                        |         |
    | main()                 |                        |                        |         |


4. 執行 `console.log('i: ' + i)` ，到 scope chain 找到 i: 0， pop of stack

    |         stack          |        web APIs        |     callback queue     | console |
    | ---------------------- | ---------------------- | ---------------------- | ------- |
    | main()                 |                        |                        | i: 0    |

5. 進入第三行 `setTimeout(cb1, i * 1000)` ，到 scope chain 找到 i: 0
    * 5-1： `setTimeout(cb1, 0)` 放入 stack

        |      stack         |       web APIs     |   callback queue   | console |
        | ------------------ | ------------------ | ------------------ | ------- |
        | setTimeout(cb1, 0) |                    |                    | i: 0    |
        | main()             |                    |                    |         |

    * 5-2：開始執行 JavaScript runtime 呼叫 web APIs 0 秒後執行 cb1，所以現在它會開始倒數計時， pop of stack。

        |      stack         |       web APIs     |   callback queue   | console |
        | ------------------ | ------------------ | ------------------ | ------- |
        | main()             | setTimeout(cb1, 0) |                    | i: 0    |

    * 5-3: 0 秒到了，callbalck function 被放到 callback queue 去。

        |      stack         |       web APIs     |   callback queue   | console |
        | ------------------ | ------------------ | ------------------ | ------- |
        | main()             |                    | setTimeout(cb1, 0) | i: 0    |

6. 回到 第一行，`i++`，globalEC.VO 的 i 賦值 `1`，檢查 `i < 5`，是，進入第二圈迴圈

    ``` js
    Global EC = {
        phase: 'Execution',
        VO: {
            i: 1
        },
        scopeChain: globalEC.VO
    }
    ```

    |      stack         |       web APIs     |   callback queue   | console |
    | ------------------ | ------------------ | ------------------ | ------- |
    | main()             |                    | setTimeout(cb1, 0) | i: 0    |

7. (同步驟 3,4)進入第二行，`console.log('i: ' + i)`  放入 stack，執行 `console.log('i: ' + i)` ，到 scope chain 找到 i: 1， pop of stack

    ``` js
    Global EC = {
        phase: 'Execution',
        VO: {
            i: 1
        },
        scopeChain: globalEC.VO
    }
    ```

    |         stack          |       web APIs     |   callback queue   | console |
    | ---------------------- | ------------------ | ------------------ | ------- |
    | main()                 |                    | setTimeout(cb1, 0) | i: 0    |
    |                        |                    |                    | i: 1    |

8. (同步驟 5) 進入第三行 `setTimeout(cb2, i * 1000)` ，到 scope chain 找到 i: 1，`setTimeout(cb2, 1000)` 放入 stack，開始執行 JavaScript runtime 呼叫 web APIs 1 秒後執行 cb1，所以現在它會開始倒數計時， pop of stack。

    ``` js
    Global EC = {
        phase: 'Execution',
        VO: {
            i: 1
        },
        scopeChain: globalEC.VO
    }
    ```

    |        stack       |        web APIs       |   callback queue   | console |
    | -----------------  | --------------------- | ------------------ | ------- |
    | main()             | setTimeout(cb2, 1000) | setTimeout(cb1, 0) | i: 0    |
    |                    |                       |                    | i: 1    |

9. 回到 第一行，`i++`，globalEC.VO 的 i 賦值 `2`，檢查 `i < 5`，是，進入第二圈迴圈

    ``` js
    Global EC = {
        phase: 'Execution',
        VO: {
            i: 2
        },
        scopeChain: globalEC.VO
    }
    ```

    |        stack       |        web APIs       |   callback queue   | console |
    | -----------------  | --------------------- | ------------------ | ------- |
    | main()             | setTimeout(cb2, 1000) | setTimeout(cb1, 0) | i: 0    |
    |                    |                       |                    | i: 1    |

10. (同步驟 3,4) 進入第二行，`console.log('i: ' + i)`  放入 stack，執行 `console.log('i: ' + i)` ，到 scope chain 找到 i: 2， pop of stack

    |       stack        |         web APIs      |   callback queue   | console |
    | ------------------ | --------------------- | ------------------ | ------- |
    | main()             | setTimeout(cb2, 1000) | setTimeout(cb1, 0) | i: 0    |
    |                    |                       |                    | i: 1    |
    |                    |                       |                    | i: 2    |

11. (同步驟 5) 進入第三行 `setTimeout(cb3, i * 1000)` ，到 scope chain 找到 i: 2，`setTimeout(cb3, 2000)` 放入 stack，開始執行 JavaScript runtime 呼叫 web APIs 2 秒後執行 cb1，所以現在它會開始倒數計時， pop of stack。

    ``` js
    Global EC = {
        phase: 'Execution',
        VO: {
            i: 2
        },
        scopeChain: globalEC.VO
    }
    ```

    |        stack       |        web APIs       |   callback queue   | console |
    | -----------------  | --------------------- | ------------------ | ------- |
    | main()             | setTimeout(cb2, 1000) | setTimeout(cb1, 0) | i: 0    |
    |                    | setTimeout(cb3, 2000) |                    | i: 1    |
    |                    |                       |                    | i: 2    |

12. 回到 第一行，`i++`，globalEC.VO 的 i 賦值 `3`，檢查 `i < 5`，是，進入第三圈迴圈

    ``` js
    Global EC = {
        phase: 'Execution',
        VO: {
            i: 3
        },
        scopeChain: globalEC.VO
    }
    ```
    |        stack       |        web APIs       |   callback queue   | console |
    | -----------------  | --------------------- | ------------------ | ------- |
    | main()             | setTimeout(cb2, 1000) | setTimeout(cb1, 0) | i: 0    |
    |                    | setTimeout(cb3, 2000) |                    | i: 1    |
    |                    |                       |                    | i: 2    |

13. 接著重複步驟 10, 11, 12，直至檢查 `i < 5`，否，跳出迴圈
    
    ``` js
    Global EC = {
        phase: 'Execution',
        VO: {
            i: 5
        },
        scopeChain: globalEC.VO
    }
    ```
    |        stack       |        web APIs       |   callback queue   | console |
    | -----------------  | --------------------- | ------------------ | ------- |
    | main()             | setTimeout(cb2, 1000) | setTimeout(cb1, 0) | i: 0    |
    |                    | setTimeout(cb3, 2000) |                    | i: 1    |
    |                    | setTimeout(cb4, 3000) |                    | i: 2    |
    |                    | setTimeout(cb5, 4000) |                    | i: 3    |
    |                    |                       |                    | i: 4    |

14. 全部執行完畢。 `main()` pop of stack

    ``` js
    Global EC = {
        phase: 'Execution',
        VO: {
            i: 5
        },
        scopeChain: globalEC.VO
    }
    ```
    |        stack       |        web APIs       |   callback queue   | console |
    | ------------------ | --------------------- | ------------------ | ------- |
    |                    | setTimeout(cb2, 1000) | setTimeout(cb1, 0) | i: 0    |
    |                    | setTimeout(cb3, 2000) |                    | i: 1    |
    |                    | setTimeout(cb4, 3000) |                    | i: 2    |
    |                    | setTimeout(cb5, 4000) |                    | i: 3    |
    |                    |                       |                    | i: 4    |

15. `event loop` 偵測到 stack 空了就把 callback queue 裡面的東西丟到 stack 中，`setTimeout(cb1, 0)` 放入 stack，同時 web APIs 裡的也在處理 Timer 需求，到了指定秒數將任務放到 callback queue 中

    |        stack       |        web APIs       |     callback queue    | console |
    | ------------------ | --------------------- | --------------------- | ------- |
    | setTimeout(cb1, 0) | setTimeout(cb3, 2000) | setTimeout(cb2, 2000) | i: 0    |
    |                    | setTimeout(cb4, 3000) |                       | i: 1    |
    |                    | setTimeout(cb5, 4000) |                       | i: 2    |
    |                    |                       |                       | i: 3    |
    |                    |                       |                       | i: 4    |

16. 執行 `setTimeout(cb1, 0)` 呼叫 `cb1()`，放入 stack 中

    |        stack       |        web APIs       |     callback queue    | console |
    | ------------------ | --------------------- | --------------------- | ------- |
    | cb1()              | setTimeout(cb3, 2000) | setTimeout(cb2, 2000) | i: 0    |
    | setTimeout(cb1, 0) | setTimeout(cb4, 3000) |                       | i: 1    |
    |                    | setTimeout(cb5, 4000) |                       | i: 2    |
    |                    |                       |                       | i: 3    |
    |                    |                       |                       | i: 4    |


17. 執行 `cb1()` 建立 cbEC 產生並初始化 Activation Object，簡稱 AO 
    * VO 與 AO 的差異，在於 AO 裡面會有一個 `arguments`，其餘都是差不多的，用途也是一樣。

    ``` js
    Global EC = {
        phase: 'Execution',
        VO: {
            i: 5
        },
        scopeChain: globalEC.VO
    }

    cb1 EC = {
       phase: 'Creation',
        AO: {
        },
        scopeChain: 
          [cb.AO, cb.[[Scope]]]
        = [cb.AO, globalEC.scopeChain]
        = [cb.AO, globalEC.VO]
    }

    ```

18. 進入第七行，執行 `console.log('i: ' + i)`，先在 `cb1.AO` 找，是否有 `i` 這個東西，沒有所以 沿著 scope Chain 往上到 `globalEC.VO` 找到 `i` 為 `5`，執行完畢 pop of stack。


    ``` js
    Global EC = {
        phase: 'Execution',
        VO: {
            i: 5
        },
        scopeChain: globalEC.VO
    }
    ```
    |        stack       |        web APIs       |     callback queue    | console |
    | ------------------ | --------------------- | --------------------- | ------- |
    |                    | setTimeout(cb3, 2000) | setTimeout(cb2, 2000) | i: 0    |
    |                    | setTimeout(cb4, 3000) |                       | i: 1    |
    |                    | setTimeout(cb5, 4000) |                       | i: 2    |
    |                    |                       |                       | i: 3    |
    |                    |                       |                       | i: 4    |
    |                    |                       |                       | 5       |

19. 同步驟 11~13. 再次偵測到 stack 空了把 callback queue 內的任務放進來，如下執行：
    * 執行的時間就會依據處理 Timer 需求，也就是每隔一秒執行一次
    1. 執行 `cb()` 建立 cbEC 產生並初始化
    2. 進入第七行，執行 `console.log('i: ' + i)`，先在 `cb.AO` 找，是否有 `i` 這個東西，沒有所以 沿著 scope Chain 往上到 `globalEC.VO` 找到 `i` 為 `5`，執行完畢 pop of stack。

    |         stack         |        web APIs       |     callback queue    | console |
    | --------------------- | --------------------- | --------------------- | ------- |
    | cb2()                 | setTimeout(cb4, 3000) | setTimeout(cb3, 2000) | i: 0    |
    | setTimeout(cb2, 1000) | setTimeout(cb5, 4000) |                       | i: 1    |
    |                       |                       |                       | i: 2    |
    |                       |                       |                       | i: 3    |
    |                       |                       |                       | i: 4    |
    |                       |                       |                       | 5       |

    |         stack         |        web APIs       |     callback queue    | console |
    | --------------------- | --------------------- | --------------------- | ------- |
    | cb3()                 | setTimeout(cb5, 4000) | setTimeout(cb4, 3000) | i: 0    |
    | setTimeout(cb3, 2000) |                       |                       | i: 1    |
    |                       |                       |                       | i: 2    |
    |                       |                       |                       | i: 3    |
    |                       |                       |                       | i: 4    |
    |                       |                       |                       | 5       |
    |                       |                       |                       | 5       |

    |         stack         |       web APIs      |     callback queue    | console |
    | --------------------- | ------------------- | --------------------- | ------- |
    | cb4()                 |                     | setTimeout(cb5, 4000) | i: 0    |
    | setTimeout(cb4, 3000) |                     |                       | i: 1    |
    |                       |                     |                       | i: 2    |
    |                       |                     |                       | i: 3    |
    |                       |                     |                       | i: 4    |
    |                       |                     |                       | 5       |
    |                       |                     |                       | 5       |
    |                       |                     |                       | 5       |

    |         stack         |       web APIs      |     callback queue    | console |
    | --------------------- | ------------------- | --------------------- | ------- |
    | cb5()                 |                     |                       | i: 0    |
    | setTimeout(cb5, 4000) |                     |                       | i: 1    |
    |                       |                     |                       | i: 2    |
    |                       |                     |                       | i: 3    |
    |                       |                     |                       | i: 4    |
    |                       |                     |                       | 5       |
    |                       |                     |                       | 5       |
    |                       |                     |                       | 5       |
    |                       |                     |                       | 5       |

    |         stack         |       web APIs      |     callback queue    | console |
    | --------------------- | ------------------- | --------------------- | ------- |
    |                       |                     |                       | i: 0    |
    |                       |                     |                       | i: 1    |
    |                       |                     |                       | i: 2    |
    |                       |                     |                       | i: 3    |
    |                       |                     |                       | i: 4    |
    |                       |                     |                       | 5       |
    |                       |                     |                       | 5       |
    |                       |                     |                       | 5       |
    |                       |                     |                       | 5       |
    |                       |                     |                       | 5       |

20. 執行完畢，輸出結果為：


``` js
i: 0
i: 1
i: 2
i: 3
i: 4

5 // 每經過 1 秒印出
5 // 每經過 1 秒印出
5 // 每經過 1 秒印出
5 // 每經過 1 秒印出
5 // 每經過 1 秒印出

```