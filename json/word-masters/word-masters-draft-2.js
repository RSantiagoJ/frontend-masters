const VALIDATE_WORD_URL = "https://words.dev-apis.com/validate-word";
const WORD_OF_THE_DAY_URL = "https://words.dev-apis.com/word-of-the-day";
const tiles = document.querySelectorAll(".scoreboard-letter");
const loadingDiv = document.querySelector(".info-bar");

let wordOfTheDay = "";
let turns = 1;
let word = "";
let gameOverStatus = false;
let winnerStatus = false;
let matchStatus = true;

const getWordOfTheDayButton = document.querySelector(".word-of-the-day-button");

// Helper functions
const isLetter = (letter) => {
  return /^[a-zA-Z]$/.test(letter);
};

const showWordOfTheDay = () => {
  const textArea = document.getElementById("word-of-the-day-text");
  textArea.value = wordOfTheDay;
};

const getWordOfTheDay = async () => {
  try {
    const response = await fetch(WORD_OF_THE_DAY_URL);
    const { word } = await response.json();
    wordOfTheDay = word;
    showWordOfTheDay();
  } catch (error) {
    console.log("Error fetching word of the day:", error);
  }
};

const validateWord = async (word) => {
  try {
    const response = await fetch(VALIDATE_WORD_URL, {
      method: "POST",
      body: JSON.stringify({ word: word }),
    });

    if (!response.ok) {
      throw (
        (new Error("HTTP error! status: $(response.status}"),
        console.log("Word Validation response: ", await response.json()))
      );
    }
  } catch (error) {
    console.error("Error ocurred while validating word:", error);
  }
};

const compareLetter = (letter) => {
  const tile = tiles[turns - 1];
  let matched = false;

  for (let i = 0; i < wordOfTheDay.length; i++) {
    if (letter === wordOfTheDay.charAt(i)) {
      if (tile instanceof HTMLElement) {
        tile.style.backgroundColor = "green";
        matched = true;
        break;
      }
    }
  }

  if (!matched) {
    tile.style.backgroundColor = "orange";
  }
};

function addLetter(letter) {
  word = word + letter;
  compareLetter(letter);
  tiles[turns - 1].innerText = letter;

  if (turns % 5 === 0) {
    if (word === wordOfTheDay) {
      winnerStatus = true;
    } else {
      matchStatus = false;
      word = "";
    }
  }

  turns++;

  if (turns === 31) {
    console.log("game over");
    gameOverStatus = true;
  }
}

const handleKeyPress = (event) => {
  const action = event.key;

  if (!matchStatus) {
    alert("Match not found");
    matchStatus = true;
  }

  if (gameOverStatus) {
    alert("Game Over!, word of the day : ", wordOfTheDay);
  } else if (winnerStatus) {
    alert("You win!");
  } else {
    if (action === "Enter") commit();
    else if (action === "Backspace") backspace();
    else if (isLetter(action)) addLetter(action);
  }
};

// Event Listeners
getWordOfTheDayButton.addEventListener("click", async function () {
  await getWordOfTheDay();
  showWordOfTheDay();
});

function commit() {}
function backspace() {
  let subString = word.substring(0, word.length - 1);
  word = subString;
  tiles[turns - 2].innerText = "";
  tiles[turns - 2].style.backgroundColor = "";
  turns--;
}

async function init() {
  console.log("Initializing game");
  console.log("getting word of the day");
  await getWordOfTheDay();
  console.log(`word of the day: ${wordOfTheDay}`);

  document.addEventListener("keydown", handleKeyPress);
}

getWordOfTheDayButton.addEventListener("click", async () => {
  await getWordOfTheDay();
  showWordOfTheDay();
});

init();
