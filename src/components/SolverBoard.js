import { useState, useEffect } from "react";
import styles from "./Board.module.css";

const SolverBoard = ({ board, solvingSteps }) => {
  const [sudokuBoard, setSudokuBoard] = useState(board);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);

  useEffect(() => {
    if (currentStep < solvingSteps.length) {
      setSudokuBoard(solvingSteps[currentStep][0]);
      setCurrentRow(solvingSteps[currentStep][1]);
      setCurrentCol(solvingSteps[currentStep][2]);
    }

    const timer = setInterval(() => {
      setCurrentStep((prevStep) => {
        return prevStep + 1;
      });
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, [currentStep]);

  const getCellStyle = (row, col) => {
    return currentRow === row && currentCol === col ? "selected" : "";
  };

  return (
    <div className={styles.boardContainer}>
      <table className={styles.board}>
        <tbody>
          {sudokuBoard.map((boardRow, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {boardRow.map((cell, colIndex) => {
                  return (
                    <td key={rowIndex + "" + colIndex}>
                      <input
                        value={
                          sudokuBoard[rowIndex][colIndex] == 0
                            ? ""
                            : sudokuBoard[rowIndex][colIndex]
                        }
                        className={`${styles["input-cell"]} ${
                          styles[getCellStyle(rowIndex, colIndex)]
                        }`}
                        readOnly
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
};

export default SolverBoard;
