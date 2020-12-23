const { runInThisContext } = require('vm');
const { readLines, printPart2 } = require('../utils/utils');

const directionToOffsetMap = {
  N: { x: 0, y: 1 },
  E: { x: 1, y: 0 },
  S: { x: 0, y: -1 },
  W: { x: -1, y: 0 },
};

class Ship {
  constructor() {
    this.shipX = 0;
    this.shipY = 0;
    this.waypointOffsetX = 10;
    this.waypointOffsetY = 1;
  }

  moveWaypoint(direction, value) {
    let offset = directionToOffsetMap[direction];
    this.waypointOffsetX += offset.x * value;
    this.waypointOffsetY += offset.y * value;
  }

  moveForward(value) {
    this.shipX += this.waypointOffsetX * value;
    this.shipY += this.waypointOffsetY * value;
  }

  turnRight(degrees) {
    let turnTimes = degrees / 90;
    for (let i = 0; i < turnTimes; i++) {
      if (this.waypointOffsetX >= 0 && this.waypointOffsetY >= 0) {
        // Pointing NE, switch to SE.
        let temp = this.waypointOffsetY;
        this.waypointOffsetY = -this.waypointOffsetX;
        this.waypointOffsetX = temp;
      } else if (this.waypointOffsetX >= 0 && this.waypointOffsetY < 0) {
        // Pointing SE, switch to SW.
        let temp = this.waypointOffsetY;
        this.waypointOffsetY = -this.waypointOffsetX;
        this.waypointOffsetX = temp;
      } else if (this.waypointOffsetX < 0 && this.waypointOffsetY < 0) {
        // Pointing SW, switch to NW.
        let temp = this.waypointOffsetY;
        this.waypointOffsetY = -this.waypointOffsetX;
        this.waypointOffsetX = temp;
      } else if (this.waypointOffsetX < 0 && this.waypointOffsetY >= 0) {
        // Pointing NW, switch to NE.
        let temp = this.waypointOffsetY;
        this.waypointOffsetY = -this.waypointOffsetX;
        this.waypointOffsetX = temp;
      }
    }
  }

  turnLeft(degrees) {
    let turnTimes = degrees / 90;
    for (let i = 0; i < turnTimes; i++) {
      if (this.waypointOffsetX >= 0 && this.waypointOffsetY >= 0) {
        // Pointing NE, switch to NW.
        let temp = this.waypointOffsetY;
        this.waypointOffsetY = this.waypointOffsetX;
        this.waypointOffsetX = -temp;
      } else if (this.waypointOffsetX >= 0 && this.waypointOffsetY < 0) {
        // Pointing SE, switch to NE.
        let temp = this.waypointOffsetY;
        this.waypointOffsetY = this.waypointOffsetX;
        this.waypointOffsetX = -temp;
      } else if (this.waypointOffsetX < 0 && this.waypointOffsetY < 0) {
        // Pointing SW, switch to SE.
        let temp = this.waypointOffsetY;
        this.waypointOffsetY = this.waypointOffsetX;
        this.waypointOffsetX = -temp;
      } else if (this.waypointOffsetX < 0 && this.waypointOffsetY >= 0) {
        // Pointing NW, switch to SW.
        let temp = this.waypointOffsetY;
        this.waypointOffsetY = this.waypointOffsetX;
        this.waypointOffsetX = -temp;
      }
    }
  }

  toString() {
    return `ship (${this.shipX}, ${this.shipY})\nwaypoint (${this.waypointOffsetX}, ${this.waypointOffsetY})\n`;
  }
}

const input = readLines();
const ship = new Ship();
for (const line of input) {
  let action = line.charAt(0);
  let value = parseInt(line.substr(1));
  switch (action) {
    case 'F':
      ship.moveForward(value);
      break;
    case 'L':
      ship.turnLeft(value);
      break;
    case 'R':
      ship.turnRight(value);
      break;
    default:
      ship.moveWaypoint(action, value);
  }
  console.log(`${line}\n${ship.toString()}\n`);
}

printPart2(Math.abs(ship.shipX) + Math.abs(ship.shipY));
