## Map 集合

### 语法

> new Map([iterable])

iterable 是一个数组或其他 iterable 对象。`null` 会被当做 `undefined`。

### 特点

1. Map 类型是一种**储存着许多键值对的有序列表**，键名和对应的值支持所有数据结构（NaN 在键中是与 NaN 相等的，虽然它们不相等），剩下的值都是按照 === 运算符判断，健名是唯一的
2. Map 对象插入键值对，能够记住原始插入的顺序，当对它进行遍历时，Map 对象是按插入的顺序返回键值


### 例子

例子 1
```js
let myMap = new Map();
let keyObj = {};
let keyFunc = function() {};
let keyString = 'a string';

// 添加健
myMap.set(keyString, "和键'a string'关联的值");
myMap.set(keyObj, "和键keyObj关联的值");
myMap.set(keyFunc, "和键keyFunc关联的值");
myMap.set(undefined, "undefined 值");
myMap.set(NaN, "not a number");

myMap.size;

// 读取值
myMap.get(keyObj);
myMap.get(keyString);
myMap.get(keyFunc);
myMap.get('a string'); // "和键'a string'关联的值"
myMap.get({}); // undefined，因为 keyObj !== {}
myMap.get(function() {}); // undefined, 因为 keyFunc !== function () {}
myMap.get(undefined); // "undefined 值"
myMap.get(NaN); // "not a number"

myMap.has(NaN); // true

myMap.delete(NaN);  // true

// myMap.clear(); // undefined

// for...of 循环
for (let [key, value] of myMap) {
  console.log(key, value)
} 

// 返回一个新的 Iterator对象， 它按插入顺序包含了Map对象中每个元素的键 。
for (let key of myMap.keys()) {
  console.log(key)
} 

// 返回一个新的Iterator对象，它按插入顺序包含了Map对象中每个元素的值 
for (let value of myMap.values()) {
  console.log(key)
} 

for (let [key, value] of myMap.entries()) {
  console.log(key, value);
}

// forEach 
myMap.forEach(function(key, value) {
  console.log(key, value);
})
```


例子 2
```js
let kvArray = [["key1", "value1"], ["key2", "value2"]];
let myMap2 = new Map(kvArray);

myMap2.get("key1"); // value1

// 使用 Array.from 函数可以将一个Map对象转换成一个二维键值对数组
Array.from(myMap2); // [["key1", "value1"], ["key2", "value2"]]

// 使用运算符，把 Map 对象转换为二维数组
[...myMap2];
```

例子 3
```js
let first = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

let second = new Map([
  [1, 'uno'],
  [2, 'dos']
]);

// 合并两个Map对象时，如果有重复的键值，则后面的会覆盖前面的。
// 展开运算符本质上是将 Map对象转换成数组。
let merged = new Map([...first, ...second]);

console.log(merged.get(1)); // uno
console.log(merged.get(2)); // dos
console.log(merged.get(3)); // three
```