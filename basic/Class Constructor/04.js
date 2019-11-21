/**
 * @description 面向对象
 * 1. 工厂模式：优点：解决创建多个相似对象，缺点：没有解决对象识别问题（都是 Object 原型对象）
 * 2. 构造函数：缺点：每个属性、方法都要在实例上重新创建
 * 3. 原型模式：缺点：属性是被所有实例共享，但对于引用类型原型上的属性
 * 4. 构造函数和原型模式结合
 */
// 工厂模式
function createPerson(name, age, job) {
  var o = new Object()
  o.name = name
  o.age = age
  o.job = job
  o.sayName = function() {
    console.log(this.name)
  }
  return o
} 

var person1 = createPerson('TOM', 20, '员工')
var person2 = createPerson('Lily', 18, '学生')



// 构造函数
// 构造函数也是函数，只是调用时候前面加 new 关键字
function CreatePerson(name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.sayName = function() {
    console.log(this.name)
  }
} 

var person1 = new CreatePerson('TOM', 20, '员工')
var person2 = new CreatePerson('Lily', 18, '学生')
// person1 和 person2 都是 CreatePerson 的不同实例，这两个对象都有一个 constructor 属性，都指向 CreatePerson
person1.constructor === CreatePerson  // true
person2.constructor === CreatePerson  // true

// 作为普通函数调用
CreatePerson('Lucy', 30, '医生') // this 指向 window
window.name // Lucy



// 原型模式
// 每个函数创建时候，都有一个 prototye 属性，这个属性指向 Function.prototype 原型对象
// 在默认情况下，所有原型对象都会获得一个 constructor（构造函数）属性，这个属性是一个指向 prototype 属性所在函数的指针
function CreatePerson(name, age, job) {
  this.name = name
  this.age = age
  this.job = job
}
// 上面创建 CreatePerson 后， CreatePerson.prototype.constructor 已经指向 CreatePerson  
CreatePerson.prototype.sayName = function() {
  console.log(this.name)
}
var person1 = new CreatePerson('TOM', 20, '员工')
var person2 = new CreatePerson('Lily', 18, '学生')
// 为实例添加某个属性，获取该属性时候，会忽略原型上同名属性。如果删除了该属性，则又可以重新访问原型同名属性
person1.sayName = 'hi'
person1.sayName // hi  来自实例属性
person2.sayName // Lily  来自原型
delete person1.sayName
person1.sayName  // TOM  来自原型

// 实例中的指针是指向原型，而不是指向构造函数
function CreatePerson() {}
var person = new CreatePerson()
// 创建实例后改变原型对象
CreatePerson.prototype = {
  constructor: CreatePerson,
  name: 'name',
  age: 'age',
  job: 'job',
  sayName: function() {
    console.log(this.name)
  }
}
person.sayName() // Error，重写构造函数原型对象，但实例仍然指向原来的原型
var person2 = new CreatePerson() // 实例 person2 的继承了改变后的原型对象

// 原型对象上属性时引用类型，指向同一个地址
function CreatePerson(name, age, job) {}
CreatePerson.prototype = {
  constructor: CreatePerson,
  friends: ['Jimi', 'wuli'],
  sayName: function() {
    console.log(this.name)
  }
}
var person1 = new CreatePerson()
var person2 = new CreatePerson()
person1.friends === person2.friends // true
person1.friends.push('李磊') // 实例可以向引用类型属性的值操作，但不能改变引用
person2.friends // ['Jimi', 'wuli', '李磊']



// 结合构造函数和原型模式
function CreatePerson(name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.friends = ['Jimi', 'wuli']
}
// 实例的公共属性和方法
CreatePerson.prototype = {
  constructor: CreatePerson,
  sex: 'man',
  sayName: function() {
    console.log(this.name)
  }
}
var person1 = new CreatePerson()
var person2 = new CreatePerson()