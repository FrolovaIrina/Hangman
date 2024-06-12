const words = ['PELI', 'OPISKELU', 'KIRJA', 'OHJELMOINTI', 'KEHITYS'];
let correctWord = words[Math.floor(Math.random() * words.length)];
let guessedWord = Array(correctWord.length).fill('_');
let wrongGuesses = 0;

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ'.split('');
const maxWrongGuesses = 6;

const correctSound = new Audio('sounds/correct.mp3');
const wrongSound = new Audio('sounds/wrong.mp3');

document.addEventListener('DOMContentLoaded', () => {
    updateGuessedWord();
    createAlphabetButtons();
});

function createAlphabetButtons() {
    const alphabetDiv = document.getElementById('alphabet');
    alphabetDiv.innerHTML = '';
    alphabet.forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.addEventListener('click', () => handleGuess(letter));
        alphabetDiv.appendChild(button);
    });
}

function handleGuess(letter) {
    const buttons = document.querySelectorAll('#alphabet button');
    buttons.forEach(button => {
        if (button.textContent === letter) {
            button.disabled = true;
        }
    });

    let correctGuess = false;

    if (correctWord.includes(letter)) {
        correctSound.play();
        correctWord.split('').forEach((char, index) => {
            if (char === letter) {
                guessedWord[index] = letter;
                correctGuess = true;
            }
        });
    } else {
        wrongSound.play();
        wrongGuesses++;
        updateHangmanImage();
    }

    updateGuessedWord();

    if (wrongGuesses >= maxWrongGuesses) {
        setTimeout(() => {
            alert('Voi ei! Oikea sana oli: ' + correctWord);
            resetGame();
		  }, 100);
		 
    } else if (!guessedWord.includes('_')) {
        setTimeout(() => {
            alert('Hurra! Oikea sana on: ' + correctWord);
            resetGame();
        }, 100);
    }
}

function updateGuessedWord() {
    document.getElementById('word').textContent = guessedWord.join(' ');
}

function updateHangmanImage() {
    const hangmanImage = document.getElementById('peli-image');
    hangmanImage.src = `images/peli${wrongGuesses}.jpg`;
}

function resetGame() {
    correctWord = words[Math.floor(Math.random() * words.length)];
    guessedWord = Array(correctWord.length).fill('_');
    wrongGuesses = 0;
    updateGuessedWord();
    updateHangmanImage();
    createAlphabetButtons();
}
