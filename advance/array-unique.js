/**
 * @description 数组去重
 * @方法：
 *    1. 暴力方法，双层循环
 *    2. 使用 indexOf，判断是否存在
 *    3. underScore方法：先判断是否已经排好序，如果有则只需要判断相邻元素是否相等，如果没有则使用 indexOf
 *    4. filter 方法
 *    5. Object 键值对
 *    6. ES6 中 Set 和 Map 数据结构
 */

// 暴力方法，双层循环
function unique(array) {
	var res = [];
	for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
		for (var j = 0, resLen = res.length; j < resLen; j++) {
			// 如果已经有了，就退出循环
			if (array[i] === res[j]) {
				break;
			}
		}
		// 如果是唯一的，上面循环就会执行结束，不会中途退出，此时，可以判断 res 中不存在 array[i]
		if (j === resLen) {
			res.push(array[i]);
		}
	}
	return res;
}

var arr = [ 1, 1, '2', 2 ];
console.log(unique(arr));

//使用 indexOf，判断是否存在
function unique2(array) {
	var res = [];
	for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
		var current = array[i];
		if (res.indexOf(current) == -1) {
			res.push(current);
		}
	}
	return res;
}

console.log(unique2(arr));

// 集合以上特点：排序，使用 indexOf，传入一个函数，对每个元素重新计算
function unique3(array, isSorted, callback) {
	var res = [];
	var seen = [];
	for (var i = 0, arrayLen = array.length; i < arrayLen; i++) {
		var current = array[i];
		var compouted = callback ? callback(current, i, array) : current;
		if (isSorted) {
			if (!i || seen !== value) {
				res.push(current);
			}
			seen = current;
		} else if (callback) {
			if (seen.indexOf(compouted) === -1) {
				seen.push(compouted);
				res.push(compouted);
			}
		} else if (res.indexOf(current) == -1) {
			res.push(current);
		}
	}
	return res;
}

var array3 = [ 1, 1, 'a', 'A', 2, 2 ];
console.log(
	unique3(array3, false, function(item) {
		return typeof item === 'string' ? item.toLowerCase() : item;
	})
);

// filter 方法
function unique4(array) {
	return array.filter((item, index) => {
		return array.indexOf(item) === index;
	});
}

console.log(unique4(array3));

// Object 键值对
var array = [ { value: 1 }, { value: 1 }, { value: 2 } ];

function unique5(array) {
	var obj = {};
	return array.filter(function(item, index, array) {
		return obj.hasOwnProperty(typeof item + JSON.stringify(item))
			? false
			: (obj[typeof item + JSON.stringify(item)] = true);
	});
}

console.log(unique5(array));

// set 和 map
function unique6(array) {
  return [...new Set(array)]
}

function unique7(array) {
  var map = new Map();
  return array.filter(item => !map.has(item) && map.set(item, 1))
}
