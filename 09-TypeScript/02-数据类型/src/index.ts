/*
 * @Author: niumengfei
 * @Date: 2022-11-25 21:38:24
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-11-25 21:54:09
 */
/* 泛型 */

/* 类型别名中的泛型 */
type Factory<T> = T | number;
//上面这个类型别名的本质就是一个函数，T 就是它的变量，返回值则是一个包含 T 的联合类型，我们可以写段伪代码来加深一下记忆：
// function Factory(typeArg){
//     return [typeArg, number, string]
// }

type Stringify<T> = {
    [K in keyof T]?: T[K]; //string;
};
  
type Clone<T> = {
    [K in keyof T]: T[K];
}

type _Stringify = Stringify<{
    name: string,
    age: number,
    // sad: string
}>;

let a: _Stringify ={
    name: '123',
    // age: 19
    // sad: '123'
}

type Partial2<T> = {
    [P in keyof T]?: T[P];
};
interface IFoo {
    prop1: string;
    prop2: number;
    prop3: boolean;
    prop4: () => void;
  }
  
  type PartialIFoo = Partial2<IFoo>;
  
  // 等价于
  interface PartialIFoo2 {
    prop1?: string;
    prop2?: number;
    prop3?: boolean;
    prop4?: () => void;
  }