'use strict';

class Claim {
  constructor(claim) {
    const parts = claim.split(' ');
    this.id = parts[0].substring(1);

    const position = parts[2].split(',')
    this.x = parseInt(position[0]);
    this.y = parseInt(position[1]);

    const dimensions = parts[3].split('x');
    this.width = parseInt(dimensions[0]);
    this.height = parseInt(dimensions[1]);
  }

  containsPoint(x, y) {
    return x >= this.x && x < this.x + this.width &&
      y >= this.y && y < this.y + this.height;
  }
}

module.exports.Claim = Claim;
