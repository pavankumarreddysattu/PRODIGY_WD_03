document.addEventListener('DOMContentLoaded', () => {
let currentPlayer = 'X'; // Start with player 'X'
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Empty game board
let isGameActive = true; // Game status

const player1Name = 'Player 1';
const player2Name = 'Player 2';
const statusDisplay = document.querySelector('#status');
const cells = document.querySelectorAll('.cell');
const resetButton = document.querySelector('#reset-btn');

const updateStatus = () => {
    const currentPlayerName = currentPlayer === 'X' ? player1Name : player2Name;
    statusDisplay.innerHTML = `It's ${currentPlayerName}'s turn`;
};

 // Highlight the winning cells
 const highlightWinningCells = (winningCells) => {
    winningCells.forEach(index => {
        const winningCell = document.getElementById(`cell-${index}`);
        winningCell.style.backgroundColor = 'green'; 
    });
};

// Check for a winner or a draw
const checkWinner = () => {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let roundWon = false;
    let winningCells =[];

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            winningCells =[a,b,c];
            break;
        }
    }

   if (roundWon) {
        const winningPlayer = currentPlayer === 'X' ? player1Name : player2Name;
        statusDisplay.innerHTML = `${winningPlayer} is the winner!`;
        isGameActive = false;
        highlightWinningCells(winningCells);
        return;
    }

    // Check for a draw
    if (!gameBoard.includes('')) {
        statusDisplay.innerHTML = 'Game is a draw!';
        isGameActive = false;
        return;
    }

    // If no win or draw, switch the player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
};

// Handle user click on a cell
const handleCellClick = (event) => {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('id').split('-')[1]);

    if (gameBoard[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    gameBoard[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    checkWinner();
};

// Reset the game
const resetGame = () => {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.style.backgroundColor = ''; // Reset the background color
    });
    updateStatus();
};

// Add event listeners to cells and reset button
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click',resetGame);

// Initialize the game status
updateStatus();
});