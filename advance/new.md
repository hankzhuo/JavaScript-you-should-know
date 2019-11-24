## 模拟实现一个 new 

new 操作符做了这些事：
- 创建了一个全新对象
- 改变实例的原型对象指向这个构造函数的 prototye
- 执行构造函数，改变 this 指向新对象
- 如果函数没有返回对象类型Object(包含Functoin, Array, Date, RegExg, Error)，那么new表达式中的函数调用将返回该对象引用

```js
function objectFactory () {
  var obj = new Object();
  const Constructor = [].shift.call(arguments) // 第一个参数是构造函数
  
  // 这个对象的 __proto__ 指向构造函数的原型对象
  obj.__proto__ = Constructor.prototype;

  var ret = Constructor.apply(obj, arguments) // this 指向 obj，执行这个构造函数
  return typeof ret === 'object' ? ret : obj;
}



// test
function Otaku (name, age) {
  this.name = name;
  this.age = age;
  this.habit = 'Games';
}

Otaku.prototype.strength = 60;
Otaku.prototype.sayYourName = function () {
  console.log('I am ' + this.name);
}

var person1 = objectFactory(Otaku, 'Kevin', '18')
```