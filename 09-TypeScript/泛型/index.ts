/*
 * @Author: niumengfei
 * @Date: 2022-11-09 15:29:23
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-11-11 23:29:01
 */

// let age: number = null
// let realName: string = undefined
let arr: object[] = [{}, {}]
console.log(arr);

function print(arg:any):any {
    console.log(arg)
    return arg
}

const res:string = print(123) 

function identity<T>(arg: T) {
    return arg;
}

// identity(1)
let output = identity(true);
console.log(output);


function loggingIdentity<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}

class Animal {
    
}
let zoo: Animal[] = [new Animal(), new Elephant(), new Snake()];