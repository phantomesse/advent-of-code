const utils = require('../utils/utils');

const lines = utils.readLines();

function isCorrupt(line) {
  const stack = [];
  for (const bracket of line) {
    if (['[', '{', '(', '<'].includes(bracket)) {
      stack.push(bracket);
      continue;
    }
    const popped = { '[': ']', '{': '}', '(': ')', '<': '>' }[stack.pop()];
    if (bracket !== popped) return bracket;
  }
  return false;
}

function getCompletion(line) {
  const stack = [];
  for (const bracket of line) {
    if (['[', '{', '(', '<'].includes(bracket)) {
      stack.push(bracket);
      continue;
    }
    stack.pop();
  }
  return stack;
}

const corruptScoring = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};
const completionScoring = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4,
};

let corruptScore = 0;
let completionScores = [];
for (const line of lines) {
  const corrupt = isCorrupt(line);
  if (corrupt) {
    corruptScore += corruptScoring[corrupt];
  } else {
    const completion = getCompletion(line);
    let completionScore = 0;
    for (let i = completion.length - 1; i >= 0; i--) {
      completionScore = completionScore * 5 + completionScoring[completion[i]];
    }
    completionScores.push(completionScore);
  }
}
completionScores.sort((a, b) => a - b);
const completionScore =
  completionScores[Math.floor(completionScores.length / 2)];
console.log(completionScore);

utils.printPart1(corruptScore);
utils.printPart2();
