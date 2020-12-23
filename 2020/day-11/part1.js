const { readLines, printPart1 } = require('../utils/utils');

const adjacencyMatrix = [
  { x: 0, y: -1 }, // above
  { x: 0, y: 1 }, // below
  { x: 1, y: 0 }, // right
  { x: -1, y: 0 }, // left
  { x: 1, y: 1 }, // diagonal bottom right
  { x: -1, y: 1 }, // diagonal bottom left
  { x: 1, y: -1 }, // diagonal top right
  { x: -1, y: -1 }, // diagonal top left
];

function updateSeatingArrangement(seatingArrangement) {
  let newSeatingArrangement = copySeatingArrangement(seatingArrangement);
  for (let y = 0; y < seatingArrangement.length; y++) {
    for (let x = 0; x < seatingArrangement[y].length; x++) {
      let cell = seatingArrangement[y][x];
      if (cell === '.') continue;
      if (cell === 'L') {
        // Only occupy if there are no adjacent occupied seats.
        let hasAdjacentOccupiedSeat = false;
        for (let adjacency of adjacencyMatrix) {
          let newY = y + adjacency.y;
          let newX = x + adjacency.x;
          if (newY < 0 || newY >= seatingArrangement.length) continue;
          if (newX < 0 || newX >= seatingArrangement[newY].length) continue;
          if (seatingArrangement[newY][newX] === '#') {
            hasAdjacentOccupiedSeat = true;
            break;
          }
        }
        if (!hasAdjacentOccupiedSeat) newSeatingArrangement[y][x] = '#';
      } else if (cell === '#') {
        // Unoccupy if there are >=4 adjacent occupied seats.
        let adjacentOccupiedSeatCount = 0;
        for (let adjacency of adjacencyMatrix) {
          let newY = y + adjacency.y;
          let newX = x + adjacency.x;
          if (newY < 0 || newY >= seatingArrangement.length) continue;
          if (newX < 0 || newX >= seatingArrangement[newY].length) continue;
          if (seatingArrangement[newY][newX] === '#') {
            adjacentOccupiedSeatCount++;
          }
        }
        if (adjacentOccupiedSeatCount >= 4) {
          newSeatingArrangement[y][x] = 'L';
        }
      }
    }
  }
  return newSeatingArrangement;
}

function copySeatingArrangement(seatingArrangement) {
  let copy = [];
  for (let row = 0; row < seatingArrangement.length; row++) {
    copy.push([...seatingArrangement[row]]);
  }
  return copy;
}

function seatingArrangementToString(seatingArrangement) {
  let str = '';
  for (let row = 0; row < seatingArrangement.length; row++) {
    str += seatingArrangement[row].join('') + '\n';
  }
  return str;
}

function getOccupiedSeatCount(seatingArrangement) {
  let occupiedSeatCount = 0;
  for (let y = 0; y < seatingArrangement.length; y++) {
    for (let x = 0; x < seatingArrangement[y].length; x++) {
      if (seatingArrangement[y][x] === '#') occupiedSeatCount++;
    }
  }
  return occupiedSeatCount;
}

let seatingArrangement = readLines().map(line => line.split(''));
let newSeatingArrangement = seatingArrangement;
do {
  seatingArrangement = newSeatingArrangement;
  newSeatingArrangement = updateSeatingArrangement(seatingArrangement);
} while (
  seatingArrangementToString(newSeatingArrangement) !==
  seatingArrangementToString(seatingArrangement)
);

printPart1(getOccupiedSeatCount(newSeatingArrangement));
