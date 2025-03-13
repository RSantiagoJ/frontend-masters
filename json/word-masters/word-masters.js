const character = "f";
const timesToRepeat = 5;
let answer = "";

for (let i = 0; i < timesToRepeat; i++) {
  answer = answer + character;
}
console.log(answer);
const person = {
  name: "Alice",
  greet: function () {
    console.log(this.name); // 'this' refers to the `person` object
  },
};

person.greet(); // Logs: 'Alice'

const VALIDATE_WORD_URL = "https://words.dev-apis.com/validate-word";
const WORD_OF_THE_DAY_URL = "https://words.dev-apis.com/word-of-the-day";
//const wordOfTheDay = document.getElementById("word-of-the-day-target");

let wordOfTheDay = "";

const letters = document.querySelectorAll(".scoreboard-letter");
console.log(letters);

const loadingDiv = document.querySelector(".info-bar");

async function getWordOfTheDay() {
  const promise = await fetch(WORD_OF_THE_DAY_URL);
  const processedResponse = await promise.json();
  wordOfTheDay = processedResponse.word;
}

function showWordOfTheDay() {
  const textArea = document.getElementById("word-of-the-day-text");
  textArea.value = wordOfTheDay;
}

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

function keyDown(value) {
  console.log("keyDown triggered");
  if (isLetter(value)) {
    handleLetter(value);
  } else {
    //handleNumber(value);
  }
  //rerender();
}

const getWordOfTheDayButton = document.querySelector(".word-of-the-day-button");
getWordOfTheDayButton.addEventListener("click", function () {
  getWordOfTheDay();
  showWordOfTheDay();
});

async function getWordOfTheDay() {
  const promise = await fetch(WORD_OF_THE_DAY_URL);
  const processedResponse = await promise.json();
  const wordOfTheDayString = processedResponse.word;
  wordOfTheDay = wordOfTheDayString;
  showWordOfTheDay();
  console.log(letters);
}

async function validateWord() {
  try {
    const promise = await fetch(VALIDATE_WORD_URL, {
      method: "POST",
      body: JSON.stringify({ word: "crane" }),
    });

    console.log("fetch request completed");
    const promisedResponse = await promise.json();
    console.log("Response received:", promisedResponse);
  } catch (error) {
    console.error("Error ocurred while validating word:", error);
  }
  if (!promise.ok) {
    throw new Error("HTTP error! status: $(promise.status}");
  }
}

function commit() {}
function backspace() {}
function addLetter() {}
async function init() {
  document.addEventListener("keydown", function handleKeyPress(event) {
    const action = event.key;
    console.log(action);

    if (action === "Enter") {
      commit();
    } else if (action === "Backspace") {
      backspace();
    } else if (isLetter()) {
      addLetter();
    }
  });
}

init();
