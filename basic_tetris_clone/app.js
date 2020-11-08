document.addEventListener('DOMContentLoaded', () => {
    const gridWidth = 10; // 10 * 20px = 200px
    const miniGridWidth = 6;

    let timerId;
    let isGameOver = false;
    let isPaused = false;
    const moveDownTime = 0.5 * 1000;

    document.addEventListener('keydown', handleKeyInputs);

    // Major variables declaration
    const mainGrid = document.querySelector('.main-grid');
    const miniGrid = document.querySelector('.mini-grid');
    const gameOverText = document.querySelector('.game-over');

    // score
    let score = 0;
    const scoreElement = document.querySelector('.score-value');
    scoreElement.textContent = score;

    // Create the main grid with required no of rows
    for (let cellNo = 0; cellNo < 200; cellNo++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        mainGrid.appendChild(cell);
    }
    // last row to know the end of grid rows
    for (let cellNo = 0; cellNo < 10; cellNo++) {
        const cell = document.createElement('div');
        cell.classList.add('freezed');
        mainGrid.appendChild(cell);
    }
    // Create the mini grid with required no of rows
    for (let cellNo = 0; cellNo < 36; cellNo++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        miniGrid.appendChild(cell);
    }

    // get all cells
    let cells = Array.from(document.querySelectorAll('.main-grid div'));
    const miniCells = Array.from(document.querySelectorAll('.mini-grid div'));

    const lBlock = [
        [1, gridWidth + 1, gridWidth * 2 + 1, gridWidth * 2 + 2],
        [gridWidth * 2, gridWidth, gridWidth + 1, gridWidth + 2],
        [0, 1, gridWidth + 1, gridWidth * 2 + 1],
        [gridWidth, gridWidth + 1, gridWidth + 2, 2],
    ];
    const zBlock = [
        [0, 1, gridWidth + 1, gridWidth + 2],
        [1, gridWidth + 1, gridWidth, gridWidth * 2],
        [0, 1, gridWidth + 1, gridWidth + 2],
        [1, gridWidth + 1, gridWidth, gridWidth * 2],
    ];
    const oBlock = [
        [0, 1, gridWidth + 1, gridWidth],
        [0, 1, gridWidth + 1, gridWidth],
        [0, 1, gridWidth + 1, gridWidth],
        [0, 1, gridWidth + 1, gridWidth],
    ];
    const tBlock = [
        [gridWidth, gridWidth + 1, gridWidth * 2 + 1, gridWidth + 2],
        [1, gridWidth + 1, gridWidth, gridWidth * 2 + 1],
        [1, gridWidth, gridWidth + 1, gridWidth + 2],
        [1, gridWidth + 1, gridWidth + 2, gridWidth * 2 + 1],
    ];
    const iBlock = [
        [1, gridWidth + 1, gridWidth * 2 + 1, gridWidth * 3 + 1],
        [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth + 3],
        [1, gridWidth + 1, gridWidth * 2 + 1, gridWidth * 3 + 1],
        [gridWidth, gridWidth + 1, gridWidth + 2, gridWidth + 3],
    ];

    const blocks = [lBlock, zBlock, oBlock, tBlock, iBlock];

    const miniLBlock = [
        1,
        miniGridWidth + 1,
        miniGridWidth * 2 + 1,
        miniGridWidth * 2 + 2,
    ];
    const miniZBlock = [0, 1, miniGridWidth + 1, miniGridWidth + 2];
    const miniOBlock = [0, 1, miniGridWidth + 1, miniGridWidth];
    const miniTBlock = [
        miniGridWidth,
        miniGridWidth + 1,
        miniGridWidth * 2 + 1,
        miniGridWidth + 2,
    ];
    const miniIBlock = [
        1,
        miniGridWidth + 1,
        miniGridWidth * 2 + 1,
        miniGridWidth * 3 + 1,
    ];

    const miniBlocks = [
        miniLBlock,
        miniZBlock,
        miniOBlock,
        miniTBlock,
        miniIBlock,
    ];

    let nextRandom = Math.floor(Math.random() * blocks.length);
    let initialPosition = 4;
    let currentPosition = initialPosition;
    let miniPosition = 7;
    let currentRotation = 0;
    let random = Math.floor(Math.random() * blocks.length);
    let currentBlock = blocks[random][currentRotation];
    let nextBlock = miniBlocks[nextRandom];

    function draw() {
        currentBlock.forEach((index) => {
            cells[currentPosition + index].classList.add('highlight');
        });
    }
    function drawMini() {
        nextBlock.forEach((index) => {
            miniCells[miniPosition + index].classList.add('highlight');
        });
    }
    function undraw() {
        currentBlock.forEach((index) => {
            cells[currentPosition + index].classList.remove('highlight');
        });
    }
    function undrawMini() {
        nextBlock.forEach((index) => {
            miniCells[miniPosition + index].classList.remove('highlight');
        });
    }

    function moveDown() {
        undraw();
        currentPosition += gridWidth;
        draw();
        freeze();
        gameOver();
    }

    function handleKeyInputs(event) {
        if (!isGameOver && !isPaused) {
            if (event.code === 'ArrowLeft') {
                moveLeft();
            }
            if (event.code === 'ArrowRight') {
                moveRight();
            }
            if (event.code === 'ArrowDown') {
                moveDown();
            }
            if (event.code === 'ArrowUp') {
                rotate();
            }
        }
    }

    function moveLeft() {
        undraw();
        const isAtLeft = currentBlock.some(
            (index) => (currentPosition + index) % gridWidth === 0
        );
        if (!isAtLeft) {
            currentPosition--;
        }
        draw();
    }
    function moveRight() {
        undraw();
        const isAtRight = currentBlock.some(
            (index) => (currentPosition + index) % gridWidth === gridWidth - 1
        );
        if (!isAtRight) {
            currentPosition++;
        }
        draw();
    }
    function rotate() {
        undraw();
        let leftBug = false;
        let rightBug = false;
        const prevRotation = currentRotation;
        currentRotation++;
        if (currentRotation >= currentBlock.length) {
            currentRotation = 0;
        }
        currentBlock = blocks[random][currentRotation];
        // Check for clashes while rotation
        const isClashing = currentBlock.some((index) =>
            cells[currentPosition + index].classList.contains('freezed')
        );
        if (isClashing) {
            currentBlock = blocks[random][prevRotation];
            currentRotation = prevRotation;
        }
        // Check for left edge bugs
        currentBlock.some((index) => {
            if ((currentPosition + index) % gridWidth === 0) {
                leftBug = true;
                currentPosition++;
            }
        });
        // Check for right edge bugs
        currentBlock.some((index) => {
            if ((currentPosition + index) % gridWidth === 9) {
                rightBug = true;
                currentPosition--;
            }
        });
        draw();
    }

    function freeze() {
        currentBlock.some((index) => {
            if (
                cells[currentPosition + index + gridWidth].classList.contains(
                    'freezed'
                )
            ) {
                currentBlock.forEach((index) => {
                    cells[currentPosition + index].classList.add('freezed');
                });
                random = nextRandom;
                currentPosition = 4;
                currentBlock = blocks[random][currentRotation];
                nextRandom = Math.floor(Math.random() * blocks.length);
                undrawMini();
                nextBlock = miniBlocks[nextRandom];
                drawMini();
                draw();
                calcScore();
            }
        });
    }

    function calcScore() {
        for (let square = 0; square <= 199; square += gridWidth) {
            const row = [];
            for (let temp = 0; temp < gridWidth; temp++) {
                row.push(square + temp);
            }
            if (
                row.every((index) => cells[index].classList.contains('freezed'))
            ) {
                score += gridWidth;
                scoreElement.textContent = score;
                row.forEach((index) => {
                    cells[index].classList.remove('freezed', 'highlight');
                });
                const removedCells = cells.splice(square, gridWidth);
                cells = removedCells.concat(cells);
                // append child will remove the element from dom and then appends
                cells.forEach((cell) => mainGrid.appendChild(cell));
            }
        }
    }

    document
        .querySelector('.btn-start')
        .addEventListener('click', startPauseGame);

    function startPauseGame() {
        if (isGameOver) {
            isGameOver = false;
            score = 0;
            gameOverText.textContent = '';
            cells.forEach((cell, index) => {
                if (index <= 199) {
                    cell.classList.remove('highlight', 'freezed');
                }
            });
        }
        if (timerId) {
            isPaused = true;
            clearInterval(timerId);
            timerId = null;
        } else {
            isPaused = false;
            drawMini();
            timerId = setInterval(moveDown, moveDownTime);
        }
    }

    function gameOver() {
        if (cells[currentPosition].classList.contains('freezed')) {
            isGameOver = true;
            gameOverText.textContent = 'Game Over';
            clearInterval(timerId);
            undrawMini();
            timerId = null;
        }
    }
});
