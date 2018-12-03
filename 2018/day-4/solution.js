'use strict';

const fs = require('fs');

function part1(inputFilePath) {
  const data = fs.readFileSync(inputFilePath, 'utf8');
}

function part2(inputFilePath) {
  const data = fs.readFileSync(inputFilePath, 'utf8');
}

function main() {
  console.log('Part 1: ' + part1('input.txt'));
  console.log('Part 2: ' + part2('input.txt'));
}

if (require.main === module) main();
