const { printPart1, readLines, printPart2 } = require('../utils/utils');

function getTreeCount(input, right, down) {
  const grid = input.map(line => line.split(''));
  let x = 0;
  let y = 0;
  let treeCount = 0;
  do {
    x += right;
    y += down;
    const isTree = grid[y][x % grid[y].length] === '#';
    if (isTree) treeCount++;
  } while (y < grid.length - 1);
  return treeCount;
}

const input = readLines();

// Part 1
printPart1(getTreeCount(input, 3, 1));

// Part 2.
const slopes = [
  { right: 1, down: 1 },
  { right: 3, down: 1 },
  { right: 5, down: 1 },
  { right: 7, down: 1 },
  { right: 1, down: 2 },
];
let treeCounts = slopes.map(slope =>
  getTreeCount(input, slope.right, slope.down)
);
printPart2(treeCounts.reduce((counts, count) => counts * count));
