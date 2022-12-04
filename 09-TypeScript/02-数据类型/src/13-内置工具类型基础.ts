/*
 * @Author: niumengfei
 * @Date: 2022-11-25 21:38:24
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-04 14:28:02
 */
/* 13. 内置工具类型基础 */

// 1.属性工具类型
type Partial1<T> = {
    [P in keyof T]+?: T[P]; //+? === ?
};

type Required1<T> = {
    [P in keyof T]-?: T[P];
};

type Readonly1<T> = {
    readonly [P in keyof T]: T[P];
};
type Required1Type = Required<{
	name: string,
	age: number
}>
let req1: Required1Type = {
	name: '123',
	age: 12
} 
type Read1type = Readonly<{
	name: string,
	age: number
}>
let read1: Read1type = {
	name: '123',
	age: 12
} 
// read1.name = '12333'; //无法分配到 "name" ，因为它是只读属性。ts(2540)

// 2.结构工具类型
type Record1<K extends keyof any, T> = {
    [P in K]: T;
};

type R1Type = Record<string, string>
let R1: R1Type = {
	name: '123'
}

// 3.集合工具类型
// 交集
type AExtractB = Extract<1 | 2 | 3, 1 | 2 | 4>; // 1 | 2 
type _AExtractB =
  | (1 extends 1 | 2 | 4 ? 1 : never) // 1
  | (2 extends 1 | 2 | 4 ? 2 : never) // 2
  | (3 extends 1 | 2 | 4 ? 3 : never); // never
// 差集
type SetA = 1 | 2 | 3 | 5;
type SetB = 0 | 1 | 2 | 4;
type AExcludeB = Exclude<SetA, SetB>; // 3 | 5
type BExcludeA = Exclude<SetB, SetA>; // 0 | 4

// 并集
export type Concurrence<A, B> = A | B;

// 交集
export type Intersection<A, B> = A extends B ? A : never;

// 差集
export type Difference<A, B> = A extends B ? never : A;

// 补集
export type Complement<A, B extends A> = Difference<A, B>;

// 4.模式匹配工具类型 不懂
type FunctionType = (...args: any) => any;

type Parameters<T extends FunctionType> = T extends (...args: infer P) => any ? P : never;

type ReturnType<T extends FunctionType> = T extends (...args: any) => infer R ? R : any;
type FirstParameter<T extends FunctionType> = T extends (
	arg: infer P,
	...args: any
  ) => any
	? P
	: never;
  
  type FuncFoo = (arg: number) => void;
  type FuncBar = (...args: string[]) => void;
type FooFirstParameter = FirstParameter<FuncFoo>; // number

type BarFirstParameter = FirstParameter<FuncBar>; // string