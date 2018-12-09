'use strict';

const fs = require('fs');
const Claim = require('./claim').Claim;
const Fabric = require('./fabric').Fabric;

function _createFabric(inputFilePath) {
  const claims = fs.readFileSync(inputFilePath, 'utf8').split('\n')
    .map(input => new Claim(input));
  return new Fabric(claims);
}

function part1(fabric) {
  return fabric.overlappingSquareCount;
}

function part2(fabric) {
  return fabric.intactClaimId;
}

function main() {
  const fabric = _createFabric('input.txt');
  console.log('Part 1: ' + part1(fabric));
  console.log('Part 2: ' + part2(fabric));
}

if (require.main === module) main();
