//1.instanceof
  //instanceof只可以正确判断引用数据类型，无法判断基本数据类型
  //原理：判断在其原型链中能否找到该类型的原型
  //手写一个instanceof
  function _instanceof(left,right){  //目标对象与指定对象
    if(typeof left !== 'object' || typeof left === null){
      return false;
    }
    let proto = Object.getPrototypeOf(left)
    while(true){
      if(proto === null){  //到最顶层了
        return false
      }
      if(proto === right.prototype){
        return true
      }
      proto = Object.getPrototypeOf(proto)  //原型链爬升
    }
  }

//2.arguments是什么，为什么不是数组
  //arguments本质上是一个对象，它的属性是从0开始一次递增的，因为有callee和
  //length属性，但是又不能使用其它的数组方法所以被称作类数组。。。
  //如果遍历类数组：
   //1.将数组的方法应用到类数组上
   Array.prototype.forEach.call(arguments,(a) => console.log(a))
   //2.将类数组转为数组
   const arr = Array.from(arguments)
   const arr1 = [...arguments]


//3.new操作符
  //过程：1.创建一个新的空对象
      // 2.设置原型，将对象的原型设置为函数的prototype对象
      // 3.让函数的this指向这个对象
      // 4.判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用
      //类型，就返回这个引用类型的对象。
  //手写new
  function _new(fn,...args){
    if(typeof fn !== 'function'){
      return false;
    }
    const obj = new Object()
    obj.__proto__ = fn.prototype.prototype
    const result = fn.apply(obj,args)
    return result instanceof obj ? result : obj;
  }