'use strict';

const fs = require('fs');

function part1(inputFilePath) {
  const data = fs.readFileSync(inputFilePath, 'utf8');
}

function part2(inputFilePath) {
  const data = fs.readFileSync(inputFilePath, 'utf8');
}

function main() {
  console.log(part1('input.txt'));
  console.log(part2('input.txt'));
}

if (require.main === module) main();

module.exports.part1 = part1;
module.exports.part2 = part2;
