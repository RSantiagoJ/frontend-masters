const VALIDATE_WORD_URL = "https://words.dev-apis.com/validate-word";
const WORD_OF_THE_DAY_URL = "https://words.dev-apis.com/word-of-the-day";
const tiles = document.querySelectorAll(".scoreboard-letter");
const loadingDiv = document.querySelector(".info-bar");

let wordOfTheDay = "";
let turns = 1;
let word = "";
let gameOverStatus = false;
let winnerStatus = false;

const getWordOfTheDayButton = document.querySelector(".word-of-the-day-button");

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
    console.log("key is a valid letter");
  } else {
    //handleNumber(value);
  }
  //rerender();
}

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
}

async function validateWord(word) {
  try {
    const promise = await fetch(VALIDATE_WORD_URL, {
      method: "POST",
      body: JSON.stringify({ word: word }),
    });

    if (!promise.ok) {
      throw new Error("HTTP error! status: $(promise.status}");
    }
    console.log("fetch request completed");
    const promisedResponse = await promise.json();
    console.log("Response received:", promisedResponse);
  } catch (error) {
    console.error("Error ocurred while validating word:", error);
  }
}

function compareLetter(letter) {
  console.log("comparing letter");
  console.log(tiles[turns - 1]);
  for (let i = 0; i < wordOfTheDay.length; i++) {
    //console.log(`substring to compare: ${word.substring(i)}`);
    if (letter === wordOfTheDay.charAt(i)) {
      console.log("match");
      console.log(
        `letter : ${letter} , wordOfTheDay SubString : ${wordOfTheDay.charAt(
          i
        )}`
      );
      if (tiles[turns - 1] instanceof HTMLElement) {
        console.log("go green");
        tiles[turns - 1].style.backgroundColor = "green";
      }
    }
  }
}
function commit() {}
function backspace() {}
function addLetter(letter) {
  word = word + letter;
  let match = false;
  compareLetter(letter);

  tiles[turns - 1].innerText = letter;
  if ((turns != 0) & (turns % 5 === 0)) {
    console.log("row complete");
    console.log(`guessed word : ${word}`);

    if (word === wordOfTheDay) {
      console.log("Winner!!!!!!!!!!");
      winnerStatus = true;
      return;
    } else {
      console.log("word does not match, please try again");
    }
    //compareWord(word);
    word = "";
  }

  turns++;

  if (turns === 31) {
    console.log("game over");
    gameOverStatus = true;
  }
}

async function init() {
  console.log("called init function");
  console.log("getting word of the day");
  await getWordOfTheDay();
  console.log(`word of the day: ${wordOfTheDay}`);

  document.addEventListener("keydown", function handleKeyPress(event) {
    console.log("in event listener");
    console.log(`turn : ${turns}`);
    const action = event.key;
    console.log(`key pressed: ${action}`);
    console.log("entering conditionals");

    if (gameOverStatus === true) {
      alert("Game Ova Son");
    } else if (winnerStatus === true) {
      alert("You win");
    } else if (gameOverStatus === false) {
      if (action === "Enter") {
        console.log("invoking commit");
        commit();
      } else if (action === "Backspace") {
        console.log("invoking backspace");
        backspace();
      } else if (isLetter(action)) {
        console.log("invoking add letter");
        addLetter(action);
      }

      console.log("exiting conditionals");
    }
  });
}

init();
