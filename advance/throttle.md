## 节流

如果持续触发时间，每隔一段时间，只执行一次事件。

注意点：
- 两种实现方式：使用时间戳和设置定时器
- 时间戳：超过设置时间，触发执行。特点：第一次会立马执行，最后面不会执行
- 设置定时器：如果定时器存在就不执行，直到定时器执行完后，清空定时器后，在设置下个定时器。
- leading：false 表示禁用第一次执行。trailing: false 表示禁用停止触发的回调。两个一般不会同时设置

```js
function throttle(func, wait, options) {
  var timeout, result, args, context;
  var previous = 0;
  if (!options) options = {};

  var later = function () {
    previous = options.leading === false ? 0 : +new Date();
    timeout = null;
    func.apply(context, args);
  };

  var throtted = function () {
    var now = +new Date();
    if (!previous && options.leading === false) previous = now;
    // 下次触发 func 剩余时间
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    // 前后时间超过了设置时间或者修改了系统时间（now < previous）
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = null;
      previous = now;
      func.apply(context, args);
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
  };

  return throtted;
}
```