## Set 集合
1. 对象所有的属性名都是字符串类型，比如 5 和 '5'，会强制转换成字符串
2. Set 类型是一种**有序列表**，其中包含相互独立的非重复值，不会发生强制转换
   1. Set 构造函数可以接受所有可迭代对象作为参数，如数组、Set 集合、Map 集合
   2. 不能像数组一样，直接访问 Set 集合中某个元素，如果要，则需要先转换成数组
   3. WeekSet 集合只储存对象的弱引用，并不可以存储原始值。只有三种方法：add()、has()、delete()

```js
let set = new Set();
set.add(5);
set.add('5');

let key1 = {}
set.add(key1); // key1 不会被强制转换成 "[object Object]"
set.add(5) // 重复，本次调用直接被忽略 
```

```js
// 可以过滤重复的值
let set2 = new Set([1, 2, 3, 4, 5, 5, 5])
set2.size; // 5
set2.has(2); // true，检测是否存在某个值

set2.delete(2); // true，移除 Set 集合中某一个元素
set2.has(2); // false
set2.clear(); // 移除所有元素
set2.size; // 0 

// forEach 回调前两个参数完全相同，第三个参数等于 set 本身
set.forEach(function(value, key, ownerSet) {
  console.log(value, key, value === key);
  console.log(ownerSet === set);
})
```

```js
// Set 集合中的 this
// forEach 方法中，第二个参数也可以和数组一样，可以用来传递 this
let processor = {
  output(value) {
    console.log(value)
  },
  process(dataSet) {
    dataSet.forEach(function(value) {
      this.output(value);
    }, this)
  }
}
processor.process(set)
```

也可以直接使用箭头函数
```js
let processor = {
  output(value) {
    console.log(value)
  },
  process(dataSet) {
    dataSet.forEach((value) => this.output(value))
  }
}
processor.process(set)
```


将 Set 集合转换为数组，自动去重
```js
let set3 = new Set([1, 2, 3, 4, 5, 5, 5]);
let array = [...set3]; // [1, 2, 3, 4, 5]

let set = new Set(), key = {};
set.add(key);
set.has(key); 
key = null;
set.has(key); // false
[...set][0]; // 还保持着对对象的引用
```

**WeakSet**
```js
let set = new WeakSet(), key = {};
set.add(key);
set.has(key); // true
key = null; // 移除对象 key 的最后一个强引用（WeakSet 中的引用也会自动移除）
set.has(key); // false
```