import { printPart1, printPart2, readInput } from '../utils/utils.js';

const elves = readInput(import.meta.url)
  .split('\n\n')
  .map(lines =>
    lines
      .split('\n')
      .map(number => parseInt(number) | 0)
      .reduce((a, b) => a + b)
  );

printPart1(Math.max(...elves));

elves.sort((a, b) => b - a);

printPart2(elves.slice(0, 3).reduce((a, b) => a + b));
