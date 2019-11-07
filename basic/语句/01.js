/**
 * 循环语句
 * 1. while
 * 2. do...while：先执行一次 do 语句，当 while 中条件满足时，继续执行 do 语句，直到不满足
 * 3. for 循环，包括三部分：初始化、条件、更新，用分号隔开
 * 4. for/in 循环，只能枚举可枚举属性
 * 5. break 语句，循环体内使用，立即退出最内层循环或 switch 语句
 * 6. continue 语句，循环体内使用，不执行当次 continue 后面的语句，执行下一次循环
 * 7. return 语句，函数内使用，返回某个值
 * 8. throw 语句，抛出异常，解释器会立即停止当前正在执行的逻辑，并跳转至就近的异常处理程序
 * 9. try/catch/finally 语句
 */

// while
var count = 0;
while (count < 10) {
  console.log(count)
  count++
}


// do...while
var i = 0
do {
  i++
  console.log(i)
} while (i < 10);

// 等价于 while 循环
for (var i = 0; i < 10; i++) {
  console.log(i)
}


// for 循环，多个变量
var i, j, sum = 0;
for (i = 0, j = 10; i < 10; i++, j--) {
  sum += i * j
}
console.log(sum)


// for/in 循环
var o = {x: 1, y: 2, z: 3}
var a = [], i = 0;
for (a[i++] in o); // 将 o 属性名赋值给变量 a[i++]


// break 语句
for (var i = 0; i < 10; i++) {
  if (i == 5) break;
  console.log(i)
}

// throw 语句
function factorial(x) {
  if (x < 0) throw new Error('x 不能为复数')
  var i, j, sum = 0;
  for (i = 0, j = 10; i < 10; i++, j--) {
    sum += i * j
  }
  return sum
}
factorial(-1)


// try/catch/finally 语句
try {
  // 这里代码通常是正常执行，再执行 finally 语句
  // 当抛出异常时，catch 语句捕获异常，执行完 catch 语句块后，在执行 finally
  throw new Error('发生异常了')
} catch (e) {
  // 只有 try 抛出异常时，这里才会执行
  // 这里可以处理异常，也可以忽略
  // 这里还可以抛出新异常
  console.log('catch...', e) // catch... Error: 发生异常了
} finally {
  // 不管是 try 语句块否抛出异常，这里都会执行
  // 抛出异常，异常被 catch 捕获，如果没有被捕获，继续往上传播
}

function fn() {
  try {
    throw new Error('发生异常了')
  } finally {
    return 1; // try 抛出异常了，这里还是可以返回 1
  }
}

fn() // 1