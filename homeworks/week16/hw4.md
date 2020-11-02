### 程式碼

``` js
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value) // 1
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // 2
obj2.hello() // 2
hello() // u
``` 

### 輸出

``` js
2
2
undefined
```

### 解析

this 跟 function 怎麼被呼叫有關

* obj.inner.hello() => obj.inner.hello.call(obj.inner)
* obj2.hello() => obj2.hello.call(obj2) => obj2.hello.call(obj.inner)
* hello() => hello.call(undefined)


this 一開始是出現在物件導向裡面使用，存取及對應到的 Instance，如下：

#### 物件導向裡面使用

```js
function Dog(name) {
    this.name = name
}

Dog.prototype.getName = function() {
    return this.name
}

Dog.prototype.sayHello = function() {
    console.log(this.name)
}

var d = new Dog('abc')
d.sayHello() // abc

```

因此對於在「物件導向」以外使用 `this` 可以分成以下幾個應用情境做說明

#### 大部分情境：例如 function

this 會是一個 global 的東西，依據 runtime 不同，this 也會不同，如果是在 node.js 上執行，會出現 global 這個變數；如果是在瀏覽器上執行，會出現 window，而在嚴格模式下，this 下會是 undefied

```js

function test(name) {
    console.log(this)
}

test()

```


#### 特殊情境：瀏覽器事件 event listener

this 就會指向觸發的元素

```js

document.querySelector('.btn').addEventListenter('click', function(){
    console.log(this)
})

```

