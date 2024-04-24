const GameBoard = (() => {
  const board = [];

  const getBoard = () => {
    return board;
  };

  const newMarker = (mark, row, col) => {
    if (board[row][col].mark !== '') return false;
    board[row][col] = { mark };
    return true;
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
        if (curr === 'T') console.log(`Its a Tie !`);
        else console.log(`Winner is ${currPlayer.name}`);
        return;
      }

      GameBoard.newMarker(
        currPlayer.marker,
        parseInt(prompt('enter row')),
        parseInt(prompt('enter col'))
      );

      // AI
      let r = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
      let c = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
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
        r = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
        c = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
      }
      console.clear();
    }
  };

  return { startGame };
})();

Controller.startGame();
