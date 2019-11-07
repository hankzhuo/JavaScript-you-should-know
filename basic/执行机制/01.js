/**
 * @description 执行机制
 * 1. 在 JavaScript 代码执行过程中，需要先做变量和函数声明提升，而之所以需要实现提升，是因为 JavaScript 代码在执行之前需要先编译
 * 2. 在**编译阶段**，变量和函数会被放入变量环境中，变量默认值会被只设置成 undefined。在代码**执行阶段**，JavaScript 引擎会从变量环境中去查找自定义的变量和函数。
 * 3. 如果在编译阶段，存在两个相同的函数，那么最终存放在变量环境中的是最后定义的那个，这是因为后定义的会覆盖掉之前定义的。
 */

showName()
console.log(myname)
var myname = '极客时间'
function showName() {
    console.log('函数 showName 被执行');
}
// 上面执行步骤：
// 第一步：编译阶段，会创建全局执行上下文，由于 JavaScript 引擎会把 var myname 变量和 showName 函数提升，并放入变量环境中，并给 myname 赋值 undefined。
// 第二步：执行阶段，执行 showName 函数和给 myname 变量赋值


/**
 * @description 调用栈
 * 1. 调用栈是 JavaScript 引擎追踪函数执行的一个机制
 * 2. 调用栈是有一定大小的，当入栈的执行上下文超过了一定数目，JavaScript 会抛出**栈溢出**错误（Stack Overflow）。
 */
var a = 2
function add(b, c) {
    return b + c
}
function addAll(b, c) {
    var d = 10
    result = add(b, c)
    return a + result + d
}
addAll(3, 6)
// 上面代码执行步骤：
// 第一步：创建全局上下文，将其压入栈底
// 第二步：调用 addAll 函数，JavaScript 编译器会编译该函数，并为其创建执行上下文，将该上下文压入栈中
// 第三步：执行到 add 函数语句时，同样会为其创建执行上下文，并压入栈中。
// 第四步：当 add 函数返回时，该函数的执行上下文会从栈顶弹出，并将 result 值设为 9。
// 第五步：当 addAll 函数返回时，该函数的执行上下文会从栈顶弹出，此时调用栈中只剩下全局上下文了（并不会弹出），执行结束。


/**
 * @description 块级作用域
 * 1. 作用域是变量和函数的可访问范围，即作用域控制着变量和函数的可见性和生命周期
 * 2. ES6 之前是没有块级作用域，只存在全局作用域和函数作用域：
 * 3. **全局作用域**中的对象在代码中的任何地方都能访问到，其生命周期伴随着页面的生命周期
 * 4. **函数作用域**：在函数内部定义的变量或函数，只能在函数内部被访问。函数执行结束之后，函数内部定义的变量会被销毁
 * 5. **let** 和 **const** 关键字是支持块级作用域的
 */
// 下面这些在 ES5 之前都是不存在作用域的
//if 块
if (1) { }
//while 块
while (1) { }
//for 循环块
for (let i = 0; i < 100; i++) { }
// 单独一个块
{ }

function foo() {
    for (var i = 0; i < 7; i++) {
    }
    console.log(i);
}
foo() // i: 7   


function foo() {
    var a = 1
    let b = 2
    {
        let b = 3
        var c = 4
        let d = 5
        console.log(a)
        console.log(b)
    }
    console.log(b)
    console.log(c)
    console.log(d)
}
foo()
// 执行步骤：
// 第一步：编译并创建执行上下文
//    1. 函数内部通过 var 声明的变量，在编译阶段全都放到变量环境里
//    2. 通过 let 声明的变量，被放到词法环境中 
//    3. {} 里面，通过 let 声明的变量没有被放到词法环境中
// 第二步：执行代码
//    1. 变量环境中 a 赋值 1，词法环境中 b 赋值 2   
//    2. 进入 {} 中，通过 let 声明的 b 和 d 变量，会被放到词法环境中另一个区域中，不会和之前 b 相同区域

// 在词法环境中，维护了一个小型的栈结构，栈底是函数最外层的变量，进入一个块级作用域后，就会把该作用域内的变量压入栈顶，当作用域执行完毕后，该作用域信息就会被从栈顶弹出。

// 在块级作用域内，let 声明的变量被提升，但变量只是创建被提升，初始化并没有被提升，在初始化之前使用的变量，会形成一个暂时性死区。
let myname = '极客时间'
{
    console.log(myname) // 报错，VM1061:3 Uncaught ReferenceError: Cannot access 'myname' before initialization
    let myname = '极客邦'
}


/**
 * @description 作用域链、闭包
 * 1. 每个执行上下文的变量环境中，都包含了一个外部引用，用来指向外部的执行上下文，这个外部引用叫作 outer。
 * 2. **词法作用域**就是指作用域是由代码中函数声明的位置来决定的，与何时执行无关，所以词法作用域是**静态的作用域**。
 * 3. 在 JavaScript 中，根据词法作用域的规则，内部函数总是可以访问其外部函数中声明的变量，当通过调用一个外部函数返回一个内部函数后，即使该外部函数已经执行结束了，但是内部函数引用外部函数的变量依然保存在内存中，我们就把这些变量的集合称为**闭包**。
 * 4. **闭包回收**：如果引用闭包的函数是一个全局变量，那么闭包会一直存在直到页面关闭；但如果这个闭包以后不再使用的话，就会造成内存泄漏。如果引用闭包的函数时局部变量，等函数执行完毕后，在下次 JavaScript 引擎执行垃圾回收时，会回收这个闭包。
 * 5. 如果该闭包会一直使用，那么它可以作为全局变量而存在；但如果使用频率不高，而且占用内存又比较大的话，那就尽量让它成为一个局部变量。
 */
// 作用域链
// foo 函数和 bar 函数的 outer 都指向全局作用域（如图 7）
function bar() {
    console.log(myName)
}
function foo() {
    var myName = " 极客邦 "
    bar()
}
var myName = " 极客时间 "
foo()


// 块级作用域中变量查找（如图 9）
function bar() {
    var myName = " 极客世界 "
    let test1 = 100
    if (1) {
        let myName = "Chrome 浏览器 "
        console.log(test)
    }
}
function foo() {
    var myName = " 极客邦 "
    let test = 2
    {
        let test = 3
        bar()
    }
}
var myName = " 极客时间 "
let myAge = 10
let test = 1
foo()


// 闭包（如图 10、11）
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
bar.getName() // 调用 bar.getName() 时，JavaScript 引擎会沿着”当前执行上下文（Local） -> 闭包 Closure（foo） -> 全局执行上下文（Global）“的顺序查找 myName 变量。
console.log(bar.getName())
// 内部函数引用外部函数变量时，JavaScript 引擎会判断这是一个闭包，于是在堆空间创建一个“closure(foo)”的对象，用来保存 myName 变量


/**
 * @description this
 * 1. 每个执行环境都有一个 this
 * 2. 在全局环境中调用一个函数，函数内部 this 指向全局变量 window
 * 3. 通过一个对象来调用内部的一个方法，该方法的执行上下文中 this 指向对象本身
 */
// 嵌套函数中的 this 不会从外层函数中继承
var myObj = {
    name: " 极客时间 ",
    showThis: function () {
        console.log(this) // 指向 myObj
        function bar() { console.log(this) } // 指向 window
        const foo = () => {console.log(this)} // 指向 myObj，箭头函数不会创建执行上下文，所以箭头内部 this 指向它的外层函数
        bar()
    }
}
myObj.showThis()
