/*
 * @Author: niumengfei
 * @Date: 2022-11-25 21:38:24
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-11-28 14:18:39
 */
/* 泛型 */
let a = {
    name: '123',
    // age: 19
    // sad: '123'
};
let sds = 'success';
let sds2 = 'failure';
let sd6s = 'success';
let _pro = [123, 123, 123];
function fetchUserProfile() {
    return Promise.resolve({
        code: 123,
        data: {
            name: '123',
            homepage: '35',
            avatar: '3444',
        }
    });
}
function handleOperation() {
    return Promise.resolve({
        code: 123,
        data: true
    });
}
fetchUserProfile()
    .then(res => {
    console.log(res);
});
handleOperation()
    .then(res => {
    console.log(res);
});
function fetchUserProfileList() {
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
    });
}
/* 函数类型中的泛型 */
function handle(input) {
    return input;
}
const author = "linbudu"; // 使用 const 声明，被推导为 "linbudu"
const authorAge = 18; // 使用 let 声明，被推导为 number
handle(author); // 填充为字面量类型 "linbudu"
handle(authorAge); // 填充为基础类型 number
function swap([start, end]) {
    return [end, start];
}
const swapped1 = swap(["linbudu", 599]);
const swapped2 = swap([null, 599]);
const swapped3 = swap([{ name: "linbudu" }, {}]);
const object2 = { 'a': 1, 'b': '2', 'c': 3 };
function tesddd(text) {
    return text;
}
function handle_(payload) {
    return new Promise((res, rej) => {
        res([payload]);
    });
}
handle_('123')
    .then(res => {
    console.log('handle_::', res);
});
/* class中的泛型 */
/* 内置方法中的泛型 */
function p() {
    return new Promise((resolve, reject) => {
        resolve(true);
    });
}
