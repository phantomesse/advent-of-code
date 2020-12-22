const { readNumbers, printPart1, printPart2 } = require('../utils/utils');

function part1(input) {
  for (var i = 0; i < input.length - 1; i++) {
    for (var j = i + 1; j < input.length; j++) {
      if (input[i] + input[j] === 2020) return input[i] * input[j];
    }
  }
}

function part2(input) {
  for (var i = 0; i < input.length - 2; i++) {
    for (var j = i + 1; j < input.length - 1; j++) {
      for (var k = j + 1; k < input.length; k++) {
        if (input[i] + input[j] + input[k] === 2020) {
          return input[i] * input[j] * input[k];
        }
      }
    }
  }
}

const input = readNumbers();
printPart1(part1(input));
printPart2(part2(input));
