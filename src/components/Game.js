import { useState } from "react";
import Button from "../UI/Button";
import Board from "./Board";

import styles from "./Game.module.css"

const INITIAL_BOARD = [
    ['','','','','','','','',''],
    ['','','','','','','','',''],
    ['','','','','','','','',''],
    ['','','','','','','','',''],
    ['','','','','','','','',''],
    ['','','','','','','','',''],
    ['','','','','','','','',''],
    ['','','','','','','','',''],
    ['','','','','','','','','']
];

function Game() {

    const [board,setBoard] = useState(INITIAL_BOARD);

    const createNewBoard = () => {

        const getRandomValue = (limit) => {
            return Math.floor(Math.random() * limit) + 1;
        };

        const shuffle = (values) => {
            for(let j = values.length - 1;j >= 0;j--) {
                let k = getRandomValue(j);
                let temp = values[j];
                values[j] = values[k];
                values[k] = temp;
            }

            return values;
        };

        const newBoard = INITIAL_BOARD.map(boardRow => boardRow);
        for(let i of [0,3,6]) {
            const values = shuffle(['1','2','3','4','5','6','7','8','9']);
            for(let j = i;j < i + 3;j++)
                for(let k = i;k < i + 3;k++)
                    board[j][k] = values.pop();

        }

        setBoard(newBoard);
    };

    return (
        <>
            <Board sudokuBoard={board}/>
            <div className={styles.controls}>
                <Button onClick={createNewBoard}>
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