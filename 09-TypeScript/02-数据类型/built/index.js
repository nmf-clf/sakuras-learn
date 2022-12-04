/* 15. 函数类型：协变与逆变的比较 */
class Animal {
    asPet() { }
}
class Dog extends Animal {
    bark() { }
}
class Corgi extends Dog {
    cute() { }
}
function transformDogAndBark(dogFactory) {
    const dog = dogFactory(new Dog());
    dog.bark();
}
function makeDogBark(dog) {
    dog.bark();
}
makeDogBark(new Corgi()); // 没问题
// makeDogBark(new Animal()); // 不行
function fn(dog) {
    dog.bark();
}
const func1 = fn;
const func2 = fn;
