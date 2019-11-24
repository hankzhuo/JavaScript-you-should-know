## 节流

规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。

适用场景：
- 拖拽场景：固定时间内只执行一次，防止超高频次触发位置变动
- 缩放场景：监控浏览器resize
- 动画场景：避免短时间内多次触发动画引起性能问题

简单版：
```js
const throttle = function(fn, delay=500) {
  let flag = true;
  return (...args) => {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, args);
      flag = true;
    }, delay);
  }
}

```

underscore 版：
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