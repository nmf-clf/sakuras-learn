/*
 * @Author: niumengfei
 * @Date: 2022-11-21 15:15:23
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-11-21 18:41:42
 */
/* 事实上，TypeScript 的原始类型标注中也有 void，但与 JavaScript 中不同的是，
    这里的 void 用于描述一个内部没有 return 语句，或者没有显式 return 一个值的函数的返回值，如： */
function func1() { }
function func2() {
    return;
}
function func3() {
    //   return null; // 需要关闭 strictNullChecks
}
/* 在这里，func1 与 func2 的返回值类型都会被隐式推导为 void，只有显式返回了 undefined 值的 func3 其返回值类型才被推导为了 undefined。
但在实际的代码执行中，func1 与 func2 的返回值均是 undefined。 */
/*
虽然 func3 的返回值类型会被推导为 undefined，但是你仍然可以使用 void 类型进行标注，
因为在类型层面 func1、func2、func3 都表示“没有返回一个有意义的值”。
*/
const arr1 = [];
const arr2 = [];
const arr3 = ['lin', 'bu', 'du'];
console.log(arr3[333]); //undefined
const arr4 = ['lin', 'bu', 'du'];
// console.log(arr4[599]); //长度为 "3" 的元组类型 "[string, string, string]" 在索引 "599" 处没有元素
// const arr6: [string, number?, boolean?] = ['linbudu'];
// 下面这么写也可以
const arr6 = ['linbudu', , ,];
console.log(arr6.length);
const arr11 = ['2,', '23', '2', '23'];
const [ele1, ele2, ...rest] = arr11;
console.log('xxx', ele1, ele2, rest);
const arr5 = ['linbudu', 599, true];
const obj2 = {
    name: 'linbudu',
    age: 599,
    male: true,
    // 无需实现 func 也是合法的
};
console.log(obj2.male);
obj2.male = false;
obj2.func = () => { };
obj2.func();
// obj2.name = '123' 无法分配到 "name" ，因为它是只读属性
/* 其实在数组与元组层面也有着只读的修饰，但与对象类型有着两处不同。 */
// 对于 undefined、null、void 0 ，需要关闭 strictNullChecks
const tmp9 = undefined;
const tmp10 = null;
const tmp11 = void 0;
const tmp12 = 'linbudu';
// 以下不成立，因为不是字符串类型的拆箱类型
// const tmp13: String = 599; // X
// const tmp14: String = { name: 'linbudu' }; // X
// const tmp15: String = () => {}; // X
const tmp16 = []; // X
const asd = {
    code: 10000,
    status: 'success', //"success" | "failure";
};
const tmp = {
    obj: {
        name: "linbudu",
        age: 18
    }
};
var PageUrl;
(function (PageUrl) {
    PageUrl["Home_Page_Url"] = "url1";
    PageUrl["Setting_Page_Url"] = "url2";
    PageUrl["Share_Page_Url"] = "url3";
})(PageUrl || (PageUrl = {}));
const home = PageUrl.Home_Page_Url;
const returnNum = () => 100 + 100;
var Items;
(function (Items) {
    Items[Items["Baz"] = 0] = "Baz";
    Items[Items["Foo"] = returnNum()] = "Foo";
    Items[Items["Bar"] = 133] = "Bar";
})(Items || (Items = {}));
/* var Mixed;
(function (Mixed) {
    Mixed["Str"] = "linbudu";
    Mixed[Mixed["Num"] = 599] = "Num";
})(Mixed || (Mixed = {})); */
console.log('Items::', Items[returnNum()]);
const s = 'xxx'; // 'xxx'
let s2 = 'xxx'; // string
/* 5. 函数与 Class 中的类型：详解函数重载与面向对象 */
const foo = function (name) {
    return 'test';
};
const foo2 = function (name) {
    return '123';
};
const fee = (name) => {
};
const fee2 = (name) => {
    return name.length;
};
