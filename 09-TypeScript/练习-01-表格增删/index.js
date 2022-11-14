"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/*
 * @Author: niumengfei
 * @Date: 2022-11-09 09:57:21
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-11-10 10:31:47
 */
const url = 'https://api.thecatapi.com/v1/images/search';
// const _button = document.querySelector('button') as HTMLButtonElement; //非空断言: xxx as HTMLButtonElement
const button = document.querySelector('button'); //联合声明: HTMLButtonElement | null
const tableBody = document.querySelector('#table-body'); //获取table-body元素，方便之后为其添加子节点
/*  implements：用类去实现一个接口 */
class Cat {
    constructor(id, url, height, width) {
        this.id = id;
        this.url = url;
        this.height = height;
        this.width = width;
    }
}
/* 在这里定义一个操作类 */
class WebDisplay {
    static addData(data) {
        const cat = new Cat(data.id, data.url, data.height, data.width);
        const tableRow = document.createElement('tr'); //创建tr
        tableRow.innerHTML = `
            <td>${cat.id}</td>
            <td><img src="${cat.url}" /></td>
            <td>${cat.url}</td>
            <td>${cat.height}</td>
            <td>${cat.width}</td>
            <td><a href="#">X</a></td>
        `;
        //将tableRow添加到D
        tableBody === null || tableBody === void 0 ? void 0 : tableBody.appendChild(tableRow);
    }
    static deleteData(deleteDOM) {
        /* 这里有个问题，如果点击的是当前行而不是删除图标，则会把整个tbody删除掉 */
        if (deleteDOM.tagName !== 'A')
            return console.error(`出错啦:: ${deleteDOM.tagName} is not expected`);
        console.log('点击元素::', Object(deleteDOM).__proto__, deleteDOM.tagName); //HTMLAnchorElement
        const td = deleteDOM.parentElement; //HTMLTableCellElement
        const tr = td.parentElement;
        console.log('爷爷元素::', tr, Object(tr).__proto__); //HTMLTableRowElement
        tr === null || tr === void 0 ? void 0 : tr.remove();
    }
}
/* 此为普通版本也可以正常使用，但是这样写不能发挥TS的作用
async function getJson(url: string){ //参数url隐式具有any类型，因此需要声明类型
    let response = await fetch(url);
    let json = response.json();
    return json;
}
async function getData(){
    let res = await getJson(url);
    let data = res[0];
    WebDisplay.addData(data);
}
*/
/* 此为TS加强写法 */
function getJson(url) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield fetch(url); // 2.很显然fetch返回的是一个Response类型，我们声明即可
        // let json = response.json(); // 3.虽然知道json是个Promise，但是不知道Promise里返回的内容是什么，因此可以用泛型表示 
        let json = response.json(); // 5.接着声明json数据类型Promise，并且用泛型<T>表示数据类型，代表我们知道返回的是Promise，但是不着急定义Promise里返回内容的类型而已
        return json; //6.返回了json，因此需要给函数声明返回类型
    });
}
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let res = yield getJson(url); //2.在这里定义通过泛型定义getJson返回的数据类型(也就是明确占位符的内容 )，其实是一个数组，数组里对象应和CatType接口保持一致
            let data = res[0]; //1.对象的类型为 "unknown" ：因为前面已经使用了占位符，所以这里需要明确占位符的内容
            WebDisplay.addData(data);
        }
        catch (err) { //3.err类型为unknow，虽然没有报错，但是不知道对方会抛出什么异常，针对这个例子，我们可以把err类型声明为Error或者unknow
            let msg;
            if (err instanceof Error) {
                msg = err.message;
            }
            else {
                msg = String(err);
            }
            console.log(msg);
        }
    });
}
//button绑定事件-新增
button === null || button === void 0 ? void 0 : button.addEventListener('click', getData);
//tableBody绑定事件-删除
tableBody === null || tableBody === void 0 ? void 0 : tableBody.addEventListener('click', (ev) => {
    WebDisplay.deleteData(ev.target);
});
