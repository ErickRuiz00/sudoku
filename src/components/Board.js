import React, { useState } from "react";
import styles from "./Board.module.css";

function Board() {

  const matrix = [['0','2','','','','','','',''],
                  ['','','','','','','','',''],
                  ['','','','','','','','',''],
                  ['','','','','','','','',''],
                  ['','','','','','','','',''],
                  ['','','','','','','','',''],
                  ['','','','','','','','',''],
                  ['','','','','','','2','',''],
                  ['3','','','','','','','',''],
                  ];

  const [board,setBoard] = useState(matrix);
  const [selectedCell,setSelectedCell] = useState([]);

  const onChangeInputCellHandler = (event,row,col) => {
    const enteredCharacter = event.target.value.slice(-1);
    if(enteredCharacter >= "1" && enteredCharacter <= "9") {
      setBoard(prevBoardState => {
        const updatedBoard = prevBoardState.map(boardRow => boardRow);
        updatedBoard[row][col] = enteredCharacter;  
        return updatedBoard;
      });
    }
  };

  const onFocusHandler = (event,row,col) => {
    setSelectedCell([row,col]);
  };

  const getCellStyle = (row,col) => {
    const [selectedRow,selectedCol] = selectedCell;
    if(selectedRow === row && selectedCol === col)
      return "selected";
    if(selectedRow === row || selectedCol === col)
      return "highlighted";
    return "";
  };

  return (
    <table className={styles.board}>
      <tbody>
        {
          [0,1,2,3,4,5,6,7,8].map(rowIndex => {
            return (
              <tr key={rowIndex}>
                {
                  [0,1,2,3,4,5,6,7,8].map(colIndex => {
                    return (
                      <td key={rowIndex + "" + colIndex}>
                        <input
                          value={board[rowIndex][colIndex]}
                          className={`${styles["input-cell"]} ${styles[getCellStyle(rowIndex,colIndex)]}`}
                          onChange={(event) => onChangeInputCellHandler(event,rowIndex,colIndex)}
                          onFocus={(event) => onFocusHandler(event,rowIndex,colIndex)}
                        />
                      </td>
                    )
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
}

export default Board;
