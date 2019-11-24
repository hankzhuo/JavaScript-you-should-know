## 模拟实现 instanceof

instanceof 运算符于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

```js
// 模拟 instanceof
function instance_of(L, R) {
  //L 表示左表达式，R 表示右表达式
  var O = R.prototype; // 取 R 的显示原型
  L = L.__proto__; // 取 L 的隐式原型
  while (true) {
    if (L === null) return false;
    if (O === L) {
      return true;
    }
    L = L.__proto__;
  }
}
```