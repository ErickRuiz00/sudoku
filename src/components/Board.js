import React from "react";
import Square from "./Square.js";
import styles from "./Board.module.css";

function Board() {
  //Tablero prueba
  let matrix = new Array(9);
  for (let i = 0; i < 9; i++) {
    matrix[i] = new Array(9);
  }

  // llenar la matriz con valores
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      matrix[i][j] = i + 1;
    }
  }

  let rowIndex = 0;
  let columnIndex = 0;

  return (
    <div className={styles.board}>
      {matrix.map((row) => {
        rowIndex++;
        return (
          <div className={styles.group} key={rowIndex}>
            {row.map((cellNumber) => {
              columnIndex++;
              return (
                <Square
                  number={cellNumber}
                  isDisabled={false}
                  key={columnIndex}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Board;
