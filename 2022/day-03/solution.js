import { printPart1, printPart2, readLines } from '../utils/utils.js';

/**
 * @param {string} letter
 * @returns {number}
 */
function getPriority(letter) {
  if (letter >= 'a' && letter <= 'z') {
    return letter.charCodeAt() - 'a'.charCodeAt() + 1;
  }
  return letter.charCodeAt() - 'A'.charCodeAt() + 27;
}

/**
 * @param {string} strings
 * @returns {string} letter
 */
function getCommonLetter(...strings) {
  /** @type {Object<string, Set<string>>} */
  const letterToStringSet = {};

  for (const string of strings) {
    for (const letter of string) {
      letterToStringSet[letter] = letterToStringSet[letter] || new Set();
      letterToStringSet[letter].add(string);
    }
  }

  return Object.entries(letterToStringSet).find(
    ([_letter, set]) => set.size === strings.length
  )[0];
}

const rucksacks = readLines(import.meta.url);

/**
 * @param {string} rucksack
 * @returns {string} one letter that appears in both compartments
 */
function findError(rucksack) {
  const compartment1 = rucksack.substring(0, rucksack.length / 2);
  const compartment2 = rucksack.substring(rucksack.length / 2);
  return getCommonLetter(compartment1, compartment2);
}

printPart1(
  rucksacks
    .map(findError)
    .map(getPriority)
    .reduce((a, b) => a + b)
);

let sum = 0;
for (let i = 0; i < rucksacks.length; i += 3) {
  const letter = getCommonLetter(...rucksacks.slice(i, i + 3));
  sum += getPriority(letter);
}
printPart2(sum);
