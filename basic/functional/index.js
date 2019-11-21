// 流水式代码，每次执行都要重新写一遍
var arr1 = [1,2,3]
var arr2 = []
for (var i =0; i< arr1.length; i++) {
  arr2.push(arr1[i] * 2)
}

console.log('arr2....', arr2)

// 函数式编程一
function mapForEach(arr, fn) {
  var newArr = []
  for (var i =0; i< arr.length; i++) {
    newArr.push(
      fn(arr[i])
    )
  }
  return newArr
}

var arr3 = mapForEach(arr1, function(item) {
  return item * 2
})

console.log('arr3....', arr3)

var arr4 = mapForEach(arr1, function(item) {
  return item > 1
})

console.log('arr4....', arr4)

var checkPastLimitSimplified = function(limiter, item) {
  return function(limiter, item) {
    return item > limiter
  }.bind(this, limiter)
}

var arr5 = mapForEach(arr1, checkPastLimitSimplified(2))
console.log('arr5....',arr5)