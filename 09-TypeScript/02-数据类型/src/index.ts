/* 15. 函数类型：协变与逆变的比较 */
class Animal {
	asPet() {}
}
  
class Dog extends Animal {
	bark() {}
}

class Corgi extends Dog {
	cute() {}
}

type DogFactory = (args: Dog) => Dog;

function transformDogAndBark(dogFactory: DogFactory) {
	const dog = dogFactory(new Dog());
	dog.bark();
}

function makeDogBark(dog: Dog) {
	dog.bark();
}
makeDogBark(new Corgi()); // 没问题
// makeDogBark(new Animal()); // 不行


function fn(dog: Dog) {
	dog.bark();
  }
  
type CorgiFunc = (input: Corgi) => void;
type AnimalFunc = (input: Animal) => void;

const func1: CorgiFunc = fn;
const func2: AnimalFunc = fn;