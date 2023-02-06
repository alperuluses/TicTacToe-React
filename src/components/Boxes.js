import { useEffect, useState } from "react";
import Box from "./Box";
import Popup from "./Popup";
import GAME_STATE from "../constants";
const Boxes = () => {
  const [currentPosition, setCurrentPosition] = useState(
    GAME_STATE.player1.booleanEquivalent
  );
  const [currentLetter, setCurrentLetter] = useState(GAME_STATE.firstMove);
  const [currentBoxes, setCurrentBoxes] = useState(null);
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
    const arrayX = [];
    const arrayO = [];

    const flat = currentBoxes.flat();
    flat.forEach((v, i) => {
      if (v === GAME_STATE.player1.textEquivalent) arrayX.push(i);
      if (v === GAME_STATE.player2.textEquivalent) arrayO.push(i);
    });
    GAME_STATE.winnable.every((v) => {
      let isWinX = v.every((v) => {
        return currentBoxes && flat[v] === GAME_STATE.player1.textEquivalent;
      });

      let isWinO = v.every((v) => {
        return currentBoxes && flat[v] === GAME_STATE.player2.textEquivalent;
      });
      if (v.every((v, i) => arrayX.includes(v))) {
        setGameOver(v);
      }
      if (v.every((v, i) => arrayO.includes(v))) {
        setGameOver(v);
      }
      if (isWinX) {
        setWinnerLetter(GAME_STATE.WINNER_TEXT_X);
        return false;
      } else if (isWinO) {
        setWinnerLetter(GAME_STATE.WINNER_TEXT_O);
        return false;
      } else if (!flat.includes(null)) {
        setWinnerLetter(GAME_STATE.DRAW_TEXT);
        return false;
      }

      return true;
    });
  };

  const boxClickHandler = (e) => {
    const currentElement = e.target;
    const currentParent = e.target.parentElement;
    const index = Array.from(currentParent.children).indexOf(currentElement);
    const currentRow = getCurrentRow(index, GAME_STATE.rowSize);
    const currentIndex = getCurrentIndex(index);
    if (!currentBoxes[currentRow - 1][currentIndex]) {
      setCurrentPosition(!currentPosition);
      setCurrentLetter(
        currentLetter === GAME_STATE.player1.textEquivalent
          ? GAME_STATE.player2.textEquivalent
          : GAME_STATE.player1.textEquivalent
      );
      setAttemptCount(attemptCount + 1);
      currentBoxes[currentRow - 1][currentIndex] = currentLetter;
    }
    win(currentBoxes);
  };

  const restartGame = () => {
    setCurrentBoxes(GAME_STATE.refactorGameMatrix());
    setCurrentLetter(GAME_STATE.firstMove);
    setWinnerLetter(null);
    setAttemptCount(0);
    setGameOver(null);
  };

  useEffect(() => {
    setCurrentBoxes(GAME_STATE.refactorGameMatrix());
  }, []);

  return (
    <div>
      <div className="container">
        <div className="boxes" onClick={!winnerLetter ? boxClickHandler : null}>
          {currentBoxes &&
            currentBoxes
              .flat()
              .map((v, i) => (
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
