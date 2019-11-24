## 防抖

在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。

适用场景：
- 按钮提交场景：防止多次提交按钮，只执行最后一次提交
- 服务端验证场景：表单验证需要服务端配合，只执行一段连续的输入事件的最后一次，还有搜索联想词功能类似

简单版：
```js
const debounce = function(fn, delay) {
  let timer = null;
  return (...args) => {
    clearTimout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
```

underscore 版：
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