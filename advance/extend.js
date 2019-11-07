/**
 * @description extend 复制其他对象内容到目标对象中
 * @方法：
 *    1. 第一个参数判断为是否深拷贝
 *    2. 
 */

var class2type = {};
var toString = class2type.toString;
var hasOwn = class2type.hasOwnProperty;

function isPlainObject(obj) {
  var proto, Ctor;
  if (!obj || toString.call(obj) !== "[object Object]") {
      return false;
  }
  proto = Object.getPrototypeOf(obj);
  if (!proto) {
      return true;
  }
  Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
  return typeof Ctor === "function" && hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object);
}

function extend() {
  var name, options, src, copy;
  var i = 1, length = arguments.length;
  // 默认不深拷贝
  var deep = false;
  // 第一个参数不传布尔值的情况下，target默认是第一个参数
  var target = arguments[0] || {};

  // 如果第一个参数是布尔值，第二个参数是才是target
  if (typeof target == 'boolean') {
    deep = target;
    target = arguments[i] || {};
    i++
  }

  if (typeof target !== 'object') {
    target = {}
  }
  // 循环遍历要复制的对象
  for (; i < length; i++) {
    options = arguments[i];

    if (options !== null) {
      for (name in options) {

        src = target[name]
        copy = options[name];

        // 解决循环引用
        if (target === copy) {
          continue;
        }

        // 深拷贝，递归调用
        if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
          // 要复制的对象属性值类型需要与目标属性值相同
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && Array.isArray(src) ? src : [];
          } else {
            clone = src && isPlainObject(src) ? src : {};
          }

          target[name] = extend(deep, clone, copy);
        }
        else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }

  return target;
}

var a = extend(true, [4, 5, 6, 7, 8, 9], [1, 2, 3]);
console.log(a)

var obj1 = {
  value: {
    3: 1
  }
}

var obj2 = {
  value: [5, 6, 7],
}

var b = extend(true, obj1, obj2)
var c = extend(true, obj2, obj1)
console.log(b)
console.log(c)