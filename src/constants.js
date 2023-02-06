const GAME_STATE = {
  player1: {
    booleanEquivalent: true,
    textEquivalent: "X",
  }, // X
  player2: {
    booleanEquivalent: false,
    textEquivalent: "O",
  }, // O
  firstMove: "X",
  rowSize: 3,
  columnSize: 3,
  numberOfMove: 9,
  gameMatrix: null,
  winnable: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],
  WINNER_TEXT_X: "X KAZANDI",
  WINNER_TEXT_O: "O KAZANDI",
  DRAW_TEXT: "BERABERE",

  refactorGameMatrix: function () {
    this.gameMatrix = [];
    for (let i = 0; i < this.rowSize; i++) {
      this.gameMatrix.push(new Array(3).fill(null));
    }
    return this.gameMatrix;
  },
};

export default GAME_STATE;
