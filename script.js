const boxes = Array.from(document.getElementsByClassName("box"));

const markO = "0";
const markX = "X";

const spaces = [];

let currentPlayer;

const restart = () => {
  spaces.forEach((space, index) => {
    spaces[index] = null;
  });

  //add event listeners to boxes on the start of each game
  boxes.forEach((box) => {
    box.innerText = "";
    box.addEventListener("click", boxClicked);
  });

  playText.innerText = `Let's Play!`;
  currentPlayer = markO;
};

const restartBtn = document.getElementById("restartBtn");
restartBtn.addEventListener("click", restart);

const isADraw = () => {
  for (let index = 0; index < 9; index++) {
    if (!spaces[index]) {
      return false;
    }
  }
  return true;
};

const boxClicked = (e) => {
  const id = e.target.id;

  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (playerHasWon()) {
      playText.innerText = `${currentPlayer} has won!`;
      return;
    }

    if (isADraw()) {
      playText.innerText = `It's a draw!`;
      return;
    }

    currentPlayer = currentPlayer === markO ? markX : markO;
  }
};

const checkWin = (firstIndex, secondIndex, thirdIndex) => {
  if (
    spaces[firstIndex] === currentPlayer &&
    spaces[secondIndex] === currentPlayer &&
    spaces[thirdIndex] === currentPlayer
  ) {
    disableEventListeners();
    return true;
  }
};

const playerHasWon = () => {
  if (spaces[0] === currentPlayer) {
    return checkWin(0, 1, 2) || checkWin(0, 4, 8) || checkWin(0, 3, 6);
  }

  if (spaces[2] === currentPlayer) {
    return checkWin(2, 4, 6) || checkWin(2, 5, 8);
  }

  return checkWin(3, 4, 5) || checkWin(6, 7, 8) || checkWin(1, 4, 7);
};

const disableEventListeners = () => {
  //disable event listeners on each box after the game has ended
  boxes.forEach((box, index) => {
    box.removeEventListener("click", boxClicked);
  });
};

//function to draw borders for each box to create the board
const drawBoard = () => {
  boxes.forEach((box, index) => {
    let styleString = "";
    if (index < 3) {
      //top row
      styleString += "border-bottom: 3px solid var(--purple);";
    }
    if (index % 3 === 2) {
      //right col
      styleString += "border-left: 3px solid var(--purple);";
    }
    if (index > 5) {
      //bottom row
      styleString += "border-top: 3px solid var(--purple);";
    }
    if (index % 3 === 0) {
      //left col
      styleString += "border-right: 3px solid var(--purple);";
    }

    box.style = styleString;
    box.addEventListener("click", boxClicked); //add event listener to each of the box
  });
};

restart();
drawBoard();
