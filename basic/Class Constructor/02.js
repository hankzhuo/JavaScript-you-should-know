/**
 * @description 类表达式
 * 1. 访问器属性
 * 2. 可计算名称，访问器属性也支持可计算名称
 * 3. 生成器方法
 * 4. 静态方法
 */
let methodName = 'sayName2'
let PersonClass = class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name)
  }

  get html() {
    return this.name
  }

  set html(value) {
    this.name = value
  }

  // 可计算名称
  [methodName]() {
    console.log(this.name)
  }

  // 生成器方法
  *createItertor() {
    yield 1;
    yield 2;
  }

  // 静态方法
  static create(name) {
    return new PersonClass(name)
  }
}

let person = new PersonClass('hank')
person.sayName()

Object.getOwnPropertyDescriptor(PersonClass.prototype, 'html')  // { configurable: true, enumerable: false, get: ƒ, set: ƒ}
let itertor = person.createItertor()
itertor.next() // {value: 1, done: false}
itertor.next() // {value: 2, done: false}
itertor.next() // {value: undefined, done: true}

console.log(PersonClass.name) // PersonClass
PersonClass.name = 'hank' // 设置无效
console.log(PersonClass.name) // PersonClass


// 命名类表达式
let PersonClass2 = class PersonClass3 {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name)
  }
}
console.log(typeof PersonClass2) // 'function'
console.log(typeof PersonClass3) // undefined，PersonClass3 只能类内部使用

// 等价于下面
let PersonClass2 = (function () {
  "use strict"

  const PersonClass3 = function (name) {
    if (typeof new.target === undefined) {
      throw new Error('必须通过关键字 new 调用')
    }
    this.name = name
  }

  Object.defineProperty(PersonClass3.prototype, 'sayName', {
    value: function () {
      if (typeof new.target !== "undefined") {
        throw new Error('不能用通过关键字 new 调用')
      }
      console.log(this.name)
    },
    enumerable: false,
    writable: true,
    configurable: true
  })

  return PersonClass3
})


// 立即调用类
let person1 = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name)
  }
}('hank')
console.log(person1.sayName()) // hank