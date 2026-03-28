var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board;

var rows = 6;
var columns = 7;

// Har column ka lowest empty row
var currColumns = [5, 5, 5, 5, 5, 5, 5];

window.onload = function () {
    setGame();
};

function setGame() {
    board = [];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');

            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);

            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");
    let c = parseInt(coords[1]);

    // Column full hai to kuch mat karo
    let r = currColumns[c];
    if (r < 0) {
        return;
    }

    board[r][c] = currPlayer;

    let tile = document.getElementById(r.toString() + "-" + c.toString());

    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
    } else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
    }

    currColumns[c] = r - 1;

    checkWinner();
}

function checkWinner() {

    // Horizontal
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (
                board[r][c] != ' ' &&
                board[r][c] == board[r][c + 1] &&
                board[r][c] == board[r][c + 2] &&
                board[r][c] == board[r][c + 3]
            ) {
                setWinner(r, c);
                return;
            }
        }
    }

    // Vertical
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (
                board[r][c] != ' ' &&
                board[r][c] == board[r + 1][c] &&
                board[r][c] == board[r + 2][c] &&
                board[r][c] == board[r + 3][c]
            ) {
                setWinner(r, c);
                return;
            }
        }
    }

    // Diagonal \
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (
                board[r][c] != ' ' &&
                board[r][c] == board[r + 1][c + 1] &&
                board[r][c] == board[r + 2][c + 2] &&
                board[r][c] == board[r + 3][c + 3]
            ) {
                setWinner(r, c);
                return;
            }
        }
    }

    // Diagonal /
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (
                board[r][c] != ' ' &&
                board[r][c] == board[r - 1][c + 1] &&
                board[r][c] == board[r - 2][c + 2] &&
                board[r][c] == board[r - 3][c + 3]
            ) {
                setWinner(r, c);
                return;
            }
        }
    }
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");

    if (board[r][c] == playerRed) {
        winner.innerText = "Red Wins!";
    } else {
        winner.innerText = "Yellow Wins!";
    }

    gameOver = true;
}