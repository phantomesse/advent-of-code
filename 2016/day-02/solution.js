import { printPart1, printPart2, readLines } from '../utils/utils.js';

class Keypad {
  static _DIRECTION_TO_OFFSET = {
    U: { row: -1, column: 0 },
    D: { row: 1, column: 0 },
    L: { row: 0, column: -1 },
    R: { row: 0, column: 1 },
  };

  /**
   *
   * @param {string[][]} keypad
   * @param {number} row
   * @param {number} column
   */
  constructor(keypad, row, column) {
    this._keypad = keypad;
    this.row = row;
    this.column = column;
  }

  get number() {
    return this._keypad[this.row][this.column];
  }

  move(/** @type {string} */ direction) {
    if (!Object.keys(Keypad._DIRECTION_TO_OFFSET).includes(direction)) {
      throw `Unknown direction: ${direction}`;
    }
    const offset = Keypad._DIRECTION_TO_OFFSET[direction];
    const newRow = Math.min(
      Math.max(this.row + offset.row, 0),
      this._keypad.length - 1
    );
    const newColumn = Math.min(
      Math.max(this.column + offset.column, 0),
      this._keypad[newRow].length - 1
    );
    if (this._keypad[newRow][newColumn] !== ' ') {
      this.row = newRow;
      this.column = newColumn;
    }
  }
}

function getCode(
  /** @type {Keypad}*/ keypad,
  /** @type {string[]}*/ instructions
) {
  let code = '';
  for (const instruction of instructions) {
    for (const direction of instruction) {
      keypad.move(direction);
    }
    code += keypad.number;
  }
  return code;
}

const instructions = readLines(import.meta.url);
let keypad = new Keypad(
  [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
  ],
  1,
  1
);

printPart1(getCode(keypad, instructions));

keypad = new Keypad(
  [
    [' ', ' ', '1', ' ', ' '],
    [' ', '2', '3', '4', ' '],
    ['5', '6', '7', '8', '9'],
    [' ', 'A', 'B', 'C', ' '],
    [' ', ' ', 'D', ' ', ' '],
  ],
  2,
  0
);

printPart2(getCode(keypad, instructions));
