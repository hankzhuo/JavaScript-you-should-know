/**
 * @description 继承
 * 1. 使用 extends 继承父类的原型上的方法和属性。使用 super(..args) 继承父类构造函数内属性和方法
 * 2. 继承类中构造函数访问 this 之前一定要调用 super()，它负责初始化 this，如果在调用 super() 之前使用了 this，会报错
 * 3. 如果不使用构造函数，类创建新实例时会自动调用 super(...args)
 * 4. 静态方法也可以被子类继承
 * 5. 只要表达式可以被解析为一个函数并且具有[[Construct]]属性和原型，那么就可以用 extends 进行继承
 */
class Parent {
  constructor(height, age) {
    console.log(new.target === Parent) // 使用 new parent() 创建实例时，打印 true；如果 new Child() 创建实例时，new.target === Child
    this.height = height;
    this.age = age;
  }

  sayAge() {
    console.log(this.age)
  }
}

class Child extends Parent {
  constructor(height, age) {
    // 等价于 Parent.call(this, height, age)，
    super(height, age)
  }
}

const child = new Child(190, 29)
child.sayAge() // 29


// 如果不使用构造函数，类创建新实例时会自动调用 super(...args)
class Child extends Parent {
  
} 
// 等价于
class Child extends Parent {
  constructor(...args) {
    super(...args)
  }
}


// 只要表达式可以被解析为一个函数并且具有[[Construct]]属性和原型，那么就可以用 extends 进行继承
function Parent(height, age) {
  this.height = height;
  this.age = age;
}

Parent.prototype.getAge = function() {
  console.log(this.age)
}

class Child extends Parent {
  constructor(height) {
    super(height, height)
  }
}

const child = new Child(190, 29)
child.sayAge() // 29


// mixin
let SerializeMixin = {
  serialize() {
    return JSON.stringify(this)
  }
}

let AreaMixin = {
  getArea() {
    return this.height * this.width
  }
}

function mixin(...mixins) {
  var base = function() {}
  Object.assign(base.prototype, ...mixins)
  return base
}

class Square extends mixin(SerializeMixin, AreaMixin) { // 动态继承目标 mixin()
  constructor(length) {
    super();
    this.height = length
    this.width = length
  }
}

var x = new Square(3);
console.log(x.getArea())  // 9
console.log(x.serialize()) // {"height":3,"width":3}