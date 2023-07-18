const INITIAL_BOARD = [
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

//true = is editable, false = not editable
export const INITIAL_CELL_STATE = [
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false],
];

const VALUES = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

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

const fillDiagonals = (sudoku) => {
  for (let i of [0, 3, 6]) {
    const values = shuffle([...VALUES]);
    for (let j = i; j < i + 3; j++)
      for (let k = i; k < i + 3; k++) sudoku[j][k] = values.pop();
  }

  return sudoku;
};

const solveSudoku = (sudoku) => {
  for (let i = 0; i < sudoku.length; i++)
    for (let j = 0; j < sudoku[0].length; j++)
      sudoku[i][j] = sudoku[i][j] === "" ? 0 : parseInt(sudoku[i][j]);

  const steps = [];
  solveSudokuHelper(sudoku, 0, 0, steps);

  for (let i = 0; i < sudoku.length; i++)
    for (let j = 0; j < sudoku[0].length; j++)
      sudoku[i][j] = sudoku[i][j] === 0 ? "" : sudoku[i][j] + "";

  return [sudoku, steps];
};

const solveSudokuHelper = (sudoku, row, col, steps) => {
  let currentRow = row;
  let currentCol = col;
  steps.push([sudoku.map((sudokuRow) => [...sudokuRow]), row, col]);
  if (currentCol === sudoku[row].length) {
    currentRow += 1;
    currentCol = 0;
    if (currentRow === sudoku.length) return true;
  }

  if (sudoku[currentRow][currentCol] === 0) {
    const isValidValue = getValidValuesInCell(sudoku, currentRow, currentCol);

    for (let value = 1; value <= 9; value++) {
      sudoku[currentRow][currentCol] = value;
      steps.push([sudoku.map((sudokuRow) => [...sudokuRow]), row, col]);
      if (isValidValue[value]) {
        if (solveSudokuHelper(sudoku, currentRow, currentCol + 1, steps))
          return true;
        steps.push([sudoku.map((sudokuRow) => [...sudokuRow]), row, col]);
      }
    }

    sudoku[currentRow][currentCol] = 0;
    return false;
  }

  return solveSudokuHelper(sudoku, currentRow, currentCol + 1, steps);
};

const getValidValuesInCell = (sudoku, row, col) => {
  const isValidValue = Array.from({ length: 10 }, () => true);

  isValidValue[0] = false;
  for (let i = 0; i < sudoku.length; i++) isValidValue[sudoku[i][col]] = false;

  for (let i = 0; i < sudoku.length; i++) isValidValue[sudoku[row][i]] = false;

  const subGridX = Math.floor(row / 3);
  const subGridY = Math.floor(col / 3);
  for (let i = subGridX * 3; i < subGridX * 3 + 3; i++)
    for (let j = subGridY * 3; j < subGridY * 3 + 3; j++)
      isValidValue[sudoku[i][j]] = false;

  return isValidValue;
};

export const generateSudoku = (difficulty) => {
  const [newSolvedSudoku, steps] = solveSudoku(
    fillDiagonals(INITIAL_BOARD.map((boardRow) => [...boardRow]))
  );

  const newCellState = INITIAL_CELL_STATE.map((cellStateRow) => [
    ...cellStateRow,
  ]);
  const newSudoku = newSolvedSudoku.map((boardRow) => [...boardRow]);
  let cellsToRemove = [];
  for (let i = 0; i < 9; i++)
    for (let j = 0; j < 9; j++) cellsToRemove.push([i, j]);

  cellsToRemove = shuffle(cellsToRemove);
  const numberOfCellsToRemove = [43, 49, 56].at(difficulty);
  for (let i = 0; i < numberOfCellsToRemove; i++) {
    const [row, col] = cellsToRemove[i];
    newSudoku[row][col] = "";
    newCellState[row][col] = true;
  }

  const [dummy, solvingSteps] = solveSudoku(
    newSudoku.map((boardRow) => [...boardRow])
  );

  return [newSolvedSudoku, newSudoku, newCellState, solvingSteps];
};
