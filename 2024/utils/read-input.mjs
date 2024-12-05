import { readFileSync } from 'fs';

/**
 * Reads an input file and returns the output as a string.
 *
 * @param {string} fileName
 * @returns {string[]}
 */
export function readInput(fileName = 'input.txt') {
  if (process.argv.length > 2) fileName = process.argv.slice(-1)[0];
  return readFileSync(fileName, 'utf-8');
}

/**
 * Reads an input file and returns the output as an array of strings
 * representing each line.
 *
 * @param {string} fileName
 * @returns {string[]}
 */
export function readLines(fileName) {
  return readInput(fileName)
    .split('\n')
    .filter(line => line.trim().length > 0);
}
