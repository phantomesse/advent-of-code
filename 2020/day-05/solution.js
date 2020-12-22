const { assert } = require('console');
const { printPart1, printPart2, readLines } = require('../utils/utils');

function getSeatId(boardingPass) {
  return getRow(boardingPass) * 8 + getColumn(boardingPass);
}

assert(getSeatId('FBFBBFFRLR') === 357);
assert(getSeatId('BFFFBBFRRR') === 567);
assert(getSeatId('FFFBBBFRRR') === 119);
assert(getSeatId('BBFFBBFRLL') === 820);

function getRow(boardingPass) {
  let potentialRows = [];
  for (let i = 0; i < 128; i++) potentialRows.push(i);
  for (let i = 0; i < 7; i++) {
    const middle = potentialRows.length / 2;
    switch (boardingPass[i]) {
      case 'F':
        potentialRows.splice(middle, middle);
        break;
      case 'B':
        potentialRows.splice(0, middle);
        break;
    }
  }
  return potentialRows[0];
}

assert(getRow('FBFBBFFRLR') === 44);
assert(getRow('BFFFBBFRRR') === 70);
assert(getRow('FFFBBBFRRR') === 14);
assert(getRow('BBFFBBFRLL') === 102);

function getColumn(boardingPass) {
  let potentialColumns = [];
  for (let i = 0; i < 8; i++) potentialColumns.push(i);
  for (let i = 7; i < boardingPass.length; i++) {
    const middle = potentialColumns.length / 2;
    switch (boardingPass[i]) {
      case 'L':
        potentialColumns.splice(middle, middle);
        break;
      case 'R':
        potentialColumns.splice(0, middle);
        break;
    }
  }
  return potentialColumns[0];
}

assert(getColumn('FBFBBFFRLR') === 5);
assert(getColumn('BFFFBBFRRR') === 7);
assert(getColumn('FFFBBBFRRR') === 7);
assert(getColumn('BBFFBBFRLL') === 4);

const boardingPasses = readLines().map(boardingPass => getSeatId(boardingPass));

// Part 1.
printPart1(boardingPasses.reduce((pass1, pass2) => Math.max(pass1, pass2)));

// Part 2.
boardingPasses.sort((pass1, pass2) => parseInt(pass1) - parseInt(pass2));
for (let i = 0; i < boardingPasses.length - 1; i++) {
  if (boardingPasses[i + 1] - boardingPasses[i] > 1) {
    printPart2(boardingPasses[i] + 1);
    break;
  }
}
