const {
  onlyUnique,
  printPart1,
  printPart2,
  readGroups,
} = require('../utils/utils');

function part1(groups) {
  const answerCounts = groups.map(
    group =>
      group
        .split('')
        .filter(character => character != '\n')
        .filter(onlyUnique).length
  );
  return answerCounts.reduce((a, b) => a + b);
}

function part2(groups) {
  function getYesCount(group) {
    const people = group.split('\n');
    if (people.length === 1) return people[0].length;
    const answers = {};
    for (const answer of people[0].split('')) answers[answer] = true;
    for (const person of people) {
      for (const answer of Object.keys(answers)) {
        if (!person.includes(answer)) answers[answer] = false;
      }
    }
    return Object.values(answers).filter(allYes => allYes).length;
  }
  return groups.map(getYesCount).reduce((a, b) => a + b);
}

const groups = readGroups();
printPart1(part1(groups));
printPart2(part2(groups));
