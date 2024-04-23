const GameBoard = (() => {
  const board = [];

  const getBoard = () => {
    return board;
  };

  const newMarker = (mark, row, col) => {
    board[row][col] = { mark };
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

  return {
    getBoard,
    init,
    newMarker,
  };
})();

const checkWinner = () => {
  const board = GameBoard.getBoard();

  // Check Rows
  for (let i = 0; i < 3; ++i) {
    const row = board[i];
    if (row.every((val) => val == row[0])) {
      if (row[0].mark !== '') return row[0].mark;
    }
  }

  // Check Cols
  for (let j = 0; j < 3; ++j) {
    const col = [];
    for (let i = 0; i < 3; ++i) {
      col.push(board[i][j]);
    }

    if (col.every((val) => val == col[0])) {
      if (col[0].mark !== '') return col[0].mark;
    }
  }

  // Check If Filled
  let checkEmpty = false;
  for (let i = 0; i < 3; ++i) {
    for (let j = 0; j < 3; ++j) {
      if (board[i][j].mark === '') {
        checkEmpty = true;
        break;
      }
    }
  }

  // Tie
  if (!checkEmpty) {
    return 'T';
  }

  return '';
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

  let playerOneTurn = true;
  const init = () => {};
})();
