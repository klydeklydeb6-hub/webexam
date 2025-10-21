// Tic-Tac-Toe Game
(function() {
    const boardElement = document.getElementById('tic-tac-toe-board');
    const statusElement = document.getElementById('tic-tac-toe-status');
    const resetButton = document.getElementById('tic-tac-toe-reset');
    
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    
    // Create the game board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        boardElement.appendChild(cell);
    }
    
    // Handle cell clicks
    function handleCellClick(event) {
        const index = parseInt(event.target.getAttribute('data-index'));
        
        if (gameBoard[index] !== '' || !gameActive) {
            return;
        }
        
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        event.target.classList.add(currentPlayer.toLowerCase());
        
        if (checkWinner()) {
            statusElement.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return;
        }
        
        if (gameBoard.every(cell => cell !== '')) {
            statusElement.textContent = "It's a tie!";
            gameActive = false;
            return;
        }
        
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusElement.textContent = `Player ${currentPlayer}'s turn`;
    }
    
    // Check for a winner
    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];
        
        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return gameBoard[a] !== '' && 
                   gameBoard[a] === gameBoard[b] && 
                   gameBoard[a] === gameBoard[c];
        });
    }
    
    // Reset the game
    resetButton.addEventListener('click', function() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        statusElement.textContent = `Player ${currentPlayer}'s turn`;
        
        const cells = document.querySelectorAll('#tic-tac-toe-board .cell');
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
        });
    });
})();

// Memory Match Game
(function() {
    const boardElement = document.getElementById('memory-board');
    const statusElement = document.getElementById('memory-status');
    const resetButton = document.getElementById('memory-reset');
    
    const symbols = ['🍎', '🍌', '🍒', '🍇', '🍊', '🍓', '🥝', '🍉'];
    let cards = [...symbols, ...symbols];
    let flippedCards = [];
    let matchedPairs = 0;
    let canFlip = true;
    
    // Shuffle the cards
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // Initialize the game
    function initGame() {
        boardElement.innerHTML = '';
        shuffledCards = shuffle([...cards]);
        flippedCards = [];
        matchedPairs = 0;
        canFlip = true;
        statusElement.textContent = 'Find matching pairs!';
        
        shuffledCards.forEach((symbol, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.setAttribute('data-index', index);
            card.setAttribute('data-symbol', symbol);
            card.textContent = '?';
            card.addEventListener('click', handleCardClick);
            boardElement.appendChild(card);
        });
    }
    
    // Handle card clicks
    function handleCardClick(event) {
        if (!canFlip) return;
        
        const card = event.target;
        const index = parseInt(card.getAttribute('data-index'));
        
        // Don't allow flipping already flipped or matched cards
        if (card.classList.contains('flipped') || card.classList.contains('matched')) {
            return;
        }
        
        // Flip the card
        card.textContent = card.getAttribute('data-symbol');
        card.classList.add('flipped');
        flippedCards.push(card);
        
        // Check for a match when two cards are flipped
        if (flippedCards.length === 2) {
            canFlip = false;
            const [card1, card2] = flippedCards;
            
            if (card1.getAttribute('data-symbol') === card2.getAttribute('data-symbol')) {
                // Match found
                card1.classList.add('matched');
                card2.classList.add('matched');
                flippedCards = [];
                matchedPairs++;
                canFlip = true;
                
                if (matchedPairs === symbols.length) {
                    statusElement.textContent = 'Congratulations! You won!';
                }
            } else {
                // No match, flip cards back after a delay
                setTimeout(() => {
                    card1.textContent = '?';
                    card2.textContent = '?';
                    card1.classList.remove('flipped');
                    card2.classList.remove('flipped');
                    flippedCards = [];
                    canFlip = true;
                }, 1000);
            }
        }
    }
    
    // Initialize the game on page load
    initGame();
    
    // Reset the game
    resetButton.addEventListener('click', initGame);
})();