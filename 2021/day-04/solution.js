const utils = require('../utils/utils');

class Board {
  numberMatrix;
  coveredMatrix;

  constructor(numberMatrix) {
    this.numberMatrix = numberMatrix;
    this.coveredMatrix = [];
    for (let i = 0; i < this.numberMatrix.length; i++) {
      this.coveredMatrix.push([]);
      for (let j = 0; j < this.numberMatrix[i].length; j++) {
        this.coveredMatrix[i].push(false);
      }
    }
  }

  // Returns whether a number was covered.
  coverNumber(number) {
    for (let i = 0; i < this.numberMatrix.length; i++) {
      for (let j = 0; j < this.numberMatrix[i].length; j++) {
        if (this.numberMatrix[i][j] === number) {
          this.coveredMatrix[i][j] = true;
          return true;
        }
      }
    }
    return false;
  }

  hasBingo() {
    for (let i = 0; i < this.numberMatrix.length; i++) {
      if (
        this.coveredMatrix[i].filter(isCovered => isCovered).length ===
        this.coveredMatrix.length
      ) {
        return true;
      }
    }
    for (let j = 0; j < this.coveredMatrix[0].length; j++) {
      let hasBingo = true;
      for (let i = 0; i < this.numberMatrix.length; i++) {
        if (!this.coveredMatrix[i][j]) {
          hasBingo = false;
          break;
        }
      }
      if (hasBingo) return true;
    }
    return false;
  }

  getUncoveredNumberSum() {
    let sum = 0;
    for (let i = 0; i < this.numberMatrix.length; i++) {
      for (let j = 0; j < this.numberMatrix[i].length; j++) {
        if (!this.coveredMatrix[i][j]) sum += this.numberMatrix[i][j];
      }
    }
    return sum;
  }
}

const input = utils.readInput().split('\n\n');
const numbers = input[0].split(',').map(number => parseInt(number));
const boards = input
  .slice(1)
  .map(group =>
    group.split('\n').map(line =>
      line
        .split(' ')
        .filter(number => number.trim() !== '')
        .map(number => parseInt(number))
    )
  )
  .map(numberMatrix => new Board(numberMatrix));

let winners = [];
for (const number of numbers) {
  for (const board of boards) {
    if (winners.filter(winner => winner.board === board).length > 0) continue;
    let coveredNumber = board.coverNumber(number);
    if (coveredNumber && board.hasBingo()) {
      winners.push({
        board: board,
        number: number,
      });
    }
  }
}

utils.printPart1(winners[0].board.getUncoveredNumberSum() * winners[0].number);

const lastWinner = winners.slice(-1)[0];
utils.printPart2(lastWinner.board.getUncoveredNumberSum() * lastWinner.number);
