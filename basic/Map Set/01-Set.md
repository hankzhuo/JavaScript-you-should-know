## Set 集合

### 语法

> new Set([iterable])

如果传递一个可迭代对象，它的所有元素将不重复地被添加到新的 Set 中。如果不指定此参数或其值为 `null`，则新的 Set为空。

### 特点

1. Set 对象是值的集合，你可以按照插入的顺序迭代它的元素。 Set中的元素只会出现一次，即 Set 中的元素是唯一的。
2. `NaN` 和 `undefined` 都可以被存储在 Set 中， NaN之间被视为相同的值。其他都是按照 === 来判断是否相同
3. 所有 Set 实例继承自 `Set.prototype`


例子 1
```js
let mySet = new Set();
mySet.add(1);
mySet.add(5);
mySet.add(5); // 忽略重复元素
mySet.add('5'); // Set [1, 5, "5"]

let o = {a: 1, b: 2};
mySet.add(o);
mySet.add({a: 1, b: 2}); // 与 o 对象不是指向同一个对象

mySet.has(1); // true
mySet.has(o); // true

mySet.size; // 5

mySet.delete(5);
mySet.has(5); // false

// for...of 循环
for (let item of mySet) {
  console.log(item)
}

for (let key of mySet.keys()) {
  console.log(key)
}

for (let value of mySet.values()) {
  console.log(value)
}

// key 和 value 值一样
for (let [key, value] of mySet.entries()) {
  console.log(key, value)
}

// 用forEach迭代
mySet.forEach(function(value) {
  console.log(value);
});

// 使用 `Array.from` 转换 Set为 Array
let myArr = Array.from(mySet); // [1, "5", {...}, {...}]

// 使用预算符转换为 Array
[...mySet] // [1, "5", {...}, {...}]

```

例子 2
```js
let text = 'India';
let mySet = new Set(text);

mySet; // {"I", "n", "d", "i", "a"}
```