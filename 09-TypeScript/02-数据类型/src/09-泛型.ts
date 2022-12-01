/*
 * @Author: niumengfei
 * @Date: 2022-11-25 21:38:24
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-01 15:33:12
 */
/* 泛型 */

/* 类型别名中的泛型 */
type Factory<T> = T | number;
//上面这个类型别名的本质就是一个函数，T 就是它的变量，返回值则是一个包含 T 的联合类型，我们可以写段伪代码来加深一下记忆：
// function Factory(typeArg){
//     return [typeArg, number, string]
// }

type Stringify<T> = {
    [K in keyof T]?: T[K]; //string;
};
  
type Clone<T> = {
    [K in keyof T]: T[K];
}

type _Stringify = Stringify<{
    name: string,
    age: number,
    // sad: string
}>;

let a: _Stringify ={
    name: '123',
    // age: 19
    // sad: '123'
}

type Partial2<T> = {
    [P in keyof T]?: T[P];
};
interface IFoo {
    prop1: string;
    prop2: number;
    prop3: boolean;
    prop4: () => void;
  }
  
  type PartialIFoo = Partial2<IFoo>;
  
  // 等价于
  interface PartialIFoo2 {
    prop1?: string;
    prop2?: number;
    prop3?: boolean;
    prop4?: () => void;
  }

/* 泛型约束与默认值 */
type ResStatus<ResCode extends number = 10000> = ResCode extends 10000 | 10001 | 10002
  ? 'success'
  : 'failure';

// type Res1 = ResStatus<'2133'>//类型“string”不满足约束“number”
type Res2 = ResStatus<1>
type Res3 = ResStatus<10000>

type Res6 = ResStatus;
let sds: Res3 = 'success';
let sds2: ResStatus<100003> = 'failure';
let sd6s: Res6 = 'success';

/* 多泛型关联 */
type ProcessInput<
  Input,
  SecondInput extends Input = Input,
  ThirdInput extends Input = SecondInput,
> = [Input, SecondInput, ThirdInput];

type _ProcessInput = ProcessInput<123>;

let _pro: _ProcessInput = [123, 123, 123]

/* 对象类型中的泛型 */
interface IRes<TData = unknown> {
    code: number;
    error?: string;
    data: TData;
}
interface IUserProfileRes {
    name: string;
    homepage: string;
    avatar: string;
}
function fetchUserProfile(): Promise<IRes<IUserProfileRes>> {
    return Promise.resolve({
        code: 123,
        data: {
            name: '123',
            homepage: '35',
            avatar: '3444',
        }
    })
}

type StatusSucceed = boolean;
function handleOperation(): Promise<IRes<StatusSucceed>> {
    return Promise.resolve({
        code: 123,
        data: true
    })
}

fetchUserProfile()
.then(res =>{
    // console.log(res);
})
handleOperation()
.then(res =>{
    // console.log(res);
    
})
//泛型嵌套-分页
interface IPaginationRes<TItem = unknown> {
    data: TItem[];
    page: number;
    totalCount: number;
    hasNextPage: boolean;
}
  
function fetchUserProfileList(): Promise<IRes<IPaginationRes<IUserProfileRes>>> {
    return Promise.resolve({
        code: 100,
        data: {
            data: [{
                name: '123',
                homepage: '35',
                avatar: '3444',
            }],
            page: 123,
            totalCount: 1000,
            hasNextPage: true,
           
        }
    })
}

/* 函数类型中的泛型 */
function handle<T extends string | number>(input: T): T {
    return input
}

const author = "linbudu"; // 使用 const 声明，被推导为 "linbudu"

const authorAge = 18; // 使用 let 声明，被推导为 number

handle(author); // 填充为字面量类型 "linbudu"
handle(authorAge); // 填充为基础类型 number

function swap<T extends string | number | null | object, U extends string | number | object>([start, end]: [T, U]): [U, T] {
    return [end, start];
}

const swapped1 = swap(["linbudu", 599]);
const swapped2 = swap([null, 599]);
const swapped3 = swap([{ name: "linbudu" }, {}]);

const object2 = { 'a': 1, 'b': '2', 'c': 3 };

function tesddd<T extends object>(text: T): T{
    return text
}

function handle_<T>(payload: T): Promise<[T]> {
    return new Promise<[T]>((res, rej) => {
      res([payload]);
    });
}
handle_('123')
.then(res=>{
    // console.log('handle_::', res);
    
})

/* class中的泛型 */
class Queue<TElementType> {
    private _list: TElementType[];
  
    constructor(initial: TElementType[]) {
        console.log('initial::', initial);
        this._list = initial;
    }
    // 入队一个队列泛型子类型的元素
    enqueue<TType extends TElementType>(ele: TType): TElementType[] {
        this._list.push(ele);
        return this._list;
    }
    // 入队一个任意类型元素（无需为队列泛型子类型）
    enqueueWithUnknownType<N>(element: N): (TElementType | N)[] {
        this._list.push(<any>element)
        // return  this._list;
        return [...this._list, element];
    }
    // 出队
    dequeue(): TElementType[] {
         this._list.shift();
        return this._list;
    }
}
type Quetype = {
    name: string,
    age?: number,
    sir?: boolean,
    say?: ()=>{}
}

let psss = new Queue<Quetype>([{
    name: '1233',
    age: 12,
    sir: true,
    say: ():number =>{ return 999 }
}])
psss.enqueue<Quetype>({
    name: '1233',
    age: 12,
})
psss.enqueueWithUnknownType<number>(1)
console.log('psss2::', psss);

/* 内置方法中的泛型 */
function p() {
    return new Promise<boolean>((resolve, reject) => {
      resolve(true);
    });
}
