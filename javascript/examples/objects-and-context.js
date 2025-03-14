const person2 = {
  name: "Alice",
  greet: function () {
    console.log(this.name); // 'this' refers to the `person` object
  },
};

person2.greet(); // Logs: 'Alice'

const sentence = "ThiS Is A ";
let string = "my name is brian";
let subString = string.substring(14, 15); // Use substring, not subString
console.log(subString);

const number = 5.3;
const roundedNumber = Math.round(number);
const flooredNumber = Math.floor(number);

console.log(`rounded: ${roundedNumber} , floored: ${flooredNumber}`);
console.log(string.includes("yes"));
console.log(string.includes("name"));

const person = {
  name: "Brian",
  age: "5000",
  favoriteFood: "Lasagna",
};

console.log(person);
console.log(person.age);
console.log(person.favoriteFood);
console.log(person["name"]);
const propertyName = "name";
console.log(person[propertyName]);

const dog = {
  name: "spike",
  speak() {
    console.log("woof!");
  },
};

dog.speak();

const fish = {
  name: {
    first: "fido",
    last: "jones",
  },
  speak() {
    console.log("gulp gulp");
  },

  getName() {
    return this.name.first;
  },
};

fish.speak();
console.log(fish.name.first);
console.log(fish.name.last);
console.log(console);
console.log(Math); // Logs the Math object
console.log(Math.PI); // Logs the value of PI
console.log(Math.abs(-5)); // Logs: 5
console.log(fish.getName());

//using bind
const getPulledName = fish.getName.bind(fish);
console.log(getPulledName());
console.log(this === window);
