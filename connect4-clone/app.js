//==========================================
const container = document.getElementById('container');
let para = document.getElementById('para'); //for the paragraph text below the title

const playerRed = 'Red';
const playerYellow = 'Yellow';
let currPlayer = 1; //Sets the current player, 1 = Red & 2 = Yellow

let gameOver = false; //Used to prevent players from contuineing the game, after a winner has been found.
let gameArray = [ //used to store where player circles are located
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0], 
];

window.addEventListener("load", gamePlay); //When the window is loaded, calls the game function

//====Game Logic====
function gamePlay(){

  //Generates rows and colums for inital game setup
  for (let i = 0; i < 7; i++){
    let genCol = document.createElement('div');
    genCol.classList.add('col');
    container.append(genCol);
    for (let r = 0; r < 6; r++){
      let genRow = document.createElement('div');
      genRow.classList.add('row');
      genRow.addEventListener('click', rowClicked)
      genCol.append(genRow);
    }
  }

  //Detects if a empty circle has been clicked
  function rowClicked(){
    let colIndex = Array.from(this.parentNode.parentNode.children).indexOf(this.parentNode);
    let rowIndex = Array.from(this.parentNode.children).indexOf(this);

    if(!gameOver){ //prevents the red/yellow circle from pushing the coloumn
      this.classList.add('pegcolor');
    }

    if (!gameOver && gameArray[rowIndex][colIndex] === 0) {
      // Update the gameArray with 1 at the corresponding column index and row index
      
      if (currPlayer === 1) {
        this.style.backgroundColor = "red";
        this.style.border = "inset 5px #540101";
        gameArray[rowIndex][colIndex] = 1;

        para.innerText = 'Yellow\'s turn';
      } else {
        this.style.backgroundColor = "yellow";
        this.style.border = "inset 5px #9e8c02";
        gameArray[rowIndex][colIndex] = 2;
        para.innerText = 'Red\'s turn';
      }
  
      // Toggle the current player
      currPlayer = (currPlayer === 1) ? 2 : 1;
      checkWin(); //check win condition
    }
  }

  //=========Win Condition=============
  //Basically, checks if the index numbers in the game array match 4 in a row, if a match is found, a player wins the game.
  //1 = red and 2 = Yellow

  function checkWin(){
    //col-Detect
    for (let col = 0; col < gameArray[0].length; col++) {
      if (
          gameArray[0][col] === gameArray[1][col] &&
          gameArray[1][col] === gameArray[2][col] &&
          gameArray[2][col] === gameArray[3][col] &&
          gameArray[0][col] !== 0 || gameArray[5][col] === gameArray[4][col] &&
          gameArray[4][col] === gameArray[3][col] &&
          gameArray[3][col] === gameArray[2][col] &&
          gameArray[5][col] !== 0 || gameArray[4][col] === gameArray[3][col] &&
          gameArray[3][col] === gameArray[2][col] &&
          gameArray[2][col] === gameArray[1][col] &&
          gameArray[4][col] !== 0
      ) {
          gameOver = true;
          para.innerText = (gameArray[0][col] === 1) ? `Someone wins the game!` : `Someone wins the game!`;
          break; // Break out of the loop once a win condition is found
      }
    }
    //row-Detect
    for (let row = 0; row < gameArray.length; row++) {
      if (
          gameArray[row][0] === gameArray[row][1] &&
          gameArray[row][1] === gameArray[row][2] &&
          gameArray[row][2] === gameArray[row][3] &&
          gameArray[row][0] !== 0 || gameArray[row][5] === gameArray[row][4] &&
          gameArray[row][4] === gameArray[row][3] &&
          gameArray[row][3] === gameArray[row][2] &&
          gameArray[row][5] !== 0 || gameArray[row][4] === gameArray[row][3] &&
          gameArray[row][3] === gameArray[row][2] &&
          gameArray[row][2] === gameArray[row][1] &&
          gameArray[row][4] !== 0 || gameArray[row][6] === gameArray[row][5] && gameArray[row][5] === gameArray[row][4] && gameArray[row][4] === gameArray[row][3] && gameArray[row][6] !== 0
      ) {
          gameOver = true;
          para.innerText = (gameArray[row][0] === 1) ? `Someone wins the game!` : `Someone wins the game!`;
          break; // Break out of the loop once a win condition is found
      }
    }
  //diangle-detect
  for (let i = 0; i <= 2; i++) {
    for (let j = 0; j <= 3; j++) {
        if (
            gameArray[i][j] === gameArray[i + 1][j + 1] &&
            gameArray[i + 1][j + 1] === gameArray[i + 2][j + 2] &&
            gameArray[i + 2][j + 2] === gameArray[i + 3][j + 3] &&
            gameArray[i][j] !== 0
        ) {
            gameOver = true;
            para.innerText = (gameArray[i][j] === 1) ? `Someone wins the game!` : `Someone wins the game!`;
            return; // Exit the function once a win condition is found
        }
    }
}

// diangle-detect from top-right to bottom-left
for (let i = 0; i <= 2; i++) {
    for (let j = 3; j <= 6; j++) {
        if (
            gameArray[i][j] === gameArray[i + 1][j - 1] &&
            gameArray[i + 1][j - 1] === gameArray[i + 2][j - 2] &&
            gameArray[i + 2][j - 2] === gameArray[i + 3][j - 3] &&
            gameArray[i][j] !== 0
        ) {
            gameOver = true;
            para.innerText = (gameArray[i][j] === 1) ? `${playerRed} wins the game!` : `${playerYellow} wins the game!`;
            return; // Exit the function once a win condition is found
        }
    }
  }
}
}
//==========================================