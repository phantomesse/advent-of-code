'use strict';

const fs = require('fs');

function getFloor(instructions) {
  let floor = 0;
  for (const instruction of instructions) {
    if (instruction === '(') floor++;
    if (instruction === ')') floor--;
  }
  return floor;
}

function part1(inputFilePath) {
  const instructions = fs.readFileSync(inputFilePath, 'utf8');
  return getFloor(instructions);
}

function getFirstBasementPosition(instructions) {
  let floor = 0;
  let index = 0;

  for (const instruction of instructions) {
    index++;
    if (instruction === '(') floor++;
    if (instruction === ')') floor--;
    if (floor === -1) break;
  }

  return index;
}

function part2(inputFilePath) {
  const instructions = fs.readFileSync(inputFilePath, 'utf8');
  return getFirstBasementPosition(instructions);
}

function main() {
  console.log(part1('input.txt'));
  console.log(part2('input.txt'));
}

if (require.main === module) main();

module.exports.getFloor = getFloor;
module.exports.part1 = part1;
module.exports.getFirstBasementPosition = getFirstBasementPosition;
module.exports.part2 = part2;
