const { readLines, printPart1 } = require('../utils/utils');

const directions = {
  N: { x: 0, y: 1 },
  E: { x: 1, y: 0 },
  S: { x: 0, y: -1 },
  W: { x: -1, y: 0 },
};

class Ship {
  constructor() {
    this.facing = 'E';
    this.x = 0;
    this.y = 0;
  }

  move(facing, value) {
    let offsetX = directions[facing].x * value;
    let offsetY = directions[facing].y * value;
    this.x += offsetX;
    this.y += offsetY;
  }

  moveForward = value => this.move(this.facing, value);

  turnRight(degrees) {
    let compass = Object.keys(directions);
    let index =
      (compass.indexOf(this.facing) + degrees / 90 + compass.length) %
      compass.length;
    this.facing = compass[index];
  }

  turnLeft = degrees => this.turnRight(-degrees);

  toString = () => `${this.facing}(${this.x}, ${this.y})`;
}

const input = readLines();
const ship = new Ship();
for (const line of input) {
  let action = line.charAt(0);
  let value = parseInt(line.substr(1));
  switch (action) {
    case 'L':
      ship.turnLeft(value);
      break;
    case 'R':
      ship.turnRight(value);
      break;
    case 'F':
      ship.moveForward(value);
      break;
    default:
      ship.move(action, value);
  }
}
printPart1(Math.abs(ship.x) + Math.abs(ship.y));
