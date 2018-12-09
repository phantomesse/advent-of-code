'use strict'

const fs = require('fs');

// Returns {two: a, three: b}
function getLetterCounts(boxId) {
  const letterToCountMap = {};
  for (const letter of boxId) {
    if (letter in letterToCountMap) {
      letterToCountMap[letter]++;
    } else {
      letterToCountMap[letter] = 1;
    }
  }

  const letterCounts = {};
  for (const letter in letterToCountMap) {
    if (letterToCountMap[letter] === 2) {
      letterCounts.two = letter;
    }
    if (letterToCountMap[letter] === 3) {
      letterCounts.three = letter;
    }
  }

  return letterCounts;
}

function part1(inputFilePath) {
  const boxIds = fs.readFileSync(inputFilePath, 'utf8').split('\n');

  var twoCounts = 0;
  var threeCounts = 0;
  for (const boxId of boxIds) {
    const letterCounts = getLetterCounts(boxId);
    if ('two' in letterCounts) twoCounts++;
    if ('three' in letterCounts) threeCounts++;
  }

  return twoCounts * threeCounts;
}

function part2(inputFilePath) {
  const boxIds = fs.readFileSync(inputFilePath, 'utf8').split('\n');

  for (var i = 0; i < boxIds.length; i++) {
    for (var j = i + 1; j < boxIds.length; j++) {
      const sameLetters = _getSameLetters(boxIds[i], boxIds[j]);
      if (sameLetters.length === boxIds[i].length - 1) {
        return sameLetters.join('');
      }
    }
  }
}

function _getSameLetters(boxId1, boxId2) {
  var sameLetters = [];
  for (var i = 0; i < boxId1.length; i++) {
    const letter = boxId1[i];
    if (boxId2[i] === letter) sameLetters.push(letter);
  }
  return sameLetters;
}

function main() {
  console.log(part1('input.txt'));
  console.log(part2('input.txt'));
}

if (require.main === module) main();

module.exports.getLetterCounts = getLetterCounts;
module.exports.part1 = part1;
module.exports.part2 = part2;
