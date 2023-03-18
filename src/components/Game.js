import { useState } from "react";
import Button from "../UI/Button";
import Board from "./Board";
import Modal from "../UI/Modal";
import Selector from "../UI/Selector";

import { generateSudoku } from "../scripts/SudokuGenerator";
import styles from "./Game.module.css"

const INITIAL_BOARD = [
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

const VALUES = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

function Game() {

    //Definning states.
    const [isModalActive, setIsModalActive] = useState(false);
    const [difficulty, setDifficulty] = useState(1);
    const [board, setBoard] = useState(generateSudoku());

    const onCreateNewGameHandler = () => {
        setIsModalActive(true);
    };

    const createNewSudoku = () => {
        setBoard(generateSudoku(difficulty));
        setIsModalActive(false);
    };

    const onDiscardHandler = () => {
        setIsModalActive(false);
    };

    const onChangeSelectionHandler = (selectedDifficulty) => {
        setDifficulty(selectedDifficulty);
    };

    return (
        <>
            {
                isModalActive &&
                <Modal title="Create a new game" onConfirm={createNewSudoku} onDiscard={onDiscardHandler}>
                    <Selector onChangeSelection={onChangeSelectionHandler} />
                </Modal>
            }

            <Board sudokuBoard={board} />
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