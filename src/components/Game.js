import { useEffect, useState } from "react";
import Button from "../UI/Button";
import Board from "./Board";
import Modal from "../UI/Modal";

import styles from "./Game.module.css"
import Selector from "../UI/Selector";

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
const VALUES = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

function Game() {

    //Definning states.
    const [isModalActive, setIsModalActive] = useState(false);
    const [board, setBoard] = useState(INITIAL_BOARD);
    const [difficulty,setDifficulty] = useState(1);

    //Definning effects.
    useEffect(() => {
        createNewBoard();
    },[]);

    const onCreateNewGameHandler = () => {
        setIsModalActive(true);
    };

    // We must take into account the selected difficulty.
    const createNewBoard = () => {
        const getRandomValue = (limit) => {
            return Math.floor(Math.random() * limit);
        };

        const shuffle = (values) => {
            for (let j = values.length - 1; j >= 0; j--) {
                let k = getRandomValue(j);
                let temp = values[j];
                values[j] = values[k];
                values[k] = temp;
            }

            return values;
        };

        const newBoard = [...INITIAL_BOARD];
        for (let i of [0, 3, 6]) {
            const values = shuffle([...VALUES]);
            for (let j = i; j < i + 3; j++)
                for (let k = i; k < i + 3; k++)
                    board[j][k] = values.pop();

        }

        setBoard(newBoard);
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
                <Modal title="Create a new game" onConfirm={createNewBoard} onDiscard={onDiscardHandler}>
                    <Selector onChangeSelection={onChangeSelectionHandler}/>
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