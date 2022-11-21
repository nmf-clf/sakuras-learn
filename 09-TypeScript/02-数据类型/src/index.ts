/*
 * @Author: niumengfei
 * @Date: 2022-11-21 15:15:23
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-11-21 18:41:42
 */
/* 事实上，TypeScript 的原始类型标注中也有 void，但与 JavaScript 中不同的是，
    这里的 void 用于描述一个内部没有 return 语句，或者没有显式 return 一个值的函数的返回值，如： */
function func1(): void {}
function func2() {
  return;
}
function func3(): void {
//   return null; // 需要关闭 strictNullChecks
}
/* 在这里，func1 与 func2 的返回值类型都会被隐式推导为 void，只有显式返回了 undefined 值的 func3 其返回值类型才被推导为了 undefined。
但在实际的代码执行中，func1 与 func2 的返回值均是 undefined。 */

/* 
虽然 func3 的返回值类型会被推导为 undefined，但是你仍然可以使用 void 类型进行标注，
因为在类型层面 func1、func2、func3 都表示“没有返回一个有意义的值”。
*/

const arr1: string[] = [];
const arr2: Array<string> = [];

const arr3: string[] = ['lin', 'bu', 'du'];
console.log(arr3[333]); //undefined

const arr4: [string, string, string] = ['lin', 'bu', 'du'];
// console.log(arr4[599]); //长度为 "3" 的元组类型 "[string, string, string]" 在索引 "599" 处没有元素

// const arr6: [string, number?, boolean?] = ['linbudu'];
// 下面这么写也可以
const arr6: [string, number?, boolean?] = ['linbudu', , ,];
type TupleLength = typeof arr6.length; // 1 | 2 | 3
console.log(arr6.length);

const arr11: string[] = ['2,','23','2','23'];

const [ele1, ele2, ...rest] = arr11;

console.log('xxx', ele1, ele2, rest);

const arr5: [string, number, boolean] = ['linbudu', 599, true];

// 长度为 "3" 的元组类型 "[string, number, boolean]" 在索引 "3" 处没有元素。
// const [name2, age, male, other2] = arr5;

// console.log('ss', name2, age, male, other2);

interface IDescription {
    readonly name: string;
    age: number;
    male?: boolean;
    func?: Function;
}
  
const obj2: IDescription = {
    name: 'linbudu',
    age: 599,
    male: true,
    // 无需实现 func 也是合法的
};
console.log(obj2.male);

obj2.male = false;
obj2.func = () => {};
obj2.func()

// obj2.name = '123' 无法分配到 "name" ，因为它是只读属性

/* 其实在数组与元组层面也有着只读的修饰，但与对象类型有着两处不同。 */

// 对于 undefined、null、void 0 ，需要关闭 strictNullChecks
const tmp9: String = undefined;
const tmp10: String = null;
const tmp11: String = void 0;
const tmp12: String = 'linbudu';

// 以下不成立，因为不是字符串类型的拆箱类型
// const tmp13: String = 599; // X
// const tmp14: String = { name: 'linbudu' }; // X
// const tmp15: String = () => {}; // X
const tmp16: readonly String[] = []; // X

type Code = 10000 | 10001 | 50000;

type Status = "success" | "failure";

interface Res {
    code: Code;
    status: Status, //"success" | "failure";
    data?: any;
}

declare const res: Res;
const asd: Res = {
    code: 10000,
    status: 'success', //"success" | "failure";
} 
// if(res.status == 'success'){ //res is not defined
//     // console.log('3333');
// }

/* 4. 掌握字面量类型与枚举，让你的类型再精确一些 */
interface Tmp {
    obj: {
      name: "linbudu",
      age: 18
    }
  }
  
const tmp: Tmp = {
    obj: {
        name: "linbudu",
        age: 18
    }
}

enum PageUrl {
    Home_Page_Url = "url1",
    Setting_Page_Url = "url2",
    Share_Page_Url = "url3",
}
  
const home = PageUrl.Home_Page_Url;

const returnNum = ():number => 100+100
enum Items {
    Baz,
    Foo =  returnNum(),
    Bar = 133,
}
const enum Mixed {
    Str = "linbudu",
    Num = 599,
}
/* var Mixed;
(function (Mixed) {
    Mixed["Str"] = "linbudu";
    Mixed[Mixed["Num"] = 599] = "Num";
})(Mixed || (Mixed = {})); */
console.log('Items::', Items[returnNum()]);

const s = 'xxx' // 'xxx'
let s2 = 'xxx' // string

/* 5. 函数与 Class 中的类型：详解函数重载与面向对象 */

const foo = function(name: string): string {
    return 'test'
}
const foo2: (name: string) => string = function(name){ //箭头函数在这里其实是 TypeScript 中的函数类型签名。
    return '123'
}

const fee = (name: string): void =>{

}
const fee2: (name: string) => number = (name) =>{
    return name.length
}
