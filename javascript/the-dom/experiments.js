let string = "Hi my name is placeholder!";
string = string.substring(3, 7);

console.log(string);

const square = document.querySelector(".red-square");
//const myImg = new HTMLImageElement()

if (square instanceof HTMLElement) {
  square.style.backgroundColor = "blue";
  square.style.width = "500px";
  //square.remove;
  square.style.boxSizing = "content-box";
  square.style.marginBottom = "50px";
}

console.log("starting querySelector Testing");
// querySelector using class
//const elements = document.querySelectorAll(".js-target");
// querySelector using type of element
const elements = document.querySelectorAll("li");
//console.log(myList);

for (let i = 0; i < elements.length; i++) {
  console.log(elements[i]);
  const currentElement = elements[i];
  currentElement.innerText = "Modified";
}
//using browser console to remove last inspected element ($0)
// x = $0
// x.remove()
