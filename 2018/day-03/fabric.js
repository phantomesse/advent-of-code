'use strict';

class Fabric {
  constructor(claims) {
    this.claims = claims;

    // Get width and height of the fabric.
    let width = 0;
    let height = 0;
    for (const claim of claims) {
      width = Math.max(width, claim.x + claim.width);
      height = Math.max(height, claim.y + claim.height);
    }

    // Create fabric matrix.
    this.fabric = [];
    for (let row = 0; row < height; row++) {
      let rowContents = [];
      for (let column = 0; column < width; column++) {
        rowContents.push('.');
      }
      this.fabric.push(rowContents);
    }

    // Add claims.
    for (const claim of claims) {
      const points = claim.points;
      for (const point of points) {
        const fabricSquare = this.fabric[point.y][point.x];
        if (fabricSquare === '.') {
          this.fabric[point.y][point.x] = claim.id;
        } else {
          this.fabric[point.y][point.x] = 'X';
        }
      }
    }
  }

  get overlappingSquareCount() {
    let count = 0;
    for (let i = 0; i < this.fabric.length; i++) {
      for (let j = 0; j < this.fabric[i].length; j++) {
        if (this.fabric[i][j] === 'X') count++;
      }
    }
    return count;
  }

  get intactClaimId() {
    for (const claim of this.claims) {
      const points = claim.points;

      let intact = true;
      for (const point of points) {
        if (this.fabric[point.y][point.x] === 'X') {
          intact = false;
          break;
        }
      }

      if (intact) return claim.id;
    }
  }
}

module.exports.Fabric = Fabric;
