'use strict';

const fs = require('fs');
const Claim = require('./claim').Claim;
const Fabric = require('./fabric').Fabric;

function part1(inputFilePath) {
  const claims = fs.readFileSync(inputFilePath, 'utf8').split('\n')
    .map((input) => new Claim(input));
  const fabric = new Fabric(claims);
  return fabric.getOverlappingSquareCount();
}

function part2(inputFilePath) {
  const data = fs.readFileSync(inputFilePath, 'utf8');
}

function main() {
  console.log('Part 1: ' + part1('input.txt'));
  //  console.log(part2('input.txt'));
}

if (require.main === module) main();

module.exports.part1 = part1;
module.exports.part2 = part2;
