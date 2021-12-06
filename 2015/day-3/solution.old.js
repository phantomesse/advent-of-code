const fs = require('fs');

const NORTH = '^';
const EAST = '>';
const SOUTH = 'v';
const WEST = '<';

const OPPOSITE_DIRECTIONS = {};
OPPOSITE_DIRECTIONS[NORTH] = SOUTH;
OPPOSITE_DIRECTIONS[SOUTH] = NORTH;
OPPOSITE_DIRECTIONS[EAST] = WEST;
OPPOSITE_DIRECTIONS[WEST] = EAST;

const ADJACENT_DIRECTIONS = {};
ADJACENT_DIRECTIONS[NORTH] = [EAST, WEST];
ADJACENT_DIRECTIONS[SOUTH] = [EAST, WEST];
ADJACENT_DIRECTIONS[EAST] = [NORTH, SOUTH];
ADJACENT_DIRECTIONS[WEST] = [NORTH, SOUTH];

class Neighborhood {
  startHouse;
  allHouses;

  constructor(instructions) {
    const directions = instructions.split('');

    this.startHouse = new House();
    this.startHouse.presentCount++;
    this.allHouses = [this.startHouse];

    let currentHouse = this.startHouse;
    for (let direction of directions) {
      if (!currentHouse.hasHouse(direction)) {
        const newHouse = currentHouse.addHouse(direction);
        this.allHouses.push(newHouse);
      }
      currentHouse = currentHouse.getHouse(direction);
      currentHouse.presentCount++;
    }
  }
}

class House {
  northHouse;
  southHouse;
  eastHouse;
  westHouse;
  presentCount;

  constructor() {
    this.presentCount = 0;
  }

  hasHouse(direction) {
    return this.getHouse(direction) !== undefined;
  }

  getHouse(direction) {
    switch (direction) {
      case NORTH:
        return this.northHouse;
      case SOUTH:
        return this.southHouse;
      case EAST:
        return this.eastHouse;
      case WEST:
        return this.westHouse;
    }
  }

  setHouse(direction, house) {
    switch (direction) {
      case NORTH:
        this.northHouse = house;
      case SOUTH:
        this.southHouse = house;
      case EAST:
        this.eastHouse = house;
      case WEST:
        this.westHouse = house;
    }
  }

  addHouse(direction) {
    const newHouse = new House();
    this.setHouse(direction, newHouse);
    newHouse.setHouse(OPPOSITE_DIRECTIONS[direction], this);
    for (const adjacentDirection of ADJACENT_DIRECTIONS[direction]) {
      if (
        this.hasHouse(adjacentDirection) &&
        this.getHouse(adjacentDirection).hasHouse(direction)
      ) {
        newHouse.setHouse(
          adjacentDirection,
          this.getHouse(adjacentDirection).getHouse(direction)
        );
        if (!newHouse.hasHouse(direction)) {
          newHouse.setHouse(
            direction,
            this.getHouse(adjacentDirection)
              .getHouse(direction)
              .getHouse(OPPOSITE_DIRECTIONS[adjacentDirection])
          );
        }
      }
    }
    return newHouse;
  }
}

const instructions = fs.readFileSync('input.txt', 'utf-8');
let neighborhood = new Neighborhood('>');
console.log(neighborhood.allHouses);
console.log(`Part 1: ${neighborhood.allHouses.length}`);
