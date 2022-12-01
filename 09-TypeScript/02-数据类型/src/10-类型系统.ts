/*
 * @Author: niumengfei
 * @Date: 2022-11-25 21:38:24
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-01 17:36:13
 */
/* 结构化类型系统 */
class Cat {
    eat(): boolean {
      return true
    }
  }
  
  class Dog {
    eat(): number {
      return 599;
    }
  }
  
  function feedCat(cat: Cat) { }
  
  // 报错！
//   feedCat(new Dog())

declare class TagProtector<T extends string> {
    protected __tag__: T;
}
  
type Nominal<T, U extends string> = T & TagProtector<U>;

// type CNY = Nominal<number, 'CNY'>;

// type USD = Nominal<number, 'USD'>;

class CNY {
    private __tag!: void;
    constructor(public value: number) {}
}
class USD {
    private __tag!: void;
    constructor(public value: number) {}
}

const CNYCount = new CNY(100);
console.log(CNYCount);

const USDCount = new USD(100);

function addCNY(source: CNY, input: CNY) {
  return (source.value + input.value);
}

let addCNYs = addCNY(CNYCount, CNYCount);
console.log(addCNYs);


// 报错了！
// addCNY(CNYCount, USDCount);

