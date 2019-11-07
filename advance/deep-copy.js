/**
 * @description 深拷贝
 * @方法：
 *    1. 判断属性类型，如果是引用类型，则递归
 */

 function deepClone(obj) {
    if (typeof obj !== 'object') return obj;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
      }
    }
    return newObj;
 }

 var obj = [{a: 1}, {b: 1, c: {a: 1}}, [1,2]]

console.log(deepClone(obj))