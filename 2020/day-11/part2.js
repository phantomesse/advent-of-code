const { readLines, printPart2 } = require('../utils/utils');

const directions = [
  { x: 0, y: -1 }, // above
  { x: 0, y: 1 }, // below
  { x: 1, y: 0 }, // right
  { x: -1, y: 0 }, // left
  { x: 1, y: 1 }, // diagonal bottom right
  { x: -1, y: 1 }, // diagonal bottom left
  { x: 1, y: -1 }, // diagonal top right
  { x: -1, y: -1 }, // diagonal top left
];

class SeatingArrangement {
  constructor(grid) {
    this._grid = grid;
    this.reachedEqulibrium = false;
  }

  update() {
    let newGrid = this._copyGrid();
    for (let y = 0; y < this._grid.length; y++) {
      for (let x = 0; x < this._grid[y].length; x++) {
        let cell = this._grid[y][x];
        if (cell === '.') continue;
        let occupiedSeatCount = this._getSeenOccupiedSeatCount(x, y);
        if (cell === '#' && occupiedSeatCount >= 5) newGrid[y][x] = 'L';
        if (cell === 'L' && occupiedSeatCount == 0) newGrid[y][x] = '#';
      }
    }
    let oldStr = this.toString();
    this._grid = newGrid;
    this.reachedEqulibrium = oldStr === this.toString();
  }

  getOccupiedSeatCount() {
    return this._grid
      .map(row => row.filter(cell => cell === '#').length)
      .reduce((a, b) => a + b);
  }

  _copyGrid = () => this._grid.map(row => [...row]);

  _getSeenOccupiedSeatCount(x, y) {
    let occupiedSeatCount = 0;
    for (const direction of directions) {
      let newX = x + direction.x;
      let newY = y + direction.y;
      while (this._isValid(newX, newY)) {
        let cell = this._grid[newY][newX];
        if (cell === '#') {
          occupiedSeatCount++;
          break;
        }
        if (cell === 'L') break;
        newX += direction.x;
        newY += direction.y;
      }
    }
    return occupiedSeatCount;
  }

  _isValid(x, y) {
    if (x < 0 || y < 0) return false;
    return y < this._grid.length && x < this._grid[y].length;
  }

  toString = () => this._grid.map(row => row.join('')).join('\n');
}

const grid = readLines().map(line => line.split(''));
let seatingArrangement = new SeatingArrangement(grid);
while (!seatingArrangement.reachedEqulibrium) seatingArrangement.update();
printPart2(seatingArrangement.getOccupiedSeatCount());
