import { useEffect, useState } from "react";
import Button from "../UI/Button";
import Board from "./Board";
import Modal from "../UI/Modal";
import Selector from "../UI/Selector";
import { generateSudoku, INITIAL_CELL_STATE } from "../scripts/SudokuGenerator";
import styles from "./Game.module.css";
import Timer from "../UI/Timer";

const EMPTY_BOARD = [
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", ""],
];

function Game() {
  //Definning states.
  const [isModalActive, setIsModalActive] = useState(false);
  const [difficulty, setDifficulty] = useState(0);
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [solvedBoard, setSolvedBoard] = useState(EMPTY_BOARD);
  const [cellSate, setCellState] = useState(INITIAL_CELL_STATE);
  const [gameOver, setGameOver] = useState(null);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  const formatTime = (time) => (time < 10 ? "0" + time : time + "");
  const time = {
    minutes,
    seconds,
    setMinutes,
    setSeconds,
    formatTime,
  };

  useEffect(() => {
    createNewSudoku();
  }, []);

  useEffect(() => {
    if (mistakes === 3) {
      setGameOver(2);
      setIsModalActive(true);
      setCellState(INITIAL_CELL_STATE);
    }
  }, [mistakes]);

  const onCreateNewGameHandler = () => {
    setIsModalActive(true);
  };

  const createNewSudoku = () => {
    const [newSolvedSudoku, newSudoku, newCellState] =
      generateSudoku(difficulty);
    setBoard(newSudoku);
    setSolvedBoard(newSolvedSudoku);
    setCellState(newCellState);
    setIsModalActive(false);
    setGameOver(null);
    setSeconds(0);
    setMinutes(0);
    setMistakes(0);
  };

  const onCreateGameDiscardHandler = () => {
    setIsModalActive(false);
  };

  const playAgainHandler = () => {
    setGameOver(null);
    setMistakes(0);
  };

  const onChangeSelectionHandler = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
  };

  const onCellChangeHandler = (event, row, col) => {
    const enteredCharacter = event.target.value.slice(-1);

    if (enteredCharacter >= "1" && enteredCharacter <= "9") {
      setBoard((prevBoardState) => {
        const updatedBoard = prevBoardState.map((boardRow) => [...boardRow]);
        updatedBoard[row][col] = enteredCharacter;

        if (JSON.stringify(updatedBoard) === JSON.stringify(solvedBoard)) {
          setGameOver(1);
          setCellState(INITIAL_CELL_STATE);
          setIsModalActive(true);
        }

        if (updatedBoard[row][col] !== solvedBoard[row][col])
          setMistakes(mistakes + 1);

        return updatedBoard;
      });
    }
  };

  return (
    <div className={styles.gameContainer}>
      {isModalActive && (
        <Modal
          title="Create a new game"
          buttonConfirmText="Confirm"
          onConfirm={createNewSudoku}
          onDiscard={onCreateGameDiscardHandler}
        >
          <Selector onChangeSelection={onChangeSelectionHandler} />
        </Modal>
      )}

      {isModalActive && gameOver === 1 && (
        <Modal
          title="Congratulations!"
          buttonConfirmText="Play Again"
          onConfirm={playAgainHandler}
          onDiscard={onCreateGameDiscardHandler}
          message={`You have finished the game in ${formatTime(
            time.minutes
          )}:${formatTime(time.seconds)} minutes`}
        >
          <img
            src="https://thumbs.dreamstime.com/b/muestra-de-congrats-con-las-estrellas-82816939.jpg"
            alt=""
          />
        </Modal>
      )}

      {isModalActive && gameOver === 2 && (
        <Modal
          title="You lose"
          buttonConfirmText="Try Again!"
          onConfirm={playAgainHandler}
          onDiscard={onCreateGameDiscardHandler}
          message="Oh no! You made 3 mistakes :("
        >
          <img
            src="https://www.westfield.ma.edu/PersonalPages/draker/edcom/final/webprojects/sp18/sectiona/solarq/tryagain.png"
            alt=""
          />
        </Modal>
      )}
      
      

      <Board
        sudokuBoard={board}
        solvedSudokuBoard={solvedBoard}
        sudokuCellState={cellSate}
        onCellChange={onCellChangeHandler}
      ><div className={styles.mistakes}>Mistakes {mistakes}/3</div></Board>

      <div className={styles.controls}>
        <Button onClick={onCreateNewGameHandler}>New Game</Button>
        <Timer time={time} gameCompleted={gameOver} />
        <Button>Solve</Button>
      </div>
    </div>
  );
}

export default Game;
