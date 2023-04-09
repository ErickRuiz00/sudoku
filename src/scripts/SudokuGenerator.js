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
    [false, false, false, false, false, false, false, false, false]
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
            for (let k = i; k < i + 3; k++)
                sudoku[j][k] = values.pop();
    }

    return sudoku;
};

const solveSudoku = (sudoku) => {
    for (let i = 0; i < sudoku.length; i++)
        for (let j = 0; j < sudoku[0].length; j++)
            sudoku[i][j] = (sudoku[i][j] === "" ? 0 : parseInt(sudoku[i][j]));

    solveSudokuHelper(sudoku, 0, 0)

    for (let i = 0; i < sudoku.length; i++)
        for (let j = 0; j < sudoku[0].length; j++)
            sudoku[i][j] = (sudoku[i][j] === 0 ? "" : sudoku[i][j] + "");

    return sudoku;
};

const solveSudokuHelper = (sudoku, row, col) => {
    let currentRow = row;
    let currentCol = col;
    if (currentCol === sudoku[row].length) {
        currentRow += 1;
        currentCol = 0;
        if (currentRow === sudoku.length)
            return true;
    }

    if (sudoku[currentRow][currentCol] === 0) {
        const validValues = getValidValuesInCell(sudoku, currentRow, currentCol);
        for (let value of validValues) {
            sudoku[currentRow][currentCol] = value;
            if (solveSudokuHelper(sudoku, currentRow, currentCol + 1))
                return true;
        }

        sudoku[currentRow][currentCol] = 0;
        return false;
    }

    return solveSudokuHelper(sudoku, currentRow, currentCol + 1);
};

const getValidValuesInCell = (sudoku, row, col) => {
    const isValidValue = Array.from({ length: 10 }, () => true);

    isValidValue[0] = false;
    for (let i = 0; i < sudoku.length; i++)
        isValidValue[sudoku[i][col]] = false;

    for (let i = 0; i < sudoku.length; i++)
        isValidValue[sudoku[row][i]] = false;

    const subGridX = Math.floor(row / 3);
    const subGridY = Math.floor(col / 3);
    for (let i = subGridX * 3; i < subGridX * 3 + 3; i++)
        for (let j = subGridY * 3; j < subGridY * 3 + 3; j++)
            isValidValue[sudoku[i][j]] = false;

    const validValues = [];
    for (let value = 1; value <= 9; value++)
        if (isValidValue[value])
            validValues.push(value);
    return validValues;
};

export const generateSudoku = (difficulty) => {
    const newSolvedSudoku = solveSudoku(fillDiagonals(INITIAL_BOARD.map(boardRow => [...boardRow])));

    const newCellState = INITIAL_CELL_STATE.map(cellStateRow => [...cellStateRow]);
    const newSudoku = newSolvedSudoku.map(boardRow => [...boardRow]);
    let cellsToRemove = [];
    for (let i = 0; i < 9; i++)
        for (let j = 0; j < 9; j++)
            cellsToRemove.push([i, j]);

    cellsToRemove = shuffle(cellsToRemove);
    const numberOfCellsToRemove = [43, 49, 56].at(difficulty);
    // const numberOfCellsToRemove = 1;
    for (let i = 0; i < numberOfCellsToRemove; i++) {
        const [row, col] = cellsToRemove[i];
        newSudoku[row][col] = "";
        newCellState[row][col] = true;
    }

    return [newSolvedSudoku,newSudoku,newCellState];
};