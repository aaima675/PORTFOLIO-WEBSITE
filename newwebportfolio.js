document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const navLinks = document.querySelectorAll('nav ul li a');

    // Function to load content based on page
    function loadPage(page) {
        let htmlContent = '';
        navLinks.forEach(link => link.classList.remove('active'));
        document.querySelector(`[data-page="${page}"]`).classList.add('active');

        switch (page) {
            case 'home':
                htmlContent = `
                    <section class="home-section">
                        <h1>Welcome to My Minimalist Website!</h1>
                        <p>Use the navigation above to explore.</p>
                    </section>
                `;
                break;
            case 'portfolio':
                htmlContent = `
                    <section class="portfolio-section">
                        <div class="profile-card">
                            <img src="your-image.jpg" alt="Your Profile Picture">
                            <h2>Your Name</h2>
                            <p>A passionate web developer with a keen eye for modern design and user experience. I love creating interactive and functional websites.</p>
                        </div>
                    </section>
                `;
                // IMPORTANT: Replace "your-image.jpg" with the actual path to your image
                break;
            case 'tic-tac-toe':
                htmlContent = `
                    <section class="tic-tac-toe-container">
                        <div class="game-info" id="gameInfo">Player X's Turn</div>
                        <div class="game-grid" id="gameGrid">
                            <div class="game-cell" data-cell-index="0"></div>
                            <div class="game-cell" data-cell-index="1"></div>
                            <div class="game-cell" data-cell-index="2"></div>
                            <div class="game-cell" data-cell-index="3"></div>
                            <div class="game-cell" data-cell-index="4"></div>
                            <div class="game-cell" data-cell-index="5"></div>
                            <div class="game-cell" data-cell-index="6"></div>
                            <div class="game-cell" data-cell-index="7"></div>
                            <div class="game-cell" data-cell-index="8"></div>
                        </div>
                        <button class="reset-button" id="resetButton">Reset Game</button>
                    </section>
                `;
                break;
            default:
                htmlContent = `
                    <section class="home-section">
                        <h1>Welcome to My Minimalist Website!</h1>
                        <p>Use the navigation above to explore.</p>
                    </section>
                `;
        }
        contentDiv.innerHTML = htmlContent;

        // If Tic Tac Toe page is loaded, initialize the game
        if (page === 'tic-tac-toe') {
            initializeTicTacToe();
        }
    }

    // Event listeners for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.dataset.page;
            loadPage(page);
        });
    });

    // --- Tic Tac Toe Game Logic ---
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;
    let gameInfo;
    let gameCells;
    let resetButton;

    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    function initializeTicTacToe() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;

        gameInfo = document.getElementById('gameInfo');
        gameCells = document.querySelectorAll('.game-cell');
        resetButton = document.getElementById('resetButton');

        if (gameInfo && gameCells && resetButton) {
            gameInfo.textContent = `Player ${currentPlayer}'s Turn`;
            gameCells.forEach(cell => {
                cell.textContent = '';
                cell.classList.remove('x', 'o');
                cell.addEventListener('click', handleCellClick, { once: true }); // Ensure click only once per cell per game
            });
            resetButton.addEventListener('click', resetGame);
        }
    }

    function handleCellClick(e) {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.dataset.cellIndex);

        if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        gameBoard[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());

        checkResult();
    }

    function checkResult() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = gameBoard[winCondition[0]];
            let b = gameBoard[winCondition[1]];
            let c = gameBoard[winCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            gameInfo.textContent = `Player ${currentPlayer} Wins!`;
            gameActive = false;
            removeCellClickListeners();
            return;
        }

        let roundDraw = !gameBoard.includes('');
        if (roundDraw) {
            gameInfo.textContent = 'It\'s a Draw!';
            gameActive = false;
            removeCellClickListeners();
            return;
        }

        changePlayer();
    }

    function changePlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameInfo.textContent = `Player ${currentPlayer}'s Turn`;
    }

    function resetGame() {
        initializeTicTacToe();
        addCellClickListeners();
    }

    function removeCellClickListeners() {
        gameCells.forEach(cell => {
            cell.removeEventListener('click', handleCellClick);
        });
    }

    function addCellClickListeners() {
        gameCells.forEach(cell => {
            cell.addEventListener('click', handleCellClick, { once: true });
        });
    }

    // Load the home page by default when the site loads
    loadPage('home');
});