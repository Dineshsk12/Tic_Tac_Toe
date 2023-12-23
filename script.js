let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;

const startPage = document.getElementById('start-page');
const gamePage = document.getElementById('game-page');
const resultScreen = document.getElementById('result-screen');
const resultMessage = document.getElementById('result-message');
const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');

function startGame() {
    startPage.style.display = 'none';
    gamePage.style.display = 'block';
    resetGame();
}

function renderBoard() {
    boardElement.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.textContent = gameBoard[i];
        cell.addEventListener('click', handleCellClick);
        boardElement.appendChild(cell);
    }
}

function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        renderBoard();
        if (checkWin() || checkDraw()) {
            endGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            setMessage(`Player ${currentPlayer}'s turn`);
        }
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            showResult(`Player ${currentPlayer} wins!`);
            return true;
        }
    }

    return false;
}

function checkDraw() {
    if (!gameBoard.includes('')) {
        showResult("It's a draw!");
        return true;
    }
    return false;
}

function endGame() {
    gameActive = false;
    resultScreen.style.display = 'block';
}

function setMessage(text) {
    messageElement.textContent = text;
}

function showResult(text) {
    resultMessage.textContent = text;
    resultScreen.style.display = 'block';
}

function resetGame() {
    resultScreen.style.display = 'none';
    gameActive = true;
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    renderBoard();
    setMessage(`Player ${currentPlayer}'s turn`);
}

// Initial setup
startPage.style.display = 'block';
gamePage.style.display = 'none';
