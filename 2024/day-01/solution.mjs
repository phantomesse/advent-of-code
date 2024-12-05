import { part1, part2 } from '../utils/print-output.mjs';
import { readLines } from '../utils/read-input.mjs';

const leftNums = [];
const rightNums = [];

const lines = readLines();
for (const line of lines) {
  const [leftNum, rightNum] = line.split('   ').map(str => parseInt(str));
  leftNums.push(leftNum);
  rightNums.push(rightNum);
}

leftNums.sort();
rightNums.sort();

let totalDistance = 0;
for (let i = 0; i < leftNums.length; i++) {
  totalDistance += Math.abs(leftNums[i] - rightNums[i]);
}
part1(totalDistance);

let similarityScore = 0;
for (let i = 0; i < leftNums.length; i++) {
  similarityScore +=
    leftNums[i] * rightNums.filter(num => num === leftNums[i]).length;
}
part2(similarityScore);
