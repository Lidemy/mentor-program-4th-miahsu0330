### 程式碼

``` js
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)

``` 

### 輸出

``` js
undefined
5
6
20
1
10
100
```

### 解析
1. 進入 Global EC：

    ``` js
    Global EC = {
        phase: 'Creation',
        VO: {
            a: undefined,
            fn: func,
        },
        scopeChain: globalEC.VO
    }
    ```

2. 執行程式碼，將主函式 main() 放入 stack 中

    ``` js
    Global EC = {
        phase: 'Execution',
        VO: {
            a: undefined,
            fn: func,
            scopeChain: globalEC.VO
        },
    }
    ```
    |    stack    | console |
    | ----------- | ------- |
    | main()      |         |

3. 進入第一行，賦值 `a` 為 `1`

    ``` js
    Global EC = {
        phase: 'Execution',
        VO: {
            a: 1,
            fn: func,
            scopeChain: globalEC.VO
        },
    }
    ```
    |    stack    | console |
    | ----------- | ------- |
    | main()      |         |

4. 進入十六行，`fn()` 建立 `fn EC` 產生並初始化 AO，放入 stack

    ``` js
    Global EC = {
        phase: 'Execution',
        VO: {
            a: 1,
            fn: func,
            scopeChain: globalEC.VO
        },
    }

    fn EC = {
        phase: 'Creation',
        AO: {
            a: undefined,
            fn2: func,
            scopeChain: [fnEC.AO, globalEC.VO]
        },
    }
    ```

    |    stack    | console |
    | ----------- | ------- |
    | fn()        |         |
    | main()      |         |

5.  進入第三行 `console.log(a)` 放入 stack

    ``` js
    Global EC = {
        phase: 'Execution',
        VO: {
            a: 1,
            fn: func,
            scopeChain: globalEC.VO
        },
    }

    fn EC = {
        phase: 'Execution',
        AO: {
            a: undefined,
            fn2: func,
            scopeChain: [fnEC.AO, globalEC.VO]
        },
    }
    ```

    |      stack     | console |
    | -------------- | ------- |
    | console.log(a) |         |
    | fn()           |         |
    | main()         |         |

6. `fn.AO` 找到 `a`，輸出後 pop of stack

    ``` js
    Global EC = {
        phase: 'Execution',
        VO: {
            a: 1,
            fn: func,
            scopeChain: globalEC.VO
        },
    }

    fn EC = {
        phase: 'Execution',
        AO: {
            a: undefined,
            fn2: func,
            scopeChain: [fnEC.AO, globalEC.VO]
        },
    }
    ```

    |      stack     |  console  |
    | -------------- | --------- |
    | fn()           | undefined |
    | main()         |           |

7. 進入第四行，賦值 `a` 為 `5`，有在 `fnEC.AO` 找到 `a`，賦值

    ``` js
    Global EC = {
        phase: 'Execution',
        VO: {
            a: 1,
            fn: func,
            scopeChain: globalEC.VO
        },
    }

    fn EC = {
        phase: 'Execution',
        AO: {
            a: 5,
            fn2: func,
            scopeChain: [fnEC.AO, globalEC.VO]
        },
    }
    ```

    |      stack     |  console  |
    | -------------- | --------- |
    | fn()           | undefined |
    | main()         |           |

8. 進入第五行，同步驟 4,5

    ``` js
    Global EC = {
        phase: 'Execution',
        VO: {
            a: 1,
            fn: func,
            scopeChain: globalEC.VO
        },
    }

    fn EC = {
        phase: 'Execution',
        AO: {
            a: 5,
            fn2: func,
            scopeChain: [fnEC.AO, globalEC.VO]
        },
    }
    ```


    |      stack     |  console  |
    | -------------- | --------- |
    | fn()           | undefined |
    | main()         | 5         |


9. 進入第六行，`a++`，有在 `fnEC.AO` 找到 `a`，執行運算子

    ``` js
    Global EC = {
        phase: 'Execution',
        VO: {
            a: 1,
            fn: func,
            scopeChain: globalEC.VO
        },
    }

    fn EC = {
        phase: 'Execution',
        AO: {
            a: 6,
            fn2: func,
            scopeChain: [fnEC.AO, globalEC.VO]
        },
    }
    ```

    |      stack     |  console  |
    | -------------- | --------- |
    | fn()           | undefined |
    | main()         | 5         |

10. 進入第七行，`var a`，由於 `a` 已存在於 `fnEC.AO` 中，因此不做任何事
11. 進入第八行，執行 `fn2()` 建立 `fn2 EC` 產生並初始化 AO，放入 stack

    ``` js
    Global EC = {
        phase: 'Execution',
        VO: {
            a: 1,
            fn: func,
            scopeChain: globalEC.VO
        },
    }

    fn EC = {
        phase: 'Execution',
        AO: {
            a: 6,
            fn2: func,
            scopeChain: [fnEC.AO, globalEC.VO]
        },
    }

    fn2 EC = {
        phase: 'Creation',
        AO: {
        },
        scopeChain: [fn2EC.AO, fnEC.AO, globalEC.VO]
    }
    ```

    |      stack     |  console  |
    | -------------- | --------- |
    | fn2()          | undefined |
    | fn()           | 5         |
    | main()         |           |


12. 進入第八行，同步驟 4, 5
    1. `console.log(a)` 放入 stack
    2. 由於在 `fn2EC.AO` 沒有發現 `a`，再往 `fnEC.AO` 找，發現 `a`
    3. 輸出後 pop off stack

    ``` js
    Global EC = {
        phase: 'Execution',
        VO: {
            a: 1,
            fn: func,
            scopeChain: globalEC.VO
        },
    }

    fn EC = {
        phase: 'Execution',
        AO: {
            a: 6,
            fn2: func,
            scopeChain: [fnEC.AO, globalEC.VO]
        },
    }

    fn2 EC = {
        phase: 'Execution',
        AO: {
        },
        scopeChain: [fn2EC.AO, fnEC.AO, globalEC.VO]
    }
    ```

    |      stack     |  console  |
    | -------------- | --------- |
    | fn2()          | undefined |
    | fn()           | 5         |
    | main()         | 6         |


13. 進入第十三行 `b = 100`
    1. 賦值 `b` 為 `100`
    2. 由於在 `fn2EC.AO` 沒有發現 `a`，再往 `fnEC.AO` 找，沒有發現 `a`，再往 `globalEC.VO` 找，沒有發現 `a`，因此在 `globalEC.VO` 建立 `b`
    3. 賦值 `globalEC.VO` 內的 `b`
 
     ``` js
    Global EC = {
        phase: 'Execution',
        VO: {
            a: 1,
            fn: func,
            b: 100,
            scopeChain: globalEC.VO
        },
    }

    fn EC = {
        phase: 'Execution',
        AO: {
            a: 20,
            fn2: func,
            scopeChain: [fnEC.AO, globalEC.VO]
        },
    }

    fn2 EC = {
        phase: 'Execution',
        AO: {
        },
        scopeChain: [fn2EC.AO, fnEC.AO, globalEC.VO]
    }
    ```

    |      stack     |  console  |
    | -------------- | --------- |
    | fn2()          | undefined |
    | fn()           | 5         |
    | main()         | 6         |


14. 進入第十四行，結束 `fn2()` pop of stack
 
     ``` js
    Global EC = {
        phase: 'Execution',
        VO: {
            a: 1,
            fn: func,
            b: 100,
            scopeChain: globalEC.VO
        },
    }

    fn EC = {
        phase: 'Execution',
        AO: {
            a: 20,
            fn2: func,
            scopeChain: [fnEC.AO, globalEC.VO]
        },
    }

    ```

    |      stack     |  console  |
    | -------------- | --------- |
    | fn()           | undefined |
    | main()         | 5         |
    |                | 6         |

15. 進入第九行， `console.log(a)`，同步驟 4,5，這時候 `fnEC.AO` 的 `a` 為 `20`

     ``` js
    Global EC = {
        phase: 'Execution',
        VO: {
            a: 1,
            fn: func,
            b: 100,
            scopeChain: globalEC.VO
        },
    }

    fn EC = {
        phase: 'Execution',
        AO: {
            a: 20,
            fn2: func,
            scopeChain: [fnEC.AO, globalEC.VO]
        },
    }

    ```

    |      stack     |  console  |
    | -------------- | --------- |
    | fn()           | undefined |
    | main()         | 5         |
    |                | 6         |
    |                | 20        |

16. 進入第十五行，結束 `fu()` pop of stack

     ``` js
    Global EC = {
        phase: 'Execution',
        VO: {
            a: 1,
            fn: func,
            b: 100,
            scopeChain: globalEC.VO
        },
    }

    ```

    |      stack     |  console  |
    | -------------- | --------- |
    | main()         | undefined |
    |                | 5         |
    |                | 6         |
    |                | 20        |

17. 進入第十七行， `console.log(a)`，同步驟 4,5，這時候 `globalEC.VO` 的 `a` 為 `1`

    ``` js
    Global EC = {
        phase: 'Execution',
        VO: {
            a: 1,
            fn: func,
            b: 100,
            scopeChain: globalEC.VO
        },
    }

    ```

    |      stack     |  console  |
    | -------------- | --------- |
    | main()         | undefined |
    |                | 5         |
    |                | 6         |
    |                | 20        |
    |                | 1         |

18. 進入第十八行，賦值 `a` 為 `10`

    ``` js
    Global EC = {
        phase: 'Execution',
        VO: {
            a: 10,
            fn: func,
            b: 100,
            scopeChain: globalEC.VO
        },
    }

    ```

    |      stack     |  console  |
    | -------------- | --------- |
    | main()         | undefined |
    |                | 5         |
    |                | 6         |
    |                | 20        |
    |                | 1         |

19. 進入第十九行， `console.log(a)`，同步驟 4,5，這時候 `globalEC.VO` 的 `a` 為 `10`

    ``` js
    Global EC = {
        phase: 'Execution',
        VO: {
            a: 10,
            fn: func,
            b: 100,
            scopeChain: globalEC.VO
        },
    }

    ```

    |      stack     |  console  |
    | -------------- | --------- |
    | main()         | undefined |
    |                | 5         |
    |                | 6         |
    |                | 20        |
    |                | 1         |
    |                | 10        |

20. 進入第二十行， `console.log(b)`，同步驟 4,5，這時候 `globalEC.VO` 的 `b` 為 `100`

    ``` js
    Global EC = {
        phase: 'Execution',
        VO: {
            a: 10,
            fn: func,
            b: 100,
            scopeChain: globalEC.VO
        },
    }

    ```

    |      stack     |  console  |
    | -------------- | --------- |
    | main()         | undefined |
    |                | 5         |
    |                | 6         |
    |                | 20        |
    |                | 1         |
    |                | 10        |
    |                | 100       |

21. 全部執行完畢。 `main()` pop of stack

    |      stack     |  console  |
    | -------------- | --------- |
    |                | undefined |
    |                | 5         |
    |                | 6         |
    |                | 20        |
    |                | 1         |
    |                | 10        |
    |                | 100       |


20. 執行完畢，輸出結果為：

``` js
undefined
5
6
20
1
10
100
```