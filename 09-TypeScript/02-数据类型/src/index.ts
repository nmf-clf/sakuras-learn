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

const func = (input: string) => {
  return input.length > 10;
}

type Str = typeof str; // "linbudu"
type Obj = typeof obj; // { name: string; }
type Null = typeof nullVar; // null
type Undefined = typeof undefined; // undefined
type Func = typeof func; // (input: string) => boolean

// const b1:Str = '123'; //不能将类型“"123"”分配给类型“"linbudu"”

/* 你不仅可以直接在类型标注中使用 typeof，还能在工具类型中使用 typeof。 */
const func2 = (input: string) => {
    return input.length > 10;
}
  
const _func2: typeof func2 = (name: string) => {
    return name === 'linbudu'
}

const func3 = (input: string) => {
    return input.length > 10;
}
  
  // boolean
type FuncReturnType = ReturnType<typeof func3>;

const isInputValid = (input: string) => {
    return input.length > 10;
}
  
// 不允许表达式
let isValid: ReturnType<typeof isInputValid> = false;

/* 类型守卫 */
declare const strOrNumOrBool: string | number | boolean;

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

function isString(input: unknown): input is string {
    return typeof input === "string";
}

function foo(input: string | number) {
    if (isString(input)) {
        // 类型“string | number”上不存在属性“replace”。
        (input).replace("linbudu", "linbudu599")
    }
    if (typeof input === 'number') { }
    // ...
}

 type Falsy = false | "" | 0 | null | undefined | [];

 const isFalsy = (val: unknown): val is Falsy => !val;
console.log('isFalsy::', isFalsy([]));
if(isFalsy([])){
    console.log('true1');
}else{
    console.log('false1');
}

// 不包括不常用的 symbol 和 bigint
export type Primitive = string | number | boolean | undefined;

export const isPrimitive = (val: unknown): val is Primitive => ['string', 'number', 'boolean' , 'undefined'].includes(typeof val);