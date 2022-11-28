/*
 * @Author: niumengfei
 * @Date: 2022-11-09 09:57:21
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-11-28 14:21:17
 */
const url = 'https://api.thecatapi.com/v1/images/search';
// const _button = document.querySelector('button') as HTMLButtonElement; //非空断言: xxx as HTMLButtonElement
const button: HTMLButtonElement | null = document.querySelector('button'); //联合声明: HTMLButtonElement | null
const tableBody = document.querySelector('#table-body') as HTMLTableElement; //获取table-body元素，方便之后为其添加子节点
/*  
    TS使用核心：
    定义任何变量的时候要注明类型
    调用任何变量的时候要检查类型
*/
/* 接口主要是为了定义类的结构 */
interface CatType { //定义接口 - 因为该数据可能被复用
    id: string;
    url: string;
    height: number;
    width: number;
    test?: boolean; //属性值后面加个?代表可有可无，否则报错：类“Cat”错误实现接口“CatType”。类型 "Cat" 中缺少属性 "test"，但类型 "CatType" 中需要该属性
}
/*  implements：用类去实现一个接口 */
class Cat implements CatType{
    id: string;
    url: string;
    height: number;
    width: number;

    constructor(id:string, url:string, height:number, width:number ){
        this.id = id;
        this.url = url;
        this.height = height;
        this.width = width;
    }
}
/* 在这里定义一个操作类 */
class WebDisplay {
    static addData(data: CatType){ //添加猫， 因为我们需要直接使用操作类WebDisplay下的方法，因此需要将该方法声明为静态属性
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
        tableBody?.appendChild(tableRow);
    }
    static deleteData(deleteDOM: HTMLAnchorElement){
        /* 这里有个问题，如果点击的是当前行而不是删除图标，则会把整个tbody删除掉 */
        if(deleteDOM.tagName !== 'A') return console.error(`出错啦:: ${deleteDOM.tagName} is not expected`);
        console.log('点击元素::', Object(deleteDOM).__proto__, deleteDOM.tagName); //HTMLAnchorElement
        const td = <HTMLTableCellElement>deleteDOM.parentElement; //HTMLTableCellElement
        const tr = <HTMLTableRowElement>td.parentElement;
        console.log('爷爷元素::', tr, Object(tr).__proto__); //HTMLTableRowElement
        tr?.remove();
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
async function getJson<T>(url: string): Promise<T>{ //1.参数url隐式具有any类型，因此需要声明类型 4.在这里用泛型表示，写法：<> + T(占位符，也可以自定义) 7.声明返回类型
    let response: Response = await fetch(url); // 2.很显然fetch返回的是一个Response类型，我们声明即可
    // let json = response.json(); // 3.虽然知道json是个Promise，但是不知道Promise里返回的内容是什么，因此可以用泛型表示 
    let json: Promise<T> = response.json(); // 5.接着声明json数据类型Promise，并且用泛型<T>表示数据类型，代表我们知道返回的是Promise，但是不着急定义Promise里返回内容的类型而已
    return json; //6.返回了json，因此需要给函数声明返回类型
}
async function getData(){
    try{
        let res: CatType[] = await getJson<CatType[]>(url); //2.在这里定义通过泛型定义getJson返回的数据类型(也就是明确占位符的内容 )，其实是一个数组，数组里对象应和CatType接口保持一致
        let data: CatType = res[0]; //1.对象的类型为 "unknown" ：因为前面已经使用了占位符，所以这里需要明确占位符的内容
        WebDisplay.addData(data);
    }catch(err: Error | unknown){ //3.err类型为unknow，虽然没有报错，但是不知道对方会抛出什么异常，针对这个例子，我们可以把err类型声明为Error或者unknow
        let msg: string; 
        if(err instanceof Error){
            msg = err.message
        }else{
            msg = String(err)
        }
        console.log(msg);
    }
} 
//button绑定事件-新增
button?.addEventListener<'click'>('click', getData)
//tableBody绑定事件-删除
tableBody?.addEventListener<'click'>('click', (ev: MouseEvent)=>{
    WebDisplay.deleteData(<HTMLAnchorElement>ev.target);
})