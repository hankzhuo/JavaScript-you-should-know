/**
 *@desc 数组中最大值和最小值
 *@方法：
 *   1. 原始方法，遍历
 *   2. 数组 reduce 方法
 *   3. 排序
 *   4. ES6 扩展运算符
 *   5. 原型链方法
 **/

var arr = [6, 4, 1, 8, 2, 11, 23];
 
// 1.原始方法
var result = arr[0];
for (var i = 1; i < arr.length; i++) {
  result = Math.max(result, arr[i])
}
console.log(result)


// 2. reduce 方法
function max(pre, next) {
  return Math.max(pre, next)
}
console.log(arr.reduce(max))

// 3. 排序
arr.sort(function(a,b) {
  return a - b;
})
console.log(arr[arr.length - 1])

// 4. 扩展运算符
console.log(Math.max(...arr))

// 5. 原型链方法
function getMaxOfArray(arr) {
  return Math.max.apply(null, arr)
}