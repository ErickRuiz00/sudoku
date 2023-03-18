import { useEffect, useState } from "react";
import Button from "../UI/Button";
import Board from "./Board";
import Modal from "../UI/Modal";
import Selector from "../UI/Selector";

import { generateSudoku,INITIAL_CELL_STATE } from "../scripts/SudokuGenerator";
import styles from "./Game.module.css"

const EMPTY_BOARD = [
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '']
];

function Game() {

    //Definning states.
    const [isModalActive, setIsModalActive] = useState(false);
    const [difficulty, setDifficulty] = useState(0);
    const [board, setBoard] = useState(EMPTY_BOARD);
    const [solvedBoard, setSolvedBoard] = useState(EMPTY_BOARD);
    const [cellSate,setCellState] = useState(INITIAL_CELL_STATE);
    const [gameIsCompleted,setGameIsCompleted] = useState(false);

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
    };

    const onCreateGameDiscardHandler = () => {
        setIsModalActive(false);
    };

    const onChangeSelectionHandler = (selectedDifficulty) => {
        setDifficulty(selectedDifficulty);
    };

    const onCellChangeHandler = (event,row, col) => {
        const enteredCharacter = event.target.value.slice(-1);
        if (enteredCharacter >= "1" && enteredCharacter <= "9") {
            setBoard(prevBoardState => {
                const updatedBoard = prevBoardState.map(boardRow => [...boardRow])
                updatedBoard[row][col] = enteredCharacter;
                return updatedBoard;
            });
        }
    };

    return (
        <>
            {
                isModalActive &&
                <Modal title="Create a new game" onConfirm={createNewSudoku} onDiscard={onCreateGameDiscardHandler}>
                    <Selector onChangeSelection={onChangeSelectionHandler} />
                </Modal>
            }

            <Board sudokuBoard={board} solvedSudokuBoard={solvedBoard} sudokuCellState={cellSate} onCellChange={onCellChangeHandler} />
            <div className={styles.controls}>
                <Button onClick={onCreateNewGameHandler}>
                    New Game
                </Button>

                <Button>
                    Solve
                </Button>
            </div>
        </>
    );
}

export default Game;