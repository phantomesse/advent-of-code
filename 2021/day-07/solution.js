const utils = require('../utils/utils');

const positions = utils
  .readInput()
  .split(',')
  .map(position => parseInt(position));
positions.sort((a, b) => a - b);

function getLowestFuel(positions, getTotalFuelFn) {
  let lowestFuel;
  for (let i = positions[0]; i <= positions.slice(-1)[0]; i++) {
    const fuel = getTotalFuelFn(positions, i);
    if (!lowestFuel || fuel < lowestFuel) lowestFuel = fuel;
  }
  return lowestFuel;
}

function getTotalFuelPart1(positions, i) {
  return positions
    .map(position => Math.abs(position - i))
    .reduce((a, b) => a + b);
}
utils.printPart1(getLowestFuel(positions, getTotalFuelPart1));

function getTotalFuelPart2(positions, i) {
  let totalFuel = 0;
  for (let position of positions) {
    let fuel = 0;
    let fuelAmount = 1;
    while (position != i) {
      if (position > i) {
        position--;
      } else {
        position++;
      }
      fuel += fuelAmount;
      fuelAmount++;
    }
    totalFuel += fuel;
  }
  return totalFuel;
}
utils.printPart2(getLowestFuel(positions, getTotalFuelPart2));
