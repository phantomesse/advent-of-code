const {
  DIRECTIONS,
  getOppositeDirection,
  getAdjacentDirections,
} = require('./directions.js');
const fs = require('fs');

console.log(DIRECTIONS);

class House {
  directionToHouseMap;
  presentCount;

  constructor() {
    this.directionToHouseMap = {};
    this.presentCount = 0;
  }

  hasHouse(direction) {
    return direction in this.directionToHouseMap;
  }

  getHouse(direction) {
    return this.directionToHouseMap[direction];
  }

  setHouse(direction, house) {
    this.directionToHouseMap[direction] = house;
  }

  addHouse(direction) {
    const newHouse = new House();

    this.setHouse(direction, newHouse);
    newHouse.setHouse(getOppositeDirection(direction), this);

    const adjacentDirections = getAdjacentDirections(direction);
    for (const adjacentDirection of adjacentDirections) {
      if (!this.hasHouse(adjacentDirection)) continue;
      const adjacentHouse = this.getHouse(adjacentDirection);
      if (adjacentHouse.hasHouse(direction)) {
        let house = adjacentHouse.getHouse(direction);
        newHouse.setHouse(adjacentDirection, house);
        house.setHouse(getOppositeDirection(adjacentDirection), newHouse);

        if (
          house.hasHouse(direction) &&
          house
            .getHouse(direction)
            .hasHouse(getOppositeDirection(adjacentDirection))
        ) {
          house = house
            .getHouse(direction)
            .getHouse(getOppositeDirection(adjacentDirection));
          newHouse.setHouse(direction, house);
          house.setHouse(getOppositeDirection(direction), newHouse);
        }
      }
    }
    return newHouse;
  }
}

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

const instructions = fs.readFileSync('input.txt', 'utf-8');
let neighborhood = new Neighborhood(instructions);
console.log(neighborhood.allHouses);
console.log(`Part 1: ${neighborhood.allHouses.length}`);
