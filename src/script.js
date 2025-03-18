let player1Name, player2Name, currentPlayer, board, ROWS, COLS;
let gameOver = false;

function startGame() {
    player1Name = document.getElementById('player1').value || "Joueur Orange";
    player2Name = document.getElementById('player2').value || "Joueur Mauve";
    currentPlayer = 'orange';
    ROWS = parseInt(document.getElementById('grid-rows').value) || 6;
    COLS = parseInt(document.getElementById('grid-cols').value) || 6;
    board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
    
    document.getElementById('setup').classList.add('hidden');
    document.getElementById('game').classList.remove('hidden');
    document.getElementById('player-turn').textContent = `Tour de ${player1Name}`;
    document.getElementById('player-info').textContent = `${player1Name} = Orange / ${player2Name} = Mauve`;
    createBoard();
}

function createBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    boardElement.style.gridTemplateColumns = `repeat(${COLS}, min(50px, 6vw))`;
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', () => placeDisc(col));
            boardElement.appendChild(cell);
        }
    }
}

function resetGame() {
    document.getElementById('setup').classList.remove('hidden');
    document.getElementById('game').classList.add('hidden');
}

function restartGame() {
    board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
    gameOver = false;
    document.getElementById('player-turn').textContent = `Tour de ${currentPlayer === 'orange' ? player1Name : player2Name}`;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('orange', 'mauve');
    });
}

function isBoardFull() {
    return board.every(row => row.every(cell => cell !== null));
}

function checkWin(row, col) {
    const directions = [
        [[-1, 0], [1, 0]], // Vertical
        [[0, -1], [0, 1]], // Horizontal
        [[-1, -1], [1, 1]], // Diagonale /
        [[-1, 1], [1, -1]] // Diagonale \
    ];

    for (let direction of directions) {
        let count = 1;
        for (let [dr, dc] of direction) {
            let r = row + dr, c = col + dc;
            while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer) {
                count++;
                if (count >= 4) return true;
                r += dr;
                c += dc;
            }
        }
    }
    return false;
}

function placeDisc(col) {
    if (gameOver) return; 

    for (let row = ROWS - 1; row >= 0; row--) {
        if (!board[row][col]) {
            board[row][col] = currentPlayer;

            const cell = document.querySelector(`[data-row='${row}'][data-col='${col}']`);
            cell.classList.add(currentPlayer);

            setTimeout(() => {
                if (checkWin(row, col)) {
                    alert(`Le joueur ${currentPlayer === 'orange' ? player1Name : player2Name} a gagné !`);
                    gameOver = true;
                    return;
                }
                if (isBoardFull()) {
                    alert("Match nul !");
                    gameOver = true;
                    return;
                }
                currentPlayer = currentPlayer === 'orange' ? 'mauve' : 'orange';
                document.getElementById('player-turn').textContent = `Tour du joueur ${currentPlayer === 'orange' ? player1Name : player2Name}`;
            }, 50); 
            
            return;
        }
    }
}