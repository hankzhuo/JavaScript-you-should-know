## 模拟实现一个 bind 方法（ES5加入）
- 返回一个函数
- 可以传入多个参数
- 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略

```js
Function.prototype.bind = function (context) {
  // 调用 bind 的不是函数时候
  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }

  // 保存着调用者
  var self = this;
  // 在使用 bind 函数时，传入的参数，从第二个参数到最后一个参数
  var args = Array.prototype.slice.call(arguments, 1); // [1, 2, 3]
  var fNOP = function () { };

  var fBound = function () {
    // 使用 bind 返回后的函数，传入的参数
    var bindArgs = Array.prototype.slice.call(arguments);
    // this instanceof fNOP 为 true 时，说明返回的 fBound 被当做 new 的构造函数使用
    // 当作为构造函数时，this 指向实例，此时结果为 true，提供的 this 值被忽略
    return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs))
  }
  // 维护原型关系
  // fBound.prototype = Object.create(this.prototype)
  if (this.prototype) {
    // 当使用 bind 的函数不是构造函数时，this.prototype 指向该函数的构造函数；当构造函数调用时，this.prototype 为 undefined（Function.prototype.prototype）
    fNOP.prototype = this.prototype;
  }

  fBound.prototype = new fNOP();
  return fBound
}

// test
var module = {
  x: 42,
  getX: function () {
    return this.x;
  }
}
var unboundGetX = module.getX;
var boundGetX = unboundGetX.bind(module);
console.log(boundGetX());
```