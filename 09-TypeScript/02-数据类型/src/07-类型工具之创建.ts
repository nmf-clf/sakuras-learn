type A = string;

/* 抽离一组联合类型 */
type StatusCode = 200 | 301 | 400 | 500 | 502;
type PossibleDataTypes = string | number | (() => unknown);

const status2: StatusCode = 502;

/* 抽离一个函数类型 */
type Handler = (e: Event) => void;

const clickHandler: Handler = (e) => { };
const moveHandler: Handler = (e) => { };
const dragHandler: Handler = (e) => { };

/* 声明一个对象类型，就像接口那样 */
type ObjectType = {
    name: string,
}

/* 工具类型 */
type Factory<T> = T | number | string;
// const foo: Factory<boolean> = true;

type FactoryWithBool = Factory<boolean>;

const foo333: FactoryWithBool = 123;

/* 交叉类型 */
interface NameStruct {
    name: string;
}
interface AgeStruct {
    age: number;
}
type ProfileStruct = NameStruct & AgeStruct;
const profile: ProfileStruct = {
    name: "linbudu",
    age: 19
}
type Struct1 = {
    primitiveProp?: string;
    objectProp: {
      name: string;
    }
  }
type Struct2 = {
    primitiveProp?: number;
    objectProp: {
        age: number;
    }
}

type Composed = Struct1 & Struct2;

const a:Composed = {
    // primitiveProp: '13',
    objectProp: {
      name: '1233',
      age: 15
    }
}
// type PrimitivePropType = Composed['primitiveProp']; // never
// type ObjectPropType = Composed['objectProp']; // { name: string; age: number; }

interface AllStringTypes {
    [key: string]: string;
  }
  
type PropType1 = AllStringTypes['linbudu']; // string
type PropType2 = AllStringTypes['599']; // string

const dasd:PropType1 = 'dsdasd'
console.log('dasd:::', dasd);

  
const fooee: AllStringTypes = {
    "linbudu": "599",
    599: "linbudu",
    [Symbol("ddd")]: 'symbol',
}

interface AllStringTypes2 {
    // 类型“number”的属性“propA”不能赋给“string”索引类型“boolean”。
    propA: number;
    [key: string]: boolean | number;
}

interface AnyTypeHere {
    [key: number]: string;
}
  
const foosd: AnyTypeHere[212] = 'any value';

/* 索引类型查询 */
interface Foo {
    linbudu: 1,
    599: 2
}
  
type FooKeys = keyof Foo; // "linbudu" | 599
const rt:FooKeys = 'linbudu'

// type FooKeys = Object.keys(Foo4).join(" | ");
interface Foo {
    propA3: number;
    propB: boolean;
    propC: string;
    propD: string[];
}
type PropTypeUnion = Foo[keyof Foo]; // string | number | boolean
const rrr:PropTypeUnion = ['12','23'];

interface Foo {
    propA3: number;
}
// 类型“Foo”没有匹配的类型“string”的索引签名。
type PropAType = AllStringTypes2[number]; 

/* 映射类型 */
type Stringify<T> = {
    [K in keyof T]: T[K];
};

interface Fooys {
    prop1: string;
    prop2: number;
    prop3?: boolean;
    prop4?: () => void;
}
type ysType = Stringify<Fooys>;
const yss: ysType = {
    prop1: 's21',
    prop2: 23,
};