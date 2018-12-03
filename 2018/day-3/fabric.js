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

    this.fabric = [];
    this.overlappingSquareCount = 0;
    for (let row = 0; row < height; row++) {
      let rowContents = [];

      for (let column = 0; column < width; column++) {
        let content = '.';

        for (const claim of claims) {
          if (claim.containsPoint(column, row)) {
            if (content != '.') {
              content = 'X';
              this.overlappingSquareCount++;
            } else content = claim.id;
          }
        }

        rowContents.push(content);
      }

      this.fabric.push(rowContents);
    }

    console.log(this.fabric);
  }

  getOverlappingSquareCount() {
    return this.overlappingSquareCount;
  }
}
module.exports.Fabric = Fabric;
