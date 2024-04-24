const GameBoard = (() => {
  const board = [];

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

  const newMarker = (mark, row, col) => {
    if (board[row][col].mark !== '') return false;
    board[row][col] = { mark };
    return true;
  };

  const printBoard = () => {
    for (let i = 0; i < 3; ++i) {
      console.log(JSON.stringify(board[i]));
      console.log();
    }
  };

  return {
    getBoard,
    init,
    newMarker,
    printBoard,
  };
})();

// Initialize the board
GameBoard.init();

const checkWinner = () => {
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

  const startGame = () => {
    let currPlayer = playerOne;

    while (1) {
      GameBoard.printBoard();
      let curr = checkWinner();
      if (curr !== '') {
        let winnerContent = `${currPlayer.marker} Wins`;
        if (curr === 'T') winnerContent = `Its a Tie !`;

        const winMsg = document.querySelector('[data-winning-msg-text]');
        winMsg.textContent = winnerContent;
        const winModal = document.querySelector('.winning-msg');
        winModal.classList.add('show');

        const restartBtn = document.querySelector('#restart-btn');
        restartBtn.addEventListener('click', () => {
          winModal.classList.remove('show');
        });

        return;
      }

      GameBoard.newMarker(
        currPlayer.marker,
        parseInt(prompt('enter row')),
        parseInt(prompt('enter col'))
      );

      // AI
      let r = Math.floor(Math.random() * 3);
      let c = Math.floor(Math.random() * 3);
      let aiPlay = GameBoard.newMarker(
        currPlayer.marker === 'X' ? 'O' : 'X',
        r,
        c
      );

      while (!aiPlay) {
        aiPlay = GameBoard.newMarker(
          currPlayer.marker === 'X' ? 'O' : 'X',
          r,
          c
        );
        c = Math.floor(Math.random() * 3);
        r = Math.floor(Math.random() * 3);
      }
      console.clear();
    }
  };

  return { startGame };
})();

Controller.startGame();
