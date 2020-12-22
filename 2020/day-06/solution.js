const { readFileSync } = require('fs');

const groups = readFileSync('input.txt', { encoding: 'utf-8' })
  .split('\n\n')
  .map(line => line.trim())
  .filter(line => line.length > 0);

function part1(groups) {
  const answerCounts = groups.map(
    group =>
      new Set(group.split('').filter(character => character != '\n')).size
  );
  return answerCounts.reduce((a, b) => a + b);
}

function part2(groups) {
  function getYesCount(group) {
    const people = group.split('\n');
    if (people.length === 1) return people[0].length;
    const answers = {};
    for (const answer of people[0].split('')) {
      answers[answer] = true;
    }
    for (const person of people) {
      for (const answer of Object.keys(answers)) {
        if (!person.includes(answer)) answers[answer] = false;
      }
    }
    return Object.values(answers).filter(allYes => allYes).length;
  }
  return groups.map(getYesCount).reduce((a, b) => a + b);
}

console.log(part1(groups));
console.log(part2(groups));
