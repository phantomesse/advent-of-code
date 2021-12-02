const utils = require('../utils/utils');

const instructions = utils
  .readLines()
  .map(line => line.split(' '))
  .map(array => {
    return {
      direction: array[0],
      units: parseInt(array[1]),
    };
  });

let horizontalPos = 0,
  depth = 0;
for (const instruction of instructions) {
  switch (instruction.direction) {
    case 'forward':
      horizontalPos += instruction.units;
      break;
    case 'down':
      depth += instruction.units;
      break;
    case 'up':
      depth -= instruction.units;
      break;
  }
}
utils.printPart1(horizontalPos * depth);

(horizontalPos = 0), (depth = 0), (aim = 0);
for (const instruction of instructions) {
  switch (instruction.direction) {
    case 'forward':
      horizontalPos += instruction.units;
      depth += aim * instruction.units;
      break;
    case 'down':
      aim += instruction.units;
      break;
    case 'up':
      aim -= instruction.units;
      break;
  }
}
utils.printPart2(horizontalPos * depth);
