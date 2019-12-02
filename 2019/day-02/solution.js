'use strict';

const fs = require('fs');

function runIntcode(code) {
  let numbers = _getNumbers(code);
  return _processNumbers(numbers, 0).join(',');
}

// Separate code by commas.
function _getNumbers(code) {
  return code
    .split(',')
    .filter(str => str.length > 0)
    .map(str => parseInt(str.trim(), 10));
}

function _processNumbers(numbers, startIndex) {
  const opcode = numbers[startIndex];
  switch (opcode) {
    case 1:
      let sum =
        numbers[numbers[startIndex + 1]] + numbers[numbers[startIndex + 2]];
      numbers[numbers[startIndex + 3]] = sum;
      break;
    case 2:
      let product =
        numbers[numbers[startIndex + 1]] * numbers[numbers[startIndex + 2]];
      numbers[numbers[startIndex + 3]] = product;
      break;
    case 99:
      return numbers;
  }
  return _processNumbers(numbers, startIndex + 4);
}

function main() {
  // Part 1.
  let input = fs.readFileSync('part1.txt', 'utf8');
  let answer = runIntcode(input).split(',')[0];
  console.log('Part 1: ' + answer);

  // Part 2.
  input = fs.readFileSync('part2.txt', 'utf8');
  let output = 0;
  let noun = 0;
  let verb = 0;
  do {
    if (verb == 99) {
      noun++;
      verb = 0;
    } else verb++;
    if (noun == 99 && verb == 99) break;
    let numbers = _getNumbers(input);
    numbers[1] = noun;
    numbers[2] = verb;
    let outputNumbers = _processNumbers(numbers, 0);
    output = outputNumbers[0];
  } while (output != 19690720);

  console.log('Part 2: ' + (100 * noun + verb));
}

if (require.main === module) main();

module.exports.runIntcode = runIntcode;
