const { readLines, printPart1, printPart2 } = require('../utils/utils');

function Part1Policy(policyStr) {
  this.minTimes = parseInt(policyStr.split('-')[0]);
  this.maxTimes = parseInt(policyStr.split(' ')[0].split('-')[1]);
  this.letter = policyStr.split(' ')[1];
  this.isValid = function (password) {
    const letterTimes = password
      .split('')
      .filter(letter => letter === this.letter).length;
    return letterTimes >= this.minTimes && letterTimes <= this.maxTimes;
  };
}

function Part2Policy(policyStr) {
  this.position1 = parseInt(policyStr.split('-')[0]) - 1;
  this.position2 = parseInt(policyStr.split(' ')[0].split('-')[1]) - 1;
  this.letter = policyStr.split(' ')[1];
  this.isValid = function (password) {
    return (
      (password[this.position1] === this.letter ||
        password[this.position2] === this.letter) &&
      !(
        password[this.position1] === this.letter &&
        password[this.position2] === this.letter
      )
    );
  };
}

function solution(input, PolicyClass) {
  let validPasswordCount = 0;
  for (const line of input) {
    const policy = new PolicyClass(line.split(': ')[0]);
    if (policy.isValid(line.split(': ')[1])) {
      validPasswordCount++;
    }
  }
  return validPasswordCount;
}

const input = readLines();
printPart1(solution(input, Part1Policy));
printPart2(solution(input, Part2Policy));
