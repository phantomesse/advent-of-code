const {
  readNumbers,
  printPart1,
  printPart2,
  numberSort,
} = require('../utils/utils');

function part1(preambleLength, numbers) {
  for (let i = preambleLength; i < numbers.length; i++) {
    const prevNumbers = numbers.slice(i - preambleLength, i);
    prevNumbers.sort(numberSort);
    const minSum = prevNumbers[0] + prevNumbers[1];
    const maxSum =
      prevNumbers[prevNumbers.length - 2] + prevNumbers[prevNumbers.length - 1];
    if (numbers[i] < minSum || numbers[i] > maxSum) return numbers[i];
  }
}

function part2(preambleLength, numbers) {
  const invalidNumber = part1(preambleLength, numbers);
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > invalidNumber) continue;
    let sum = numbers[i];
    let pointer = i;
    while (pointer < numbers.length && sum < invalidNumber) {
      pointer++;
      sum += numbers[pointer];
    }
    if (sum === invalidNumber) {
      const weaknesses = numbers.slice(i, pointer + 1);
      return Math.min(...weaknesses) + Math.max(...weaknesses);
    }
  }
}

const numbers = readNumbers();
printPart1(part1(25, numbers));
printPart2(part2(25, numbers));
