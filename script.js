const gameContainer = document.getElementById("game");
const startButton = document.querySelector('#start');

// variables for game logic
let lastCard = null;
let clickDisabled = false;
let score = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];



// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
// IMPLEMENTED AS ANONYMOUS FUNCTION IN EVENT LISTENER
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if(clickDisabled || event.target.classList.length > 1) {
    return;
  }

  event.target.classList.add('flipped');
  event.target.style.background = event.target.classList[0];

  if(lastCard) {
    if(event.target != lastCard) {
      score += 1;
      console.log(score);
      
      if(lastCard.classList[0] != event.target.classList[0]) {
        clickDisabled = true;
        const thing = lastCard;
        setTimeout(function() {
          thing.classList.toggle('flipped');
          event.target.classList.toggle('flipped');
          thing.removeAttribute('style');
          event.target.removeAttribute('style');
          clickDisabled = false;
        }, 1000);
      } else {
        let children = gameContainer.children;
        for (let i = 0; i < children.length; i++) {
          if(children[i].classList.length < 2) {
              break;
          }
          if(i == children.length-1) {
            console.log('win');
            if(!localStorage.getItem('High Score') || localStorage.getItem('High Score') > score) {
              localStorage.setItem('High Score', score);
            }
            console.log("High Score " + localStorage.getItem('High Score'));

          }
        }
      }
      lastCard = null;
    }

  } else {
    lastCard = event.target;
  }
}

// when the DOM loads
// MOVED TO init()
//createDivsForColors(shuffledColors);

// initialization function shuffles deck, creates game board, and resets game variables
function init() {
  while(gameContainer.children.length > 0) {
    const first = gameContainer.children[0];
    first.remove();
  }
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
  lastCard = null;
  clickDisabled = false;
  score = 0;
  startButton.textContent = 'Reset';
}

startButton.addEventListener('click', init);
