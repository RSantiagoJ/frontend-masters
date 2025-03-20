const VALIDATE_currentWord_URL =
  "https://currentWords.dev-apis.com/validate-currentWord";
const currentWord_OF_THE_DAY_URL =
  "https://currentWords.dev-apis.com/currentWord-of-the-day";
const letters = document.querySelectorAll(".scoreboard-letter");
const loadingDiv = document.querySelector(".info-bar");
const ANSWER_LENGTH = 5;
const ROUNDS = 6;

const res = await = fetch(currentWord_OF_THE_DAY_URL);
// const {word} = await res.json();
const resObj = await res.json();
const word = resObj.word.toUpperCase();
const wordParts = word.split("");
const done = false;
setLoading(false);
isLoading = false;


async function init() {
  let currentGuess = "";
  let currentRow = 0;
  let isLoading = true;

  function addLetter(letter) {
    if (currentGuess.length < ANSWER_LENGTH) {
      currentGuess += letter;
      // add letter to the end
    } else {
      // replace the last letter
      currentGuess =
        currentGuess.substring(0, currentGuess.length - 1) + letter;
    }

    letters[ANSWER_LENGTH * currentRow + currentGuess.length - 1].innerText =
      letter;
  }

  async function commit() {
    if (currentGuess.length != ANSWER_LENGTH) {
      // do nothing
      return;
    }

    if (currentGuess === word){
      // win
      alert('you win');
      done = true;
      return;
    }
    // Validate Word
    // Mark guess as correct or close
    // Win Lose

    const guessParts = currentGuess.split(""); 
    const map = makeMap(wordParts);
    for(let i = 0; i < ANSWER_LENGTH; i++){
      // Mark as correct
      if (guessParts[i] === wordParts){
        letters[currentRow * ANSWER_LENGTH + i].classList.add("correct");
        map[guessParts[i]]--;
      } 
    }

    for(let i = 0; i < ANSWER_LENGTH; i++){
      
      if (guessParts[i] === wordParts){
        // Do nothing, we already did it
      } else if (wordParts[i].includes(guessParts[i]) && map[guessParts[i]] > 0){
        // Mark as close
        letters[currentRow * ANSWER_LENGTH + i].classList.add("close");
      } else {
        letters[currentRow * ANSWER_LENGTH + i].classList.add("wrong");
      }
    }
    currentRow++;
    currentGuess = "";
    if(currentRow === ROUNDS)
      alert(`you lose, the word was ${word}`);

  }

  function backspace() {
    currentGuess = currentGuess.substring(0, currentGuess.length - 1);

    letters[ANSWER_LENGTH * currentRow + currentGuess.length].innerText = "";
  }

  document.addEventListener("keydown", function handleKeyPress(event) {
    if (done || isLoading){
      return;
    } 
    const action = event.key;
    console.log(action);

    if (action === "Enter") {
      commit();
    } else if (action === "Backspace") {
      backspace();
    } else if (isLetter(action)) {
      addLetter(action.toUpperCase());
    }
  });
}

function isLetter(letter){
  return /^[a-zA-Z]$/.test(letter);
}

function setLoading(isLoading){
  loadingDiv.classList.add('show', isLoading); 
}

function makeMap (array) {
  const obj = {};
  for (let i = 0; i < array.length; i++){
    const letter = array[i];
    if (obj[letter]){
      obj[letter]++;
    } else{
      obj[letter] = 1;
    }
  }
  return obj;
}
init();
