const { readFileSync } = require('fs');

const readInput = (fileName = 'input.txt') =>
  readFileSync(fileName, 'utf-8').trim();
const readGroups = fileName => readInput(fileName).split('\n\n');
const readLines = fileName => readInput(fileName).split('\n');
const readNumbers = fileName => readLines(fileName).map(line => parseInt(line));

const printPart1 = output => console.log(`Part 1: ${output}`);
const printPart2 = output => console.log(`Part 2: ${output}`);

const numberSort = (a, b) => parseInt(a) - parseInt(b);
const onlyUnique = (value, index, self) => self.indexOf(value) === index;

module.exports = {
  readInput,
  readGroups,
  readLines,
  readNumbers,
  printPart1,
  printPart2,
  numberSort,
  onlyUnique,
};
