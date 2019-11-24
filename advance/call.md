## 模拟实现一个 call 方法
- 步骤：
  - 把函数设为该对象的属性
  - 执行该函数 & 删除该函数
  - 指定 this 到函数并传入给定参数执行函数
  - 如果不传入参数，默认指向为 window

```js
Function.prototype.myCall = function(context) {
  var context = context || window; // 有可能传递 null 的时候，传递 null，传递 null 时候，this 指向 window
  context.fn = this;

  var args = [];
  for (var i = 1,len = arguments.length; i < len; i++) {  // i 从 1 开始，因为第一个参数是 context
    args.push(arguments[i]);
  }

  var result = context.fn(...args)
  
  delete context.fn;
  return result;
}
```