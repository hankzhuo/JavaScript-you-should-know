/**
 * @desc 模拟实现一个 call 方法
 * 步骤：
 *  1. 把函数设为该对象的属性
 *  2. 执行该函数
 *  3. 删除该函数
 * 注意点：
 *  1. 多个参数问题，用 arguments 解决
 *  2. this 参数可以传 null，当为 null 的时候，视为指向 window
 */

Function.prototype.call2 = function(context) {
  // 有可能传递 null 的时候，传递 null，传递 null 时候，this 指向 window
  var context = context || window;
  context.fn = this;

  var args = [];
  // i 从 1 开始，因为第一个参数是 context
  for (var i = 1,len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']');
  }
  // 这里 args 会自动调用 Array.toString() => "arguments[1],arguments[2],arguments[3]"
  var result = eval('context.fn('+ args + ')');

  // ES6 方法
  // for (var i = 1,len = arguments.length; i < len; i++) {
  //    args.push(arguments[i]);
  // }
  // var result = context.fn(...args)
  
  delete context.fn;
  return result;
}

var value = 2;

var obj = {
  value: 1
};

function bar(name, age) {
  console.log(name)
  console.log(age)
  console.log(this.value);
  return {
    value: this.value,
    name: name,
    age: age
  } 
}

bar.call2(obj, 'kevin', '18');
// bar.call2(null, 'kevin', '18');


/**
 *@desc 模拟实现一个 apply 方法
 */

Function.prototype.apply = function (context, arr) {
  var context = Object(context) || window;
  context.fn = this;

  var result;
  if (!arr) {
    result = context.fn();
  } else {
    var args = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      args.push('arr[' + i + ']');
    }
    result = eval('context.fn(' + args + ')')
  }

  delete context.fn
  return result;
}