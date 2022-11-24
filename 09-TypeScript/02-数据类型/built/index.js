/*
 * @Author: niumengfei
 * @Date: 2022-11-23 11:45:43
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-11-24 12:20:33
 */
/* 类型查询操作符：熟悉又陌生的 typeof */
const str = "linbudu";
const obj = { name: "linbudu" };
const nullVar = null;
const undefinedVar = undefined;
const func = (input) => {
    return input.length > 10;
};
// const b1:Str = '123'; //不能将类型“"123"”分配给类型“"linbudu"”
/* 你不仅可以直接在类型标注中使用 typeof，还能在工具类型中使用 typeof。 */
const func2 = (input) => {
    return input.length > 10;
};
const _func2 = (name) => {
    return name === 'linbudu';
};
const func3 = (input) => {
    return input.length > 10;
};
const isInputValid = (input) => {
    return input.length > 10;
};
// 不允许表达式
let isValid = false;
// if (typeof strOrNumOrBool === "string") {
//   // 一定是字符串！
//   strOrNumOrBool.charAt(1);
// } else if (typeof strOrNumOrBool === "number") {
//   // 一定是数字！
//   strOrNumOrBool.toFixed();
// } else if (typeof strOrNumOrBool === "boolean") {
//   // 一定是布尔值！
//   strOrNumOrBool === true;
// } else {
//   // 要是走到这里就说明有问题！
//   const _exhaustiveCheck: never = strOrNumOrBool;
//   throw new Error(`Unknown input type: ${_exhaustiveCheck}`);
// }
function isString(input) {
    return typeof input === "string";
}
function foo(input) {
    if (isString(input)) {
        // 类型“string | number”上不存在属性“replace”。
        (input).replace("linbudu", "linbudu599");
    }
    if (typeof input === 'number') { }
    // ...
}
const isFalsy = (val) => !val;
console.log('isFalsy::', isFalsy([]));
if (isFalsy([])) {
    console.log('true1');
}
else {
    console.log('false1');
}
export const isPrimitive = (val) => ['string', 'number', 'boolean', 'undefined'].includes(typeof val);
