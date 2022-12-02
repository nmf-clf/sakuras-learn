/*
 * @Author: niumengfei
 * @Date: 2022-11-25 21:38:24
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-02 15:39:25
 */
/* 类型里的逻辑运算 */

/* 条件类型基础 */
type n1 = bigint;
// let nnn: n1 = 123312333333;
// function universalAdd<T extends number | bigint | string>(x: T, y: T) {
//     return x + (y as any);
// }
// universalAdd(599, 1); // T 填充为 599 | 1
// universalAdd("linbudu", "599"); // T 填充为 linbudu | 599
function universalAdd<T extends number | bigint | string>(
	x: T,
	y: T
): LiteralToPrimitive<T> {
	return x + (y as any);
}

export type LiteralToPrimitive<T> = T extends number
	? number
	: T extends bigint
	? bigint
	: T extends string
	? string
	: never;

universalAdd("linbudu", "599"); // string
universalAdd(599, 1); // number
// universalAdd(10n, 10n); // bigint

//条件类型还可以用来对更复杂的类型进行比较，比如函数类型：
type Func = (...args: any[]) => any;

type FunctionConditionType<T extends Func> = T extends (
  ...args: any[]
) => string
  ? 'A string return func!'
  : 'A non-string return func!';

//  "A string return func!"
type StringResult = FunctionConditionType<() => string>;
// 'A non-string return func!';
type NonStringResult1 = FunctionConditionType<() => boolean>;
// 'A non-string return func!';
type NonStringResult2 = FunctionConditionType<() => number>;
let s1: StringResult = "A string return func!"