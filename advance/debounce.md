## 防抖

事件持续触发，但只有等事件停止触发 n 秒后才执行函数

- this 指向
- event 对象
- 结合 setTimeout 来限制执行次数
- immediate 说明是第一次会执行函数，等待 wait 时间后才可以执行下一。默认不传是第一次不执行，等待 wait 时间后才执行函数。

```js
function debounce(func, wait, immediate) {
  var timeout, result;
  var debounced = function () {
    var context = this;
    var args = arguments; // 这里的 arguments 是 getUserAction 函数接受的参数

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;

      // 只要 setTimeout 执行后，就会产生一个值，timeout 有值。这里是做个限制
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);

      if (callNow) result = func.apply(context, args);
    } else {
      timeout = setTimeout(function () {
        result = func.apply(context, args);
      }, wait);
    }

    return result;
  };
  // 如果有 immediate，执行后，立马取消，有可以立马执行了
  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
}
```