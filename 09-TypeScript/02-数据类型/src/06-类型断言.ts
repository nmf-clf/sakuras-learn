/*
 * @Author: niumengfei
 * @Date: 2022-11-21 18:51:32
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-11-23 11:46:26
 */
/* 类型断言 */
// let unknownVar: string = '123333';

// (unknownVar as unknown as { foo: ()=> {} }).foo();
// console.log('unknownVar::', unknownVarres);


// interface IFoo {
//   name: string;
// }

// declare const obj: {
//   foo222: IFoo
// }

// const { foo222 = {} as IFoo } = obj
// console.log('foo222::', foo222);

/* 假设你想要基于这个结构随便实现一个对象，你可能会使用类型标注：
  这个时候等待你的是一堆类型报错，你必须规规矩矩地实现整个接口结构才可以。
  但如果使用类型断言，我们可以在保留类型提示的前提下，不那么完整地实现这个结构： */
interface IStruct {
  foo: string;
  bar: {
    barPropA: string;
    barPropB: number;
    barMethod: () => void;
    baz: {
      handler: () => Promise<void>;
    };
  };
}
// const obj: IStruct = {}; //类型“{}”缺少类型“IStruct”中的以下属性: foo, bar
const obj = {
  foo: '123'
} as IStruct;

