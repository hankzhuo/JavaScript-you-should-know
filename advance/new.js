/**
 * @desc 模拟实现一个 new 
 * 步骤：
 *  1. 改变实例的原型对象指向
 *  2. 执行构造函数，改变 this 指向
 */

function objectFactory () {
  // 从 Object.prototype上克隆一个对象
  var obj = new Object();
  // 第一个参数是构造函数
  Constructor = [].shift.call(arguments)
  // 这个对象的 __proto__ 指向构造函数的原型对象
  obj.__proto__ = Constructor.prototype;
  var ret = Constructor.apply(obj, arguments)
  return typeof ret === 'object' ? ret || obj : obj;
}

function Otaku (name, age) {
  this.name = name;
  this.age = age;
  this.habit = 'Games';
}

Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function () {
  console.log('I am ' + this.name);
}

var person = new Otaku('Kevin', '18')
var person1 = objectFactory(Otaku, 'Kevin', '18')
