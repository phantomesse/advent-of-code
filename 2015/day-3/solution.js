'use strict';

class Neighborhood {
  constructor();
}

function getHouses(instructions) {
  for (const instruction of instructions) {
    console.log(instruction);
  }
}

function main() {
  getHouses('<');
}

if (require.main === module) main();
