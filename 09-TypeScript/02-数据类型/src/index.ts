/*
 * @Author: niumengfei
 * @Date: 2022-11-25 21:38:24
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-05 13:08:52
 */
/* 03-进入类型世界：理解原始类型与对象类型 */

//3.1 原始类型的类型标注
const name_: string = 'linbudu';
const age: number = 24;
const male: boolean = false;
const undef: undefined = undefined;
const nul: null = null;
const obj: object = { name, age, male };
// const bigintVar1: bigint = 9007199254740991n; //目标低于 ES2020 时，bigInt 文本不可用
const bigintVar2: bigint = BigInt(9007199254740991);
const symbolVar: symbol = Symbol('unique');