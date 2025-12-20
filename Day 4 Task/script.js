// 1. Initial Variables
let currentPlayer = "X"; // Game starts with X
let gameActive = true;   // Game is running
let gameState = ["", "", "", "", "", "", "", "", ""]; // Empty board

// 2. Winning Combinations (Indices)
// Rows: [0,1,2], [3,4,5], [6,7,8]
// Cols: [0,3,6], [1,4,7], [2,5,8]
// Diagonals: [0,4,8], [2,4,6]
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// 3. Function runs when you click a box
function makeMove(index) {
    // If cell is already filled OR game over, do nothing
    if (gameState[index] !== "" || !gameActive) {
        return;
    }

    // Update Logic
    gameState[index] = currentPlayer; // Array la store panrom
    
    // Update UI (Screen la kaaturom)
    let cell = document.getElementsByClassName("cell")[index];
    cell.innerText = currentPlayer;
    cell.classList.add(currentPlayer); // Add CSS class for color (Red/Blue)

    // Check Winner
    checkWinner();
}

function checkWinner() {
    let roundWon = false;

    // Loop through all winning conditions
    for (let i = 0; i < winningConditions.length; i++) {
        let condition = winningConditions[i]; // e.g., [0, 1, 2]
        let a = gameState[condition[0]];
        let b = gameState[condition[1]];
        let c = gameState[condition[2]];

        if (a === "" || b === "" || c === "") {
            continue; // Empty cell irundha skip pannu
        }
        if (a === b && b === c) {
            roundWon = true; // Match found!
            break;
        }
    }

    if (roundWon) {
        document.getElementById("status").innerText = "🎉 Player " + currentPlayer + " Wins!";
        gameActive = false; // Stop the game
        return;
    }

    // Check for Draw (No empty spaces left)
    if (!gameState.includes("")) {
        document.getElementById("status").innerText = "It's a Draw! 🤝";
        gameActive = false;
        return;
    }

    // Switch Player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    document.getElementById("status").innerText = "Player " + currentPlayer + "'s Turn";
}

// 4. Restart Game
function resetGame() {
    currentPlayer = "X";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    document.getElementById("status").innerText = "Player X's Turn";
    
    // Clear UI
    let cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
        cells[i].classList.remove("X", "O");
    }
}