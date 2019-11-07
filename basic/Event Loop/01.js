/**
 * @description 事件循环机制
 * 1. 渲染主线程采用**事件循环系统**运行
 * 2. **消息队列**，存放要执行的任务，主线程会循环会从消息队列中取出队列头部的任务并执行任务
 *    1. 消息队列任务类型：
 *        1. 渲染事件（如解析 DOM、计算布局、绘制）
 *        2. 用户交互事件（如鼠标点击、滚动页面、放大缩小等）
 *        3. JavaScript 脚本执行事件
 *        4. 网络请求完成、文件读写完成事件
 * 3. **IO 线程**中产生的新任务添加进消息队列的尾部，IO 线程可以接收其他进程传来的消息，接收这些消息后，会包装成任务发给消息队列
 *
 *
 * @description 页面使用单线程的缺点
 * 1. **如何处理高优先级的任务**
 *    1. 消息队列中任务分为：**宏任务**、**微任务**。
 *    2. 宏任务主要功能都直接完成之后，渲染引擎并不急着运行下一个宏任务，而是执行当前宏任务中的微任务。
 *    3. **延时队列**，定时器就是把事件保存在延时队列中。渲染引擎处理完一个宏任务之后，会开始查看延时队列中到期的任务，然后依次执行这些到期任务，执行完后，再继续下一个循环过程。
 * 2. **解决单个任务执行时间过长的问题**
 *    1. 如果某个 JavaScript 任务执行过久，占用主线程，造成动画卡帧现象。所以可以通过**回调**形式来规避
 *
 *
 * @description 异步回调
 * 1. 把异步回调函数封装成一个任务，添加到消息队列尾部，当循环系统执行到该任务的时候执行回调函数。比如 **setTimeout**、**XMLHttpRequest** 回调
 * 1. 使用 setTimeout 的问题
 *    1. 如果当前任务执行时间过长，会影响定时器任务的执行
 *    2. 如果 setTimeout 存在嵌套，系统会设置最短时间间隔 4 毫秒
 *    3. 未激活的页面，setTimeout 执行最短时间为 1000 毫秒
 *    4. 延时执行时间有最大值，最大值为 2147483647 毫秒，大于这个时间，会溢出立即执行
 */

// setTimeout 执行时间过久
function bar() {
  console.log("bar");
}
function foo() {
  setTimeout(bar, 0);
  for (let i = 0; i < 5000; i++) {
    let i = 5 + 8 + 8 + 8;
    console.log(i);
  }
}
foo();

/**
 * @description 微任务
 *  1. 微任务可以在实时性和效率之间做一个平衡。常见的微任务有 **MutationObserve、Promise**
 *  2. 微任务就是一个异步执行的函数，执行时机是在主函数执行结束之后、宏任务结束之前
 *  3. 在创建全局执行上下文的同时，V8 引擎也会在内部创建一个微任务队列。这个微任务队列是用来存放微任务，因为当前宏任务执行的过程中，会产生多个微任务。
 *  4. **微任务分类**：
 *    1. 第一种方式是使用 MutationObserver 监控某个 DOM 节点，然后再通过 JavaScript 来修改这个节点，或者为这个节点添加、删除部分子节点，当 DOM 节点发生变化时，就会产生 DOM 变化记录的微任务。
 *    2. 第二种方式是使用 Promise，当调用 Promise.resolve() 或者 Promise.reject() 的时候，也会产生微任务。
 *  5. 宏任务和微任务是绑定的，每个宏任务在执行时，会创建自己的微任务队列
 *  6. 微任务的执行时长会影响当前宏任务的时长，比如一个宏任务在执行过程中，产生了 100 个微任务，执行每个微任务的时间是 10 毫秒，那么执行这 100 个微任务的时间就是 1000 毫秒，也可以说这 100 个微任务让宏任务的执行时间延长了 1000 毫秒。所以你在写代码的时候一定要注意控制微任务的执行时长。
 *  7. 在一个宏任务中，分别创建一个用于回调的宏任务和微任务，无论什么情况下，微任务都早于宏任务执行。
 *  8. **Promise** 与微任务
 *    1. Promise 采用**回调延时绑定**技术，调用 resolve/reject 函数调用时，promise.then() 设置 onResolve 回调函数，会把整个执行放到微任务中，等待宏任务执行完后在执行。
 */

// 执行顺序
function executor(resolve, reject) {
  let rand = Math.random();
  console.log(1);
  console.log(rand);
  if (rand > 0.5) resolve();
  else reject();
}
var p0 = new Promise(executor);
var p1 = p0.then(value => {
  console.log("succeed-1");
  return new Promise(executor);
});
var p3 = p1.then(value => {
  console.log("succeed-2");
  return new Promise(executor);
});
var p4 = p3.then(value => {
  console.log("succeed-3");
  return new Promise(executor);
});
p4.catch(error => {
  console.log("error");
});
console.log(2);

/**
 * @description generator
 * 1. 生成器函数是一个带星号函数，而且是可以暂停执行和恢复执行的。
 * 2. 在生成器函数内部执行一段代码，如果遇到 yield 关键字，那么 JavaScript 引擎将返回关键字后面的内容给外部，并暂停该函数的执行。
 * 3. 外部函数可以通过 next 方法恢复函数的执行
 * 4. 一个线程上可以存在多个**协程**，但是在线程上同时只能执行一个协程，比如当前执行的是 A 协程，要启动 B 协程，那么 A 协程就需要将主线程的控制权交给 B 协程，这就体现在 A 协程暂停执行，B 协程恢复执行；同样，也可以从 B 协程中启动 A 协程。通常，如果从 A 协程启动 B 协程，我们就把 A 协程称为 B 协程的父协程。
 */

function* genDemo() {
  console.log("开始执行第一段");
  yield "generator 2";

  console.log("开始执行第二段");
  yield "generator 2";

  console.log("开始执行第三段");
  yield "generator 2";

  console.log("执行结束");
  return "generator 2";
}

console.log("main 0");
let gen = genDemo();
console.log(gen.next().value);
console.log("main 1");
console.log(gen.next().value);
console.log("main 2");
console.log(gen.next().value);
console.log("main 3");
console.log(gen.next().value);
console.log("main 4");
// 执行步骤：
// 通过调用生成器函数 genDemo 来创建一个协程 gen，创建之后，gen 协程并没有立即执行。
// 要让 gen 协程执行，需要通过调用 gen.next。
// 当协程正在执行的时候，可以通过 yield 关键字来暂停 gen 协程的执行，并返回主要信息给父协程。
// 如果协程在执行期间，遇到了 return 关键字，那么 JavaScript 引擎会结束当前协程，并将 return 后面的内容返回给父协程。

// 注意：
// 第一点：gen 协程和父协程是在主线程上交互执行的，并不是并发执行的，它们之前的切换是通过 yield 和 gen.next 来配合完成的。
// 第二点：当在 gen 协程中调用了 yield 方法时，JavaScript 引擎会保存 gen 协程当前的调用栈信息，并恢复父协程的调用栈信息。同样，当在父协程中执行 gen.next 时，JavaScript 引擎会保存父协程的调用栈信息，并恢复 gen 协程的调用栈信息。


/**
 * @description async/await
 * 1. async 是一个通过异步执行并隐式返回 Promise 作为结果的函数。
 * 2. await 实际上是调用 new Promise()
 */

async function foo() {
  console.log(1);
  let a = await 100;
  console.log(a);
  console.log(2);
}
console.log(0);
foo();
console.log(3);
// 当执行到await 100时，会默认创建一个 Promise 对象，相当于下面代码
// let promise_ = new Promise((resolve,reject){
// resolve(100)
// })


async function foo() {
  console.log("foo");
}
async function bar() {
  console.log("bar start");
  await foo();
  console.log("bar end");
}
console.log("script start");
setTimeout(function() {
  console.log("setTimeout");
}, 0);
bar();
new Promise(function(resolve) {
  console.log("promise executor");
  resolve();
}).then(function() {
  console.log("promise then");
});
console.log("script end");
