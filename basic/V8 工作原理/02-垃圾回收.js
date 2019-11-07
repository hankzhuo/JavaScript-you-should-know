/**
 * @description 垃圾回收
 * 1. 垃圾回收分为：手动回收、自动回收
 * 2. **调用栈数据回收**：JavaScript 引擎通过移动 ESP 来销毁该函数保存在栈中的执行上下文（ESP：记录当前执行状态的指针）
 * 3. **堆中数据回收**：
 *    1. V8 中把堆分为**新生代**和**老生代**两个区域：新生代存放时间短的对象，老生带存放时间长的对象。
 *    2. 垃圾回收器分为：**副垃圾回收器**，主要负责新生代的垃圾回收；**主垃圾回收器**，主要负责老生代的垃圾回收
 *    3. **垃圾回收流程**：
 *        1. 先标记空间中活动对象和非活动对象（活动对象指在被引用的对象，非活动对象就是可以被垃圾回收的对象）
 *        2. 回收非活动对象所占据的内存（在完成所有标记后，统一清理内存中所有被标记可回收的对象）
 *        3. 做内存整理（频繁回收对象后，内存中会出现很多不连续的内存空间，这些空间成为**内存碎片**）
 *      1. **副垃圾回收器**：
 *          1. 使用 Scavenge 算法，把新生代区域分为两个区域，一个是对象区域，一个是空闲区域
 *          2. 新加入的对象都会被放入对象区域，当对象区域快被写满时，会执行一次清理操作。
 *          3. 在垃圾回收过程中，首先要对对象区域中的垃圾做标记；标记完成之后，就进入垃圾清理阶段，副垃圾回收器会把这些存活的对象复制到空闲区域中，同时它还会把这些对象有序地排列起来，所以这个复制过程，也就相当于完成了内存整理操作，复制后空闲区域就没有内存碎片了。
 *          4. 完成复制后，对象区域与空闲区域进行角色翻转，也就是原来的对象区域变成空闲区域，原来的空闲区域变成了对象区域。
 *          5. 复制操作需要时间成本，为了执行效率，新生代的空间会被设置的比较小。通常只支持 1 ~ 8M 的容量
 *          6. **对象晋升策略**：经过两次垃圾回收还存在的对象，会被移动到老生区域中
 *      5. **主垃圾回收器**：
 *          1. 采用标记清除整理（Mark-Sweep-Compact）的垃圾算法回收
 * 4. **回收时机**：
 *    1. 为了降低老生代的垃圾回收而造成的卡顿，V8 将标记过程分为一个个的子标记过程，同时让垃圾回收标记和 JavaScript 应用逻辑交替进行，直到标记阶段完成，我们把这个算法称为**增量标记（Incremental Marking）算法**           
 */
// 如图（6、7、8、9）
function foo(){
  var a = 1
  var b = {name:" 极客邦 "}
  function showName(){
    var c = " 极客时间 "
    var d = {name:" 极客时间 "}
  }
  showName()
}
foo()
// 当执 showName 函数执行完成后，JavaScript 会将 ESP 下移到 foo 函数执行上下文，同时销毁 showName 执行上下文

