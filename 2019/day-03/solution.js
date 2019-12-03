'use strict';

const fs = require('fs');

function getClosestDistance(instructionStr1, instructionStr2) {
  let points1 = _getPoints(instructionStr1);
  let points2 = _getPoints(instructionStr2);
  let intersectedPoints = points1.filter(point1 =>
    points2.some(point2 => point1.x === point2.x && point1.y === point2.y)
  );
  let smallestDistance = Infinity;
  for (let point of intersectedPoints) {
    let distance = Math.abs(point.x) + Math.abs(point.y);
    if (distance < smallestDistance) smallestDistance = distance;
  }
  return smallestDistance;
}

function _getPoints(instructionStr) {
  let instructions = instructionStr.split(',');
  let points = [];
  let x = 0,
    y = 0;
  for (let instruction of instructions) {
    let direction = instruction.charAt(0);
    let steps = parseInt(instruction.substr(1), 10);
    for (let i = 0; i < steps; i++) {
      switch (direction) {
        case 'U':
          points.push({ x: x, y: --y });
          break;
        case 'D':
          points.push({ x: x, y: ++y });
          break;
        case 'L':
          points.push({ x: --x, y: y });
          break;
        case 'R':
          points.push({ x: ++x, y: y });
          break;
      }
    }
  }
  return points;
}

function main() {
  let input = fs.readFileSync('input.txt', 'utf8').split('\n');
  console.log(getClosestDistance('R8,U5,L5,D3', 'U7,R6,D4,L4'));
  console.log(
    getClosestDistance(
      'R75,D30,R83,U83,L12,D49,R71,U7,L72',
      'U62,R66,U55,R34,D71,R55,D58,R83'
    )
  );
  console.log(
    getClosestDistance(
      'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
      'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'
    )
  );
  console.log(getClosestDistance(input[0], input[1]));
}

if (require.main === module) main();
