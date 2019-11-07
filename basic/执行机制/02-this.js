/**
 * this 的指向，是在调用函数时根据执行上下文动态确定的。
 * 1. 在函数体中，简单调用该函数（非显式/隐式拜定下），严格模式下， this 绑定到 undefined，否则绑定到全局对象 window / global
 * 2. 一般构造函数 new 调用，绑定到新创建的对象上
 * 3. 一般由 call / apply / bind 方法显式调用，绑定到指定的参数的对象上
 * 4. 一般由上下文对象调用，绑定到该对象上
 * 5. 箭头函数中，根据外层上下文绑定的 this 决定 this 指向
 */

 // 题一
 const foo = {
  bar: 10,
  fn: function() {
     console.log(this)
     console.log(this.bar)
  }
}
var fn1 = foo.fn 
fn1()
// 1. fn1 相当于 function() {console.log(this)console.log(this.bar)}
// 2. fn1() 函数执行，是在 window 的上下文中执行的，所以函数内 this 执行了 window


// 题二
const foo = {
  bar: 10,
  fn: function() {
     console.log(this)
     console.log(this.bar)
  }
}
foo.fn()
// 1. 执行 fn 函数时，上下文中，调用者是 foo，所以 this 指向了 foo


// 题三
const person = {
  name: 'Lucas',
  brother: {
      name: 'Mike',
      fn: function() {
          return this.name
      }
  }
}
console.log(person.brother.fn())
// 1. 嵌套关系中，this 指向最后调用它的对象 brother


// 题四
function fn1() {
  console.log('fn1..', this)
  function fn2(){
      console.log('fn2...',this)
  }
  fn2()
}
fn1()
// 都指向了 window


// 题五
const o1 = {
  text: 'o1',
  fn: function() {
      return this.text
  }
}
const o2 = {
  text: 'o2',
  fn: function() {
      return o1.fn()
  }
}
const o3 = {
  text: 'o3',
  fn: function() {
      var fn = o1.fn
      return fn()
  }
}

console.log(o1.fn()) // o1
console.log(o2.fn()) // o1
console.log(o3.fn()) // undefined
// o3.fn() 函数执行后，var fn = o1.fn 执行 fn 后，this 指向了 window


// 题 6
const foo = {  
  fn: function () {  
      setTimeout(function() {  
          console.log(this)
      })
  }  
}  
console.log(foo.fn()) // window


// 题 7
const foo = {  
  fn: function () {  
      setTimeout(() => {  
          console.log(this)
      })
  }  
}  
console.log(foo.fn()) // this 与 fn 函数内 this 是一样的，所以 this 指向 foo
// 箭头函数 this 不适用以上标准规则，而是根据外层(函数或全局)上下文来决定


/**
 * this 的优先级
 * 我们常常把通过 call、apply、bind、new 对 this 绑定的情况称为显式绑定；根据调用关系确定的 this 指向称为隐式绑定。
 */

function foo (a) {
  console.log(this.a)
}
const obj1 = {
  a: 1,
  foo: foo
}
const obj2 = {
  a: 2,
  foo: foo
}

obj1.foo.call(obj2) // 2
obj2.foo.call(obj1) // 1
// call、apply 的显示绑定一般来说优先级比较高


// 题 2
function foo (a) {
  this.a = a
}
const obj1 = {}
var bar = foo.bind(obj1)
bar(2)
console.log(obj1.a) // 2
// 上述代码通过 bind，返回 foo 函数，只是将 bar 函数中的 this 绑定为 obj1 对象

var baz = new bar(3)
console.log(baz.a) // 3
// bar 函数本来已经 bind 到了 obj1 对象上，再通过 new bar() 时，bar 与 obj1 解绑，将 this 绑定到了实例 baz
// new 绑定修改了 bind 绑定中的 this，因此 new 绑定的优先级比显式 bind 绑定更高。


// 题 3
function foo() {
  return a => {
      console.log(this.a)
  };
}
const obj1 = {
  a: 2
}
const obj2 = {
  a: 3
}

const bar = foo.call(obj1)
console.log(bar.call(obj2))
// foo 中 this 指向 obj1，所以 bar 箭头函数 this 也是指向 obj1，所以 obj2 无法被在绑定到 obj2


// 题 4
var a = 123
const foo = () => a => {
  console.log(this.a)
}
const obj1 = {
  a: 2
}
const obj2 = {
  a: 3
}

var bar = foo.call(obj1)
console.log(bar.call(obj2)) // 123