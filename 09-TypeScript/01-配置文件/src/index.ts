/*
 * @Author: niumengfei
 * @Date: 2022-11-10 20:41:37
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-11-10 20:41:41
 */
class Student {
    fullName: string;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

document.body.innerHTML = greeter(user);