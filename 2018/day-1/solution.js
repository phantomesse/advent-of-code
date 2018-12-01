'use strict'

const fs = require('fs');

function part1(inputFilePath) {
  const changes = _readInputFile(inputFilePath);

  var frequency = 0;
  for (const change of changes) {
    frequency += change;
  }

  return frequency;
}

function part2(inputFilePath) {
  const changes = _readInputFile(inputFilePath);

  var frequency = 0;
  var frequencies = new Set([frequency]);
  while (true) {
    for (const change of changes) {
      frequency += change;
      if (frequencies.has(frequency)) return frequency;
      frequencies.add(frequency);
    }
  }
}

// Returns array of numbers.
function _readInputFile(filePath) {
  return fs.readFileSync(filePath, 'utf8')
    .split('\n')
    .map((str) => parseInt(str));
}

function main() {
  console.log(part1('input.txt'));
  console.log(part2('input.txt'));
}

if (require.main === module) main();

module.exports.part1 = part1;
module.exports.part2 = part2;
