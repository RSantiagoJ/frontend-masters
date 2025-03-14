const button = document.querySelector(".event-button");
// callback function is only run when event happens
button.addEventListener("click", function () {
  console.log("Hi");
  alert("Hi!");
});
// keyup, keydown, right click, etc...

const input = document.querySelector(".input-to-copy");
const paragraph = document.querySelector(".p-to-copy-to");

input.addEventListener("keydown", function () {
  paragraph.innerText = input.value;
});

document
  .querySelector(".button-container")
  .addEventListener("click", function (event) {
    alert(`You clicked button ${event.target.innerText}`);
  });
