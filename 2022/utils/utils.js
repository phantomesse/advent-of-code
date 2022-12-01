import { readFileSync } from 'fs';

/**
 * @param {string} url pass in `import.meta.url`
 * @param {string} fileName default is 'input.txt' but can also be overriden in
 *                          function parameter or as the first CLI argument
 * @returns {string}
 */
export function readInput(url, fileName = 'input.txt') {
  if (process.argv.length > 2) fileName = process.argv.slice(-1)[0];
  return readFileSync(new URL(fileName, url), 'utf-8');
}

/**
 * @param {*} output
 * @returns {void}
 */
export const printPart1 = output => console.log(`Part 1: ${output}`);

/**
 * @param {*} output
 * @returns {void}
 */
export const printPart2 = output => console.log(`Part 2: ${output}`);
