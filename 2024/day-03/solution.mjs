import { part1, part2 } from '../utils/print-output.mjs';
import { readInput } from '../utils/read-input.mjs';

/**
 * @param {string} instruction
 * @returns {number} product
 */
function getMultiplcation(instruction) {
  return instruction
    .match(/[0-9]+/g)
    .map(num => parseInt(num))
    .reduce((a, b) => a * b);
}

const input = readInput();

let sumOfMultiplications = input
  .match(/mul\([0-9]{1,3},[0-9]{1,3}\)/g)
  .map(getMultiplcation)
  .reduce((a, b) => a + b);
part1(sumOfMultiplications);

const instructions = input.match(
  /(mul\([0-9]{1,3},[0-9]{1,3}\))|(do\(\))|(don't\(\))/g
);
sumOfMultiplications = 0;
let enableMulInstructions = true;
for (const instruction of instructions) {
  if (instruction === "don't()") {
    enableMulInstructions = false;
    continue;
  }

  if (instruction === 'do()') {
    enableMulInstructions = true;
    continue;
  }

  if (enableMulInstructions) {
    sumOfMultiplications += getMultiplcation(instruction);
  }
}
part2(sumOfMultiplications);
