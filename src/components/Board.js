import React, { useState } from "react";
import styles from "./Board.module.css";

function Board({
  sudokuBoard,
  solvedSudokuBoard,
  sudokuCellState,
  onCellChange,
  children,
}) {
  const [selectedCell, setSelectedCell] = useState([]);

  const onChangeInputCellHandler = (event, row, col) => {
    onCellChange(event, row, col);
  };

  const onFocusHandler = (event, row, col) => {
    setSelectedCell([row, col]);
  };

  const getCellStyle = (row, col) => {
    const [selectedRow, selectedCol] = selectedCell;
    if (selectedRow === row && selectedCol === col) return "selected";
    if (selectedRow === row || selectedCol === col) return "highlighted";
    return "";
  };

  return (
    <div className={styles.boardContainer}>
      {children}
      <table className={styles.board}>
        <tbody>
          {sudokuBoard.map((boardRow, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {boardRow.map((cell, colIndex) => {
                  const isEditable = sudokuCellState[rowIndex][colIndex];
                  const cellColor = sudokuBoard[rowIndex][colIndex] !== solvedSudokuBoard[rowIndex][colIndex] ? "wrong-value" : (isEditable)? "correct" : "";
                  return (
                    <td key={rowIndex + "" + colIndex}>
                      <input
                        value={sudokuBoard[rowIndex][colIndex]}
                        className={`${styles["input-cell"]} ${
                          styles[getCellStyle(rowIndex, colIndex)]
                        } ${styles[cellColor]}`}
                        onChange={(event) =>
                          onChangeInputCellHandler(event, rowIndex, colIndex)
                        }
                        onFocus={(event) =>
                          onFocusHandler(event, rowIndex, colIndex)
                        }
                        readOnly={!isEditable}
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Board;
