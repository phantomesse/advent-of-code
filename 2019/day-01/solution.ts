import { readFileSync } from 'fs';

export function getFuelRequired(mass: number): number {
  return Math.floor(mass / 3) - 2;
}

export function getTotalFuelRequired(mass: number): number {
  let fuelRequired = getFuelRequired(mass);
  if (fuelRequired < 0) return 0;
  return fuelRequired + getTotalFuelRequired(fuelRequired);
}

// Get masses.
let masses = readFileSync('input.txt', 'utf8')
  .split('\n')
  .map((input: string) => parseInt(input, 10));

// Part 1.
let fuelRequired = masses
  .map(getFuelRequired)
  .reduce((a: number, b: number) => a + b);
console.log(`part 1: ${fuelRequired}`);

// Part 2.
let totalFuelRequired = masses
  .map(getTotalFuelRequired)
  .reduce((a: number, b: number) => a + b);
console.log(`part 2: ${totalFuelRequired}`);
