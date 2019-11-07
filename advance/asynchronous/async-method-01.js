/**
 * @description JS 异步
 * 0. 事件模型：最基本的异步编程形式
 * 1. callback：回调地狱，一层套着一层
 * 2. Promise
 * 3. generator
 * 4. async/await
*/

// 事件模型
// 有一个按钮，用户点击这个按钮时，向任务队列（job queue)添加一个任务来响应用户操作，只有当前面的任务都执行完成后才会被执行。
let button = document.getElementById('my-btn')
button.onclick = function (e) {
  console.log('clicked')
}

// 需求：某个元素先从原点出发，向左移动 20px，之后再向上移动 50px，最后再次向左移动 30px，请把运动动画实现出来。(不考虑边界)
// callback 方案
const target = document.getElementById('#target')
target.style.cssText = `position: absolute;left: 0px;top: 0px`

const walk = (direction, distance, callback) => {
  setTimeout(() => {
    let currentLeft = parseInt(target.style.left, 10)
    let currentTop = parseInt(target.style.top, 10)

    const shouldFinish = (direction === 'left' && currentLeft === -distance) || (direction === 'top' && currentTop === -distance)

    if (shouldFinish) {
      // 执行下一个回调
      callback && callback()
    } else {
      if (direction === 'left') {
        currentLeft--
        target.style.left = `${currentLeft}px`
      } else if (direction === 'top') {
        currentTop--
        target.style.top = `${currentTop}px`
      }

      walk(direction, distance, callback)
    }
  }, 20)
}

walk('left', 20, () => {
  walk('top', 50, () => {
    walk('left', 30)
  })
})


// promise 方案
const walk = (direction, distance, callback) => {
  return new Promise((resolve, reject) => {
    const innerWalk = () => {
      setTimeout(() => {
        let currentLeft = parseInt(target.style.left, 10)
        let currentTop = parseInt(target.style.top, 10)

        const shouldFinish = (direction === 'left' && currentLeft === -distance) || (direction === 'top' && currentTop === -distance)

        if (shouldFinish) {
          // 执行下一个回调
          resolve()
        } else {
          if (direction === 'left') {
            currentLeft--
            target.style.left = `${currentLeft}px`
          } else if (direction === 'top') {
            currentTop--
            target.style.top = `${currentTop}px`
          }

          innerWalk(direction, distance, callback)
        }
      }, 20)
    }
    innerWalk()
  })
}

walk('left', 20)
  .then(() => walk('top', 50))
  .then(() => walk('left', 30))


// generator 方案
// 缺点是需要手动执行 gen.next()
function* taskGenerator() {
  yield walk('left', 20)
  yield walk('top', 50)
  yield walk('left', 30)
}
const gen = taskGenerator()
gen.next()
gen.next()
gen.next()


// async 方案
// async/await 就是 generator 的语法糖，它能够自动执行生成器函数，更加方便地实现异步流程。
const task = async function () {
  await walk('left', 20)
  await walk('top', 50)
  await walk('left', 30)
}