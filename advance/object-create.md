## 模拟 Object.create 

```js
function create(proto) {
  function F() {}
  F.prototype = proto;

  return new F();
}
```