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
  const [gameIsCompleted, setGameIsCompleted] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const formatTime = (time) => (time < 10 ? "0" + time : time + "");
  const time = {
    minutes,
    seconds,
    setMinutes,
    setSeconds,
    formatTime
  };
  
  useEffect(() => {
    createNewSudoku();
  }, []);

  const onCreateNewGameHandler = () => {
    setIsModalActive(true);
  };

  const createNewSudoku = () => {
    const [newSolvedSudoku, newSudoku, newCellState] = generateSudoku(difficulty);
    setBoard(newSudoku);
    setSolvedBoard(newSolvedSudoku);
    setCellState(newCellState);
    setIsModalActive(false);
    setGameIsCompleted(false);
    setSeconds(0);
    setMinutes(0);
  };

  const onCreateGameDiscardHandler = () => {
    setIsModalActive(false);
  };

  const playAgainHandler = () => {
    setGameIsCompleted(false);
  }

  const onChangeSelectionHandler = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
  };

  const onCellChangeHandler = (event, row, col) => {
    const enteredCharacter = event.target.value.slice(-1);
    if (enteredCharacter >= "1" && enteredCharacter <= "9") {
      setBoard((prevBoardState) => {
        const updatedBoard = prevBoardState.map((boardRow) => [...boardRow]);
        updatedBoard[row][col] = enteredCharacter;

        if(JSON.stringify(updatedBoard) === JSON.stringify(solvedBoard)){
           setGameIsCompleted(true);
           setIsModalActive(true);
        }
        
        return updatedBoard;
      });
    }
  };

  return (
    <>
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

      {isModalActive && gameIsCompleted &&(
        <Modal
          title="Congrats"
          buttonConfirmText="Play Again"
          onConfirm={playAgainHandler}
          onDiscard={onCreateGameDiscardHandler}
          message={`You have finished the game in ${formatTime(time.minutes)}:${formatTime(time.seconds)} minutes`}
        >
          <img src="https://thumbs.dreamstime.com/b/muestra-de-congrats-con-las-estrellas-82816939.jpg" />
        </Modal>
      )}

      <Board
        sudokuBoard={board}
        solvedSudokuBoard={solvedBoard}
        sudokuCellState={cellSate}
        onCellChange={onCellChangeHandler}
      />
      <div className={styles.controls}>
        <Button onClick={onCreateNewGameHandler}>New Game</Button>
        <Timer time={time} gameCompleted={gameIsCompleted}/>
        <Button>Solve</Button>
      </div>
    </>
  );
}

export default Game;
