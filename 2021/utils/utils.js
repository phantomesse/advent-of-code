const { readFileSync } = require('fs');

const readInput = (fileName = 'input.txt') => {
  if (process.argv.length > 2) {
    fileName = process.argv.slice(-1)[0];
  }
  return readFileSync(fileName, 'utf-8').trim();
};
const readLines = fileName => readInput(fileName).split('\n');
const readNumbers = fileName => readLines(fileName).map(line => parseInt(line));

const printPart1 = output => console.log(`Part 1: ${output}`);
const printPart2 = output => console.log(`Part 2: ${output}`);

module.exports = {
  readInput,
  readLines,
  readNumbers,
  printPart1,
  printPart2,
};
