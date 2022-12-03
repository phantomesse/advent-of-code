import { printPart1, printPart2, readLines } from '../utils/utils.js';

/**
 * @readonly
 * @enum {string}
 */
const Shape = { ROCK: 'rock', PAPER: 'paper', SCISSORS: 'scissors' };

/**
 * @readonly
 * @enum {number}
 */
const GameResult = { WIN: 6, LOSE: 0, DRAW: 3 };

class Game {
  /**
   * @param {Shape} yourMove
   * @param {Shape} opponentMove
   */
  constructor(yourMove, opponentMove) {
    this.yourMove = yourMove;
    this.opponentMove = opponentMove;
  }

  /**
   * @returns {number}
   */
  get moveScore() {
    switch (this.yourMove) {
      case Shape.ROCK:
        return 1;
      case Shape.PAPER:
        return 2;
      case Shape.SCISSORS:
        return 3;
    }
  }

  /**
   * @returns {GameResult}
   */
  get gameResult() {
    if (this.yourMove === this.opponentMove) return GameResult.DRAW;
    switch (this.yourMove) {
      case Shape.ROCK:
        return this.opponentMove === Shape.SCISSORS
          ? GameResult.WIN
          : GameResult.LOSE;
      case Shape.PAPER:
        return this.opponentMove === Shape.ROCK
          ? GameResult.WIN
          : GameResult.LOSE;
      case Shape.SCISSORS:
        return this.opponentMove === Shape.PAPER
          ? GameResult.WIN
          : GameResult.LOSE;
    }
  }

  get gameScore() {
    return this.moveScore + this.gameResult;
  }
}

function getInstructions(cypher) {
  return readLines(import.meta.url).map(line =>
    line.split(' ').map(letter => cypher[letter])
  );
}

const Part1Cypher = {
  A: Shape.ROCK,
  B: Shape.PAPER,
  C: Shape.SCISSORS,
  X: Shape.ROCK,
  Y: Shape.PAPER,
  Z: Shape.SCISSORS,
};
printPart1(
  getInstructions(Part1Cypher)
    .map(shapes => new Game(shapes[1], shapes[0]).gameScore)
    .reduce((a, b) => a + b)
);

const Part2Cypher = {
  A: Shape.ROCK,
  B: Shape.PAPER,
  C: Shape.SCISSORS,
  X: GameResult.LOSE,
  Y: GameResult.DRAW,
  Z: GameResult.WIN,
};

/**
 * @param {Shape} opponentMove
 * @param {GameResult} gameResult
 */
function getGameScore(opponentMove, gameResult) {
  for (const yourMove of Object.values(Shape)) {
    const game = new Game(yourMove, opponentMove);
    if (game.gameResult === gameResult) return game.gameScore;
  }
}
printPart2(
  getInstructions(Part2Cypher)
    .map(instructions => getGameScore(instructions[0], instructions[1]))
    .reduce((a, b) => a + b)
);
