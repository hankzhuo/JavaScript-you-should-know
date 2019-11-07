/**
 * **静态语言和动态语言**：
 *    1. 在运行过程中需要检查数据类型的语言成为**动态语言**；
 *    2. 在使用之前就需要确认其变量数据类型的语言成为**静态语言**
 * **弱类型语言和强类型语言**：
 *    1. 支持隐形类型转换的语言成为弱类型语言。比如 C 和 JavaScript
 *    2. 不支持隐形类型转换的语言成为强类型语言。比如 Java 和 Go
 *
 *  1. JavaScript 是一种弱类型、动态型、解释型语言
 *    1. **数据类型**：原始类型：Undefined、Null、String、Boolean、Number、Symbol、BigInt；引用类型：Object 
 *    2. **栈空间**通常不会设置太大，主要用来存放一些原始类型的数据；**引用类型**占用空间比较大，一般放在堆内存中，不过缺点就是分配内存和回收内存会占用一定时间。
 *    3. 原始类型的赋值会完整复制变量值，而引用类型的赋值是赋值引用类型
 *  2. 所有的数据放在栈空间不可以么？
 *    不可以的，JavaScript 引擎需要用栈来维护程序执行上下文的状态，如果栈空间太大的话，所有数据都放在栈空间，会影响上下文切换效率，进而影响程序效率。
 */

function foo(){
  var a = " 极客时间 "
  var b = a
  var c = {name:" 极客时间 "}
  var d = c
}
foo()
// 变量 a 和 b foo 存在于 foo 执行上下文中的变量环境中
// 变量 c 在调用栈中只保存着对象引用地址，引用类型的数据是存放在“堆”中


function foo() {
  var myName = " 极客时间 "
  let test1 = 1
  const test2 = 2
  var innerBar = {
      getName: function () {
          console.log(test1)
          return myName
      },
      setName: function (newName) {
          myName = newName
      }
  }
  return innerBar
}
var bar = foo()
bar.setName(" 极客邦 ")
bar.getName() 
console.log(bar.getName())
// 调用 bar.getName() 时，JavaScript 引擎会沿着”当前执行上下文（Local） -> 闭包 Closure（foo） -> 全局执行上下文（Global）“的顺序查找 myName 变量。
// 内部函数引用外部函数变量时，JavaScript 引擎会判断这是一个闭包，于是在堆空间创建一个“closure(foo)”的对象，用来保存 myName 变量
