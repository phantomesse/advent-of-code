const { readLines, printPart1 } = require('../utils/utils');

const input = readLines();
const earliestTimestamp = parseInt(input[0]);
const buses = input[1]
  .split(',')
  .filter(bus => bus !== 'x')
  .map(bus => parseInt(bus));
let time = earliestTimestamp;
let earliestBus;
while (earliestBus === undefined) {
  for (const bus of buses) {
    if (time % bus === 0) {
      earliestBus = bus;
      break;
    }
  }
  time++;
}
printPart1(earliestBus * (time - 1 - earliestTimestamp));
