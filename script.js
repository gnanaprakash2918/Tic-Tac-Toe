const GameBoard = (() => {
  const square = {
    mark: '',
  };

  const board = [];
  const getBoard = () => {
    return board;
  };

  const newMarker = (mark, index) => {
    board[index] = { mark };
  };

  const init = () => {
    for (let count = 1; count <= 9; ++count) {
      board.push(square);
    }
  };

  return {
    getBoard,
    init,
    newMarker,
  };
})();

const Controller = (() => {
  const playerOne = {
    name: 'Player 1',
    marker: 'X',
    type: '',
  };

  const playerTwo = {
    name: 'Player 2',
    marker: 'O',
    type: '',
  };

  let playerOneTurn = true;
  const init = () => {};
})();
