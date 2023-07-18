import { useEffect, useState } from "react";
import Button from "../UI/Button";
import Board from "./Board";
import Modal from "../UI/Modal";
import Selector from "../UI/Selector";
import { generateSudoku, INITIAL_CELL_STATE } from "../scripts/SudokuGenerator";
import styles from "./Game.module.css";
import Timer from "../UI/Timer";
import SolverBoard from "./SolverBoard";

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
  const [isSolvingModalActive, setIsSolvingModalActive] = useState(false);
  const [difficulty, setDifficulty] = useState(0);
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [solvedBoard, setSolvedBoard] = useState(EMPTY_BOARD);
  const [cellSate, setCellState] = useState(INITIAL_CELL_STATE);
  const [gameOver, setGameOver] = useState(null);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [solvingSteps, setSolvingSteps] = useState(EMPTY_BOARD);

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
    const [newSolvedSudoku, newSudoku, newCellState, solvingSteps] =
      generateSudoku(difficulty);
    setBoard(newSudoku);
    setSolvedBoard(newSolvedSudoku);
    setCellState(newCellState);
    setIsModalActive(false);
    setGameOver(null);
    setSeconds(0);
    setMinutes(0);
    setMistakes(0);
    setSolvingSteps(solvingSteps);
  };

  const onCreateGameDiscardHandler = () => {
    setIsModalActive(false);
  };

  const onSolvingSimulationDiscard = () => {
    setIsSolvingModalActive(false);
  };

  const playAgainHandler = () => {
    setGameOver(null);
    setMistakes(0);
  };

  const skipVisualization = () => {
    setBoard(solvedBoard);
    setIsSolvingModalActive(false);
    setGameOver(3);
    setCellState(INITIAL_CELL_STATE);
    setIsModalActive(true);
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

  const onSolveHandler = () => {
    setIsSolvingModalActive(true);
  };

  function GameOver() {
    var modalContent = {
      title: "",
      buttonConfirmText: "",
      message: "",
      image: "",
    };

    // Win
    if (gameOver === 1) {
      modalContent = {
        title: "Congralutions",
        buttonConfirmText: "Play Again!",
        message: `You have finished the game in ${formatTime(
          time.minutes
        )}:${formatTime(time.seconds)} minutes`,
        image: "img/congrats.gif",
      };
    }
    // Lose
    if (gameOver === 2) {
      modalContent = {
        title: "You lose!",
        buttonConfirmText: "Try Again!",
        message: "Oh no! You made 3 mistakes :(",
        image: "img/tryagain.gif",
      };
    }

    if (gameOver === 3) {
      modalContent = {
        title: "BOARD SOLVED",
        buttonConfirmText: "Play Again!",
        message: "We finished the board for you, checkout the solution :)!!",
        image: "img/tenkiu.gif",
      };
    }

    return (
      <>
        <Modal
          title={modalContent.title}
          buttonConfirmText={modalContent.buttonConfirmText}
          onConfirm={playAgainHandler}
          onDiscard={onCreateGameDiscardHandler}
          message={modalContent.message}
        >
          <img src={modalContent.image} alt="" />
        </Modal>
      </>
    );
  }

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

      {isModalActive && gameOver && <GameOver />}

      {isSolvingModalActive && (
        <Modal
          title="Backtracking Visualization"
          buttonConfirmText="Skip"
          onConfirm={skipVisualization}
          onDiscard={onSolvingSimulationDiscard}
        >
          <SolverBoard board={board} solvingSteps={solvingSteps} />
        </Modal>
      )}
      <Board
        sudokuBoard={board}
        solvedSudokuBoard={solvedBoard}
        sudokuCellState={cellSate}
        onCellChange={onCellChangeHandler}
      >
        <div className={styles.mistakes}>Mistakes {mistakes}/3</div>
      </Board>

      <div className={styles.controls}>
        <Button onClick={onCreateNewGameHandler}>New Game</Button>
        <Timer time={time} gameCompleted={gameOver} />
        <Button onClick={onSolveHandler}>Solve</Button>
      </div>
    </div>
  );
}

export default Game;
