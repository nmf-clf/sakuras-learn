/*
 * @Author: niumengfei
 * @Date: 2022-11-25 21:38:24
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-04 12:28:59
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

type Swap<T extends any[]> = T extends [infer A, infer B] ? [B, A] : T;

type SwapResult1 = Swap<[1, 2]>; // 符合元组结构，首尾元素替换[2, 1]
type SwapResult2 = Swap<[1, 2, 3]>; // 不符合结构，没有发生替换，仍是 [1, 2, 3]
let sw1: SwapResult1 = [2, 1];
let sw2: SwapResult2 = [1, 2, 3]

// 提取首尾两个
type ExtractStartAndEnd<T extends any[]> = T extends [
	infer Start,
	...any[],
	infer End
  ]
	? [Start, End]
	: T;
  
  // 调换首尾两个
  type SwapStartAndEnd<T extends any[]> = T extends [
	infer Start,
	...infer Left,
	infer End
  ]
	? [End, ...Left, Start]
	: T;
  
  // 调换开头两个
  type SwapFirstTwo<T extends any[]> = T extends [
	infer Start1,
	infer Start2,
	...infer Left
  ]
	? [Start2, Start1, ...Left]
	: T;

type ext = ExtractStartAndEnd<[1, 2, 3, 4, 5]>
type ex2 = SwapStartAndEnd<[1, 2, 3, 4, 5]>
type ex3 = SwapFirstTwo<[1, 2, 3, 4, 5]>
let ext1: ext = [1, 5]
let ext2: ex2 = [5, 2, 3, 4, 1]
let ext3: ex3 = [2, 1, 3, 4, 5]

type ArrayItemType<T> = T extends Array<infer ElementType> ? ElementType : never;

type ArrayItemTypeResult1 = ArrayItemType<[]>; // never
type ArrayItemTypeResult2 = ArrayItemType<string[]>; // string
type ArrayItemTypeResult3 = ArrayItemType<[string, number]>; // string | number
