const monthlyRent = 1575;
const yearlyRent = monthlyRent * 12;
console.log(yearlyRent);
const owner = "Jones Properties";
console.log(owner);
console.log("hello world");
console.log("don'\t do that");
console.log("don't do that");
const sentence = "Hello " + owner;
console.log(sentence);
let x = 0;
x = x + 1;
x += 1;
x++;
++x;
console.log(x);

let z = 0;
while (z <= 20) {
  console.log(z);
  z = z + 1;
}

for (let i = 0; i < 20; i++) {
  console.log(i);
}

console.log(addTwo(z));

function addTwo(number) {
  return number + 2;
}

const finalAnswer = addTwo(5);
console.log(finalAnswer);

const city = "Isabela";
const state = "Puerto Rico";
const country = "PR";

logHome(city, state, country);

function logHome(city, state, country) {
  console.log(`You are from ${city}, ${state}, ${country}.`);
}

const meow = function () {
  console.log("meeeeeeeoooooooooow");
};

console.log(meow);

const chirp = () => {
  console.log("chirp");
};
chirp();

if (2 + 2 === 4) {
  console.log("Yay!");
}

function bark() {
  console.log("woof");
}
