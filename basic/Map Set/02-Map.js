/**
 * @description Map 集合
 * 1. **Map 类型**是一种**储存着许多键值对的有序列表**，键名和对应的值支持所有数据结构
 *    1. Map 方法和 Set 差不多，添加 set、get、delete、forEach 等
 *    2. WeakMap 集合只储存对象的弱引用，并不可以存储原始值。键名必须是一个对象（第一个元素的键名必须是非 null 对象），如果在弱引用之外不存在其他强引用，引擎的垃圾回收机制会回收这个对象，同时也会移除集合中的键值对
 *    3. WeakMap 只有 has、delete、set、get 方法，没有 size 方法
 */

let map = new Map();
map.set('Hello', 'World')
map.set('year', 2016)
map.get('Hello'); // 'World'

let key1 = {};
let key2 = {};
map.set(key1, 5);
map.set(key2, 10);
map.get(key1); // 5
map.get(key2); // 10

// 可以接受数组初始化一个 Map 集合
let map = new Map([['name', 'hank'], ['age', 30]])
map.has('age'); 30
map.size; // 2