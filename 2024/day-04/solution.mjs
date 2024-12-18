import { part1, part2 } from '../utils/print-output.mjs';
import { readLines } from '../utils/read-input.mjs';

/**
 *
 */

/**
 * @readonly
 * @enum {int[]}
 */
const Move = {
  UP: [0, -1],
  DOWN: [0, 1],
  LEFT: [-1, 0],
  RIGHT: [1, 0],
  UP_LEFT: [-1, -1],
  UP_RIGHT: [1, -1],
  DOWN_LEFT: [-1, 1],
  DOWN_RIGHT: [1, 1],
};

class WordSearch {
  constructor() {
    this.grid = readLines().map(line => line.split(''));
  }

  findXmas(x, y) {}

  isValidMove(nextX, nextY) {}
}

const wordSearch = new WordSearch();
console.log(wordSearch.grid);
