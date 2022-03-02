document.addEventListener("DOMContentLoaded", () => {

  let guessedWordCount = 0; // The count of letters in a guessed word.
  let availableSpace = 1; // The amount of squares left available.
  let guessedWords = [[]]; // Array that stores the words already guessed.
  let word; // The current winning word.

  const playAgainBtn = document.getElementById('play-again__btn');
  const keys = document.getElementsByClassName("keyboard__button");

  // GETS THE NEW WINNING WORD FROM WORD.JS.
  const getNewWord = () => {

    const randomIndex = Math.floor(Math.random() * frequentWords.length);

    word = frequentWords[randomIndex];
  }


  // CREATES THE WORDLE GAME BOARD, ADDING AN ID TO EACH SQUARE.
  const createBoard = () => {

    const wordleBoard = document.getElementById("board");

    for (let i = 0; i < 30; i++) {
      let square = document.createElement("div");
      square.classList.add("board__square");
      square.setAttribute("id", i + 1);
      wordleBoard.appendChild(square);
    }
  }


  // CLEARS THE BOARD AT THE END OF THE GAME LEAVING JUST THE BACKGROUND COLOR CHANGES AND DISABLING VIRTUAL KEYBOARD.
  const clearBoard = () => {

    for (let i = 0; i < 30; i++) {
      let square = document.getElementById(i + 1);
      square.textContent = "";
    }

    for (let key of keys) {
      key.disabled = true;
    }
  }


  // ADDS THE PASSED IN LETTER TO THE CURRENT GUESSED WORD ARRAY.
  const addLetters = (letter) => {

    const currentWordLetters = guessedWords[guessedWords.length - 1];

    if (currentWordLetters && currentWordLetters.length < 5) {
      currentWordLetters.push(letter);
      
      const boardSquare = document.getElementById(availableSpace);
      boardSquare.textContent = letter;

      availableSpace += 1;
    }
  }


  // LOOKS FOR DUPLICATES OF THE SELECTED LETTER IN THE WINNING WORD.
  const findRepeatLetters = (letter, word) => {

    const repeats = [];
    let index = word.indexOf(letter);
    
    // Continues searching for more repeats and adds them to array.
    while (index != -1) {
      repeats.push(index);
      index = word.indexOf(letter, index + 1);
    }
    
    return repeats;
  }


  // CHANGES THE TILE COLOR BASED ON EACH LETTERS POSTION VS THE WINNING WORD'S LETTERS.
  const getSquareColor = (letter, index, currentWordLetters) => {

    // selected letter is not in the winning word.
    if (!word.includes(letter)) {
      return "square__letter--incorrect";
    }

    // selected letter is in the winning word but incorrect position.
    if (letter === word.charAt(index)) {
      return "square__letter--correct-letter-and-place";
    }

    const guessedMoreThanOnce = currentWordLetters.filter((element) => element === letter);

    // selected letter is guessed more than once.
    if (guessedMoreThanOnce.length > 1) {
      return "square__letter--correct";
    }

    const existsMoreThanOnce = word.split("").filter((element) => element === letter);

    // selected letter is guessed more than once and exists more than once.
    if (existsMoreThanOnce.length > 1) {
      return "square__letter--correct";
    }

    const hasBeenGuessedAlready = currentWordLetters.indexOf(letter) < index;

    const repeats = findRepeatLetters(letter, word.split(""));
    const otherRepeats = repeats.filter((element) => element !== index);

    const isGuessedCorrectlyLater = otherRepeats.some((element) => element > index && currentWordLetters[element] === letter);

    if (!hasBeenGuessedAlready && !isGuessedCorrectlyLater) {
      return "square__letter--correct";
    }

    return "square__letter--incorrect";
  }


  // HANDLES LOGIC FOR SUBMITTING A GUESSED WORD AND DETERMINES OUTCOME BASED ON LETTERS SUBMITTED.
  const handleSubmitWord = () => {

    const alert = document.getElementById('wordle__alert');

    const currentWordLetters = guessedWords[guessedWords.length - 1];
    const guessedWord = currentWordLetters.join("");

    if (guessedWord.length !== 5) {
      alert.textContent = 'Word Must Be 5 Letters. Try Again.';
      alert.classList.remove('fade-out__alert');
      void alert.offsetWidth;
      alert.classList.add('fade-out__alert');
    }
    else {
      if(!wordsArray.includes(guessedWord)) {
        alert.textContent = 'Word Not Recognised. Try Again.';
        alert.classList.remove('fade-out__alert');
        void alert.offsetWidth;
        alert.classList.add('fade-out__alert');
      }
      else {
        const firstLetterPosition = (guessedWordCount * 5) + 1;

        currentWordLetters.forEach((letter, index) => {
          setTimeout(() => {
            const squareColor = getSquareColor(letter, index, currentWordLetters);
            
            if (squareColor) {
              const letterId = firstLetterPosition + index;
              const letterElement = document.getElementById(letterId);
              letterElement.classList.add(squareColor);
    
              const keyboardKey = document.querySelector(`[data-key=${letter}]`);
              keyboardKey.classList.add(squareColor);
            }
          }, index * 200);
        });
    
        guessedWordCount += 1;
    
        if (guessedWord === word) {
          alert.textContent = 'Congrats! You Guessed Correctly!';
          alert.classList.remove('fade-out__alert');
          void alert.offsetWidth;
          alert.classList.add('fade-out__alert');

          setTimeout(() => {
            playAgainBtn.style.display = 'block';
            clearBoard();
          }, 1100);
        }
    
        if (guessedWords.length > 5 && guessedWord !== word) {
          alert.textContent = `No More Guesses! The Word Is "${word.toUpperCase()}".`;
          alert.classList.remove('fade-out__alert');
          void alert.offsetWidth;
          alert.classList.add('fade-out__alert');

          setTimeout(() => {
            playAgainBtn.style.display = 'block';
            clearBoard();
          }, 1100)
        }
    
        guessedWords.push([]);
      }
    }
  }


  // HANDLES LOGIC FOR DELETING A LETTER FROM THE CURRENT GUESSED WORD.
  const handleDeleteWord = () => {

    if (guessedWords[guessedWords.length - 1].length < 1) {
      return;
    }
    else {
      guessedWords[guessedWords.length - 1].pop();
  
      const lastLetter = document.getElementById(availableSpace - 1);
      lastLetter.innerHTML = "";

      availableSpace = availableSpace - 1;
    }
  }


  // ADDS FUNCTIONALITY TO THE VIRTUAL KEYS. ADDING LETTERS FOR LETTER KEYS, SUBMIT FOR ENTER KEY, AND DELETE FOR DELETE KEY.
  const handleKeyboardClicks = () => {

    for (let key of keys) {
      key.addEventListener('click', (e) => {
        const keyClick = e.target.getAttribute('data-key');

        if (keyClick === "enter") {
          handleSubmitWord();
          return;
        }
        else if (keyClick === "del") {
          handleDeleteWord();
          return;
        }
        else {
          addLetters(keyClick);
        }
      });
    }
  }


  // PROVIDES EVENT LISTENERS FOR THE HELP MODAL FUNCTIONALITY.
  const helpModal = () => {

    const helpModal = document.getElementById("modal__help");
    const helpButton = document.getElementById("modal__help-btn");
    const closeButton = document.getElementById("help__close-btn");

    helpButton.addEventListener("click", () => {
      helpModal.style.display = "block";
    });

    closeButton.addEventListener("click", () => {
      helpModal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target == helpModal) {
        helpModal.style.display = "none";
      }
    });
  }


  // RESETS THE GAME BOARD TO PLAY AGAIN.
  const resetBoard = () => {
    for (let i = 0; i < 30; i++) {
      let square = document.getElementById(i + 1);

      square.classList.remove('square__letter--incorrect');
      square.classList.remove('square__letter--correct');
      square.classList.remove('square__letter--correct-letter-and-place');
    }

    for (let key of keys) {
      key.disabled = false;

      key.classList.remove('square__letter--incorrect');
      key.classList.remove('square__letter--correct');
      key.classList.remove('square__letter--correct-letter-and-place');
    }

    getNewWord();
    guessedWords = [[]];
    guessedWordCount = 0;
    availableSpace = 1;

    playAgainBtn.style.display = 'none';
  }


  getNewWord();
  createBoard();
  handleKeyboardClicks();
  helpModal();
  playAgainBtn.addEventListener('click', resetBoard);
});