/* 类型系统层级 */
type Result = 'linbudu' extends string ? 1 : 2;
let a: Result = 1

 let source: string = '123';

 let anyType: any = 213;
 let neverType: never;

anyType = source;
console.log(anyType);

// 不能将类型“string”分配给类型“never”。
// neverType = source;
// console.log(source);

type Result14 = string extends String ? 1 : 2; // 1
type Result15 = String extends {} ? 1 : 2; // 1
type Result16 = {} extends object ? 1 : 2; // 1
type Result18 = object extends Object ? 1 : 2; // 1

let sx: string = '123'
let obj:object = {}
obj = sx;
