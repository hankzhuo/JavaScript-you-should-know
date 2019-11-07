/**
* @desc 数组扁平化，核心思想就是递归
* @params {array} 数组，{shallow} boolean 是否只扁平一层
* @步骤：
*   1. 遍历数组
*   2. 对数组每一项遍历是否为数组，如果是数组，则递归
*   3. 返回这个值
*/

function _flatten(input, shallow, output) {
  output = output || [];
  var idx = output.length;

  for (var i = 0; i < input.length; i++) {
    var value = input[i];
    if (Array.isArray(value)) {

      if (shallow) {
        var j = 0, len = value.length;
        while (j < len) output[idx++] = value[j++];
      } else {
        _flatten(value, shallow, output);
      }
    } else {
      output[idx++] = value;
    }
  }

  return output;
}

function flatten(input, shallow) {
  return _flatten(input, shallow);
}

var arr1 = flatten([1, [2], [3, [[4]]]]);
console.log('faltten:', arr1);
// faltten: [ 1, 2, 3, 4 ]

var arr2 = flatten([1, [2], [3, [[4]]]], true);
console.log('faltten:shadow', arr2);
// faltten:shadow [ 1, 2, 3, [ [ 4 ] ] ]