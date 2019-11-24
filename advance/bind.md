## 模拟实现一个 bind 方法（ES5加入）

bind 方法创建一个新的函数，在 bind 被调用时，这个新函数的 this 被 bind 的第一个参数指定，其余的参数将作为新函数的参数供调用时使用。

- 返回一个函数，绑定 this，传递预置参数
- bind 返回的函数可以作为构造函数使用。故作为构造函数时应使得 this 失效，但是传入的参数依然有效

```js
Function.prototype.bind = function (context) {
  // 调用 bind 的不是函数时候
  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }

  var self = this; // 保存原函数
  var args = Array.prototype.slice.call(arguments, 1); // // 在使用 bind 函数时，传入的参数，从第二个参数到最后一个参数  [1, 2, 3]
  var fNOP = function () { };

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments);  // 使用 bind 返回后的函数，传入的参数
    // this instanceof fNOP 为 true 时，说明返回的 fBound 被当做 new 的构造函数使用
    return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs))
  }
  // 维护原型关系
  if (this.prototype) {
    fNOP.prototype = this.prototype;
  }

  fBound.prototype = new fNOP();
  return fBound
}
```