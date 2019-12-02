'use strict';

const fs = require('fs');

function getFuelRequirement(mass) {
  return Math.floor(mass / 3) - 2;
}

function getTotalFuelRequirement(mass) {
  let fuelRequirement = getFuelRequirement(mass);
  if (fuelRequirement < 0) return 0;
  return fuelRequirement + getTotalFuelRequirement(fuelRequirement);
}

// Tests.
console.log(getFuelRequirement(12) == 2);
console.log(getFuelRequirement(14) == 2);
console.log(getFuelRequirement(1969) == 654);
console.log(getFuelRequirement(100756) == 33583);

console.log(getTotalFuelRequirement(14) == 2);
console.log(getTotalFuelRequirement(1969) == 966);
console.log(getTotalFuelRequirement(100756) == 50346);

// Get input.
const inputs = fs
  .readFileSync('input.txt', 'utf8')
  .split('\n')
  .filter(str => str.length > 1)
  .map(str => parseInt(str, 10));

// Part 1.
let answer = inputs.map(getFuelRequirement).reduce((a, b) => a + b);
console.log('Part 1: ' + answer);

// Part 2.
answer = inputs.map(getTotalFuelRequirement).reduce((a, b) => a + b);
console.log('Part 2: ' + answer);
