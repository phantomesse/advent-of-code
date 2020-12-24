const { readLines } = require('../utils/utils');

const debug = false;

const Color = { none: 'none', white: 'white', black: 'black' };
const oppositeDirections = {
  e: 'w',
  se: 'nw',
  sw: 'ne',
  w: 'e',
  nw: 'se',
  ne: 'sw',
};
const adjacentDirections = ['e', 'se', 'sw', 'w', 'nw', 'ne'];

class Tile {
  constructor() {
    this.color = Color.none;
    this.flipCount = 0;
    this.e;
    this.se;
    this.sw;
    this.w;
    this.nw;
    this.ne;
  }

  connectTile(direction, newTile) {
    if (this[direction]) {
      if (debug) console.log('already connected to new tile in ' + direction);
      return;
    }

    // Connect to current tile.
    this[direction] = newTile;
    if (debug) {
      console.log(`\nconnect current tile on ${direction} to new tile`);
    }
    newTile[oppositeDirections[direction]] = this;
    if (debug) {
      console.log(
        `connect new tile on ${oppositeDirections[direction]} to current tile`
      );
    }

    // Connect to left adjacent tile if exists.
    let leftAdjacentDirection = Tile.getLeftAdjacentDirection(direction);
    if (debug) {
      console.log(
        `checking for any tiles connected to ${leftAdjacentDirection}`
      );
    }
    if (this[leftAdjacentDirection]) {
      let directionToConnectToNewTile = Tile.getLeftAdjacentDirection(
        oppositeDirections[leftAdjacentDirection]
      );
      if (debug) console.log('should attach at ' + directionToConnectToNewTile);
      this[leftAdjacentDirection].connectTile(
        directionToConnectToNewTile,
        newTile
      );
    }

    // Connect to right adjacent tile if exists.
    let rightAdjacentDirection = Tile.getRightAdjacentDirection(direction);
    if (debug) {
      console.log(
        `checking for any tiles connected to ${rightAdjacentDirection}`
      );
    }
    if (this[rightAdjacentDirection]) {
      let directionToConnectToNewTile = Tile.getRightAdjacentDirection(
        oppositeDirections[rightAdjacentDirection]
      );
      if (debug) console.log('should attach at ' + directionToConnectToNewTile);
      this[rightAdjacentDirection].connectTile(
        directionToConnectToNewTile,
        newTile
      );
    }
  }

  static getLeftAdjacentDirection(direction) {
    return adjacentDirections[
      (adjacentDirections.indexOf(direction) - 1 + adjacentDirections.length) %
        adjacentDirections.length
    ];
  }

  static getRightAdjacentDirection(direction) {
    return adjacentDirections[
      (adjacentDirections.indexOf(direction) + 1 + adjacentDirections.length) %
        adjacentDirections.length
    ];
  }

  toString() {
    return 'currently is ' + this.color + ' flipped ' + this.flipCount;
  }
}

class Floor {
  constructor(tileDirectionsInput) {
    this.rootTile = new Tile();
    this.blackCount = 0;
    this.whiteCount = 0;
    this.noneCount = 1;

    let tileDirections = tileDirectionsInput.map(Floor._parseSpecifications);
    for (const directions of tileDirections) {
      console.log(`\nfinding tile for ${directions.join('')}`);
      // Get to the tile.
      let currentTile = this.rootTile;
      for (const direction of directions) {
        if (currentTile[direction] === undefined) {
          if (debug) console.log('\n--adding new tile to ' + direction + '--');
          let newTile = new Tile();
          this.noneCount++;
          currentTile.connectTile(direction, newTile);
        }
        if (debug) console.log('-- moving to tile on the ' + direction + '--');
        currentTile = currentTile[direction];
      }

      // Flip the tile.
      if (currentTile.color === Color.none) {
        currentTile.color = Color.black;
        this.noneCount--;
        this.blackCount++;
        currentTile.flipCount++;
        console.log(
          'flip from none to black and flip count is ' + currentTile.flipCount
        );
      } else if (currentTile.color === Color.white) {
        currentTile.color = Color.black;
        this.whiteCount--;
        this.blackCount++;
        currentTile.flipCount++;
        console.log(
          'flip from white to black and flip count is ' + currentTile.flipCount
        );
      } else {
        currentTile.color = Color.white;
        this.whiteCount++;
        this.blackCount--;
        currentTile.flipCount++;
        console.log(
          'flip from black to white and flip count is ' + currentTile.flipCount
        );
      }
    }
  }

  static _parseSpecifications(input) {
    const specifications = [];
    for (let i = 0; i < input.length; i++) {
      const letter = input.charAt(i);
      if (letter === 'e' || letter === 'w') {
        specifications.push(letter);
        continue;
      }
      const direction = input.substr(i, 2);
      specifications.push(direction);
      i++;
    }
    return specifications;
  }
}

const tileDirections = readLines('test-input.txt');
const floor = new Floor(tileDirections);
console.log('white: ' + floor.whiteCount);
console.log('black: ' + floor.blackCount);
console.log('none: ' + floor.noneCount);
