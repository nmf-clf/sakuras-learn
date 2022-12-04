/*
 * @Author: niumengfei
 * @Date: 2022-12-04 15:06:30
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-04 15:07:00
 */
/* 14. 反方向类型推导 */

// 1.无处不在的上下文类型
window.onerror = (event, source, line, col, err) => {};

type CustomHandler = (name: string, age: number) => boolean;
// 也推导出了参数类型
const handler: CustomHandler = (arg1, arg2) => true;

declare let struct: {
	handler: CustomHandler;
};
// 不能将类型“void”分配给类型“boolean”。
struct = {
	handler: (name, age) => { 
		console.log('xxx');
		return false 
	}
}

// 正常
// window.onerror = (event) => {};
// 报错
// window.onerror = (event, source, line, col, err, extra) => {}; //不能将类型“(event: any, source: any, line: any, col: any, err: any, extra: any) => void”分配给类型“OnErrorEventHandler”
declare let func: (raw: number) => (input: string) => any;
// raw → number
func = (raw) => {
  // input → string
  return (input) => {};
};
//在某些情况下，上下文类型的推导能力也会失效，比如这里我们使用一个由函数类型组成的联合类型
class Foo {
	foo!: number;
}
  
class Bar extends Foo {
	bar!: number;
}
  
let f1: { (input: Foo): void } | { (input: Bar): void };
// 参数“input”隐式具有“any”类型。
// f1 = (input) => {};

let f2: { (input: Foo | Bar): void };
// Foo | Bar
f2 = (input) => {};
//而如果联合类型中将这两个类型再嵌套一层，此时上下文类型反而正常了：
let f3:
  | { (raw: number): (input: Foo) => void }
  | { (raw: number): (input: Bar) => void };

// raw → number
f3 = (raw) => {
  // input → Bar
  return (input) => {};
};

// 2.void 返回值类型下的特殊情况
type CustomHandler2 = (name: string, age: number) => void;

const handler1: CustomHandler2 = (name, age) => true;
const handler2: CustomHandler2 = (name, age) => 'linbudu';
const handler3: CustomHandler2 = (name, age) => null;
const handler4: CustomHandler2 = (name, age) => undefined;

const result1 = handler1('linbudu', 599); // void
const result2 = handler2('linbudu', 599); // void
const result3 = handler3('linbudu', 599); // void
const result4 = handler4('linbudu', 599); // void
//看起来这是一种很奇怪的、错误的行为，但实际上，我们日常开发中的很多代码都需要这一“不正确的”行为才不会报错，比如以下这个例子：
const arr: number[] = [];
const list: number[] = [1, 2, 3];

let arr1 = list.forEach((item) =>{ 
	console.log(item);
	let s = arr.push(item)
}); //你可以将返回值非 void 类型的函数（() => list.push()）作为返回值类型为 void 类型（arr.forEach）的函数类型参数


// 扩展：将更少参数的函数赋值给具有更多参数的函数类型
function handler_(arg: string) {
	console.log(arg);
}		
  
function useHandler_(callback: (arg1: string, arg2: number) => void) {
	callback('linbudu', 599);
}
  
useHandler_(handler_);
