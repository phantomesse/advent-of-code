'use strict';

const Game = require('./game').Game;

function part1() {
  return new Game('477 players; last marble is worth 70851 points').highScore
}

function part2() {
  return new Game('477 players; last marble is worth 7085100 points').highScore
}

function main() {
  console.log('Part 1: ' + part1());
  console.log('Part 2: ' + part2());
}

if (require.main === module) main();
