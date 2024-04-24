const GameBoard = (() => {
  let board = [];

  const getBoard = () => {
    return board;
  };

  const init = () => {
    for (let i = 1; i <= 3; ++i) {
      const row = [];
      for (let j = 1; j <= 3; ++j) {
        row.push({ mark: '' });
      }

      board.push(row);
    }
  };

  const newMarker = (cell, mark, row, col) => {
    if (board[row][col].mark !== '') return false;
    board[row][col] = { mark };

    const hoverOverlay = cell.querySelector('.hover-content');
    hoverOverlay.textContent = mark;
    hoverOverlay.classList.add(`show`);
    hoverOverlay.classList.add(`${mark.toLowerCase()}`);

    return true;
  };

  const resetBoard = () => {
    board = [];
  };

  return {
    getBoard,
    init,
    newMarker,
    resetBoard,
  };
})();

// Initialize the board
GameBoard.init();

const checkWinner = () => {
  console.log('check');
  const board = GameBoard.getBoard();

  // Check Rows
  for (let i = 0; i < 3; ++i) {
    const row = board[i];
    if (row.every((val) => val.mark === row[0].mark && row[0].mark !== '')) {
      return row[0].mark;
    }
  }

  // Check Cols
  for (let j = 0; j < 3; ++j) {
    const col = [];
    for (let i = 0; i < 3; ++i) {
      col.push(board[i][j]);
    }

    if (col.every((val) => val.mark === col[0].mark && col[0].mark !== '')) {
      return col[0].mark;
    }
  }

  // // Check Diagonal
  let i = 0,
    j = 0;
  let diag = [];
  while (i < 3 && j < 3) {
    diag.push(board[i][j]);
    ++i;
    ++j;
  }

  if (diag.every((val) => val.mark === diag[0].mark && diag[0].mark !== '')) {
    return diag[0].mark;
  }

  diag = [];
  i = 2;
  j = 0;

  while (i >= 0 && j < 3) {
    diag.push(board[i][j]);
    --i;
    ++j;
  }

  if (diag.every((val) => val.mark === diag[0].mark && diag[0].mark !== '')) {
    return diag[0].mark;
  }

  // Check If Filled
  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      if (board[i][j].mark === '') {
        return '';
      }
    }
  }

  // Tie
  return 'T';
};

const Controller = (() => {
  const playerOne = {
    name: 'Player 1',
    marker: 'X',
  };

  const playerTwo = {
    name: 'Player 2',
    marker: 'O',
  };

  let playerClicked = false;

  const startGame = () => {
    const hoverElements = document.querySelectorAll('.hover-content');
    hoverElements.forEach((ele) => (ele.textContent = 'X'));

    const cells = document.querySelectorAll('.cell');

    const playerMove = (idx) => {
      if (
        cells[idx].querySelector('.hover-content').classList.contains('x') ||
        cells[idx].querySelector('.hover-content').classList.contains('o')
      ) {
        return;
      }

      let row = Math.floor(idx / 3);
      let col = idx % 3;
      GameBoard.newMarker(cells[idx], 'X', row, col);

      playerClicked = true;
    };

    const aiMove = () => {
      console.log('hello');
      if (!playerClicked) return;
      let randNum = Math.floor(Math.random() * 9);
      let row = Math.floor(randNum / 3);
      let col = randNum % 3;

      while (!GameBoard.newMarker(cells[randNum], 'O', row, col)) {
        randNum = Math.floor(Math.random() * 9);
        row = Math.floor(randNum / 3);
        col = randNum % 3;
      }

      playerClicked = false;
    };

    const gameLoop = () => {
      let curr = checkWinner();

      if (curr !== '') {
        let winnerContent = `${curr} Wins`;
        if (curr === 'T') winnerContent = `Its a Tie !`;

        const winMsg = document.querySelector('[data-winning-msg-text]');
        winMsg.textContent = winnerContent;
        const winModal = document.querySelector('.winning-msg');
        winModal.classList.add('show');

        const restartBtn = document.querySelector('#restart-btn');

        restartBtn.addEventListener('click', () => {
          winModal.classList.remove('show');
          const hoverEle = document.querySelectorAll('.hover-content');
          hoverEle.forEach((ele) => {
            ele.classList.remove('show', 'x', 'o');
            ele.textContent = 'X';
          });
        });

        GameBoard.resetBoard();
        GameBoard.init();

        cells.forEach((cell, idx) => {
          cell.removeEventListener('click', () => {
            playerMove(idx);
          });
        });

        // Re-add event listeners to cells
        cells.forEach((cell, idx) => {
          cell.addEventListener('click', () => {
            playerMove(idx);
          });
        });

        playerClicked = false;
        gameLoop();
        return;
      }

      if (playerClicked) {
        aiMove();
      }

      setTimeout(gameLoop, 200);
    };

    cells.forEach((cell, idx) => {
      cell.addEventListener('click', () => {
        playerMove(idx);
      });
    });

    gameLoop();
  };

  return { startGame };
})();

Controller.startGame();
