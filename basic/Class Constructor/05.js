/**
 * @description 继承
 */
function SuperType(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green']
}

SuperType.prototype.sayName = function() {
  console.log(this.name)
}

function SubType(name, age) {
  SuperType.call(this, name) // 借用属性和方法
  this.age = age
}

SubType.prototype = Object.create(SuperType.prototype, { // 新生产一个原型对象，赋值给 SubType
  constructor: {
    value: SubType,
    enumerable: false,
    writable: true,
    configurable: true
  },
})
// 不能这么设置，是因为 constructor 只能设置一个
// SubType.prototype = new Object(SuperType.prototype)
// SubType.prototype = SuperType.prototype

SubType.prototype.sayAge = function() {
  console.log(this.age)
}

var instance1 = new SubType('hank', 20)
