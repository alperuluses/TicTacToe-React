import { useEffect, useState } from "react";
import Box from "./Box";
import Popup from "./Popup";
const Boxes = () => {
  const Game = {
    player1: false, // X
    player2: true, // O
    firstMove: "X",
    rowSize: 3,
    columnSize: 3,
    numberOfMove: 9,
    gameMatrix: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
  };

  const [currentPosition, setCurrentPosition] = useState(Game.player1);
  const [currentLetter, setCurrentLetter] = useState("X");
  const [currentBoxes, setCurrentBoxes] = useState(Game.gameMatrix);
  const [attemptCount, setAttemptCount] = useState(0);
  const [winnerLetter, setWinnerLetter] = useState(null);
  const [gameOver, setGameOver] = useState(null);

  const getCurrentRow = (index) => {
    const currentRow = (3 - (index % 3) + index) / 3;
    return currentRow;
  };

  const getCurrentIndex = (index) => {
    const currentIndex = index % 3;
    return currentIndex;
  };

  const win = (currentBoxes) => {
    let winnable = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let arrayX = [];
    let arrayO = [];

    let flat = currentBoxes.flat();
    flat.forEach((v, i) => {
      if (v == "X") arrayX.push(i);
      if (v == "O") arrayO.push(i);
    });
    winnable.forEach((v, i) => {
      let isWinX = v.every((v, i, array) => {
        return currentBoxes && flat[v] == "X";
      });

      if (isWinX) setWinnerLetter("X KAZANDI");
      if (v.every((v, i) => arrayX.includes(v))) {
        setGameOver(v);
      }
      if (v.every((v, i) => arrayO.includes(v))) {
        setGameOver(v);
      }
    });

    winnable.forEach((v, i) => {
      let isWinO = v.every((v) => {
        return currentBoxes && flat[v] == "O";
      });

      if (isWinO) setWinnerLetter("O KAZANDI");
    });

    if (!flat.includes(null) && !winnerLetter) {
      setWinnerLetter("BERABERE");
    }
  };

  const boxClickHandler = (e) => {
    setAttemptCount(attemptCount + 1);
    const currentElement = e.target;
    const currentParent = e.target.parentElement;
    const index = Array.from(currentParent.children).indexOf(currentElement);
    const currentRow = getCurrentRow(index, Game.rowSize);
    const currentIndex = getCurrentIndex(index);
    currentBoxes[currentRow - 1][currentIndex] =
      currentBoxes[currentRow - 1][currentIndex] ?? currentLetter;
    win(currentBoxes);
    setCurrentPosition(!currentPosition);
    setCurrentLetter(currentLetter == "X" ? "O" : "X");
  };

  const restartGame = () => {
    setCurrentBoxes(Game.gameMatrix);
    setCurrentLetter(Game.firstMove);
    setWinnerLetter(null);
    setAttemptCount(0);
    setGameOver(null);
  };

  return (
    <div>
      <div className="container">
        <div className="boxes" onClick={!winnerLetter ? boxClickHandler : null}>
          {currentBoxes.flat().map((v, i) => (
            <Box
              innerValue={v}
              gameOver={gameOver && gameOver.includes(i) ? "gameOver" : ""}
              key={i}
            />
          ))}
        </div>
        <div className="stats">
          <div className="moveSize">HAMLE SAYISI: {attemptCount}</div>
        </div>
      </div>
      {winnerLetter && <Popup text={winnerLetter} onPress={restartGame} />}
    </div>
  );
};

export default Boxes;
