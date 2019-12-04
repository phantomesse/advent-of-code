import { readFileSync } from 'fs';

const _directionDeltas = {
  U: { x: 0, y: -1 },
  D: { x: 0, y: 1 },
  L: { x: -1, y: 0 },
  R: { x: 1, y: 0 }
};

function _getPoints(instructionsStr: string): { x: number; y: number }[] {
  let instructions = instructionsStr.split(',');
  let points: { x: number; y: number }[] = [];
  let x = 0,
    y = 0;
  for (let instruction of instructions) {
    let directionDelta = _directionDeltas[instruction.charAt(0)];
    let steps = parseInt(instruction.substr(1), 10);
    for (let i = 0; i < steps; i++) {
      x += directionDelta.x;
      y += directionDelta.y;
      points.push({ x: x, y: y });
    }
  }
  return points;
}

function _arePointsTheSame(
  point1: { x: number; y: number },
  point2: { x: number; y: number }
): boolean {
  return point1.x === point2.x && point1.y === point2.y;
}

function _getManhattanDistance(point: { x: number; y: number }): number {
  return Math.abs(point.x) + Math.abs(point.y);
}

function _sortPoints(
  point1: { x: number; y: number },
  point2: { x: number; y: number }
): number {
  return _getManhattanDistance(point1) - _getManhattanDistance(point2);
}

export function getShortestDistance(
  instructions1: string,
  instructions2: string
) {
  let points1 = _getPoints(instructions1);
  let points2 = _getPoints(instructions2);
  points1.sort(_sortPoints);
  points2.sort(_sortPoints);

  for (let point2 of points2) {
    let distance2 = _getManhattanDistance(point2);
    for (let point1 of points1) {
      let distance1 = _getManhattanDistance(point1);
      if (distance1 < distance2) continue;
      if (distance1 > distance2) break;
      if (_arePointsTheSame(point1, point2)) {
        return _getManhattanDistance(point1);
      }
    }
  }
}

export function getFewestSteps(instructions1: string, instructions2: string) {
  let points1 = _getPoints(instructions1);
  let points2 = _getPoints(instructions2);

  for (let steps1 = 1; steps1 <= points1.length; steps1++) {
    for (let steps2 = 1; steps2 <= points2.length; steps2++) {
      if (_arePointsTheSame(points1[steps1 - 1], points2[steps2 - 1])) {
        return steps1 + steps2;
      }
    }
  }
}

function main() {
  // Get instructions.
  let instructions = readFileSync('input.txt', 'utf8').split('\n');

  // Part 1.
  console.log(
    `part 1: ${getShortestDistance(instructions[0], instructions[1])}`
  );

  // Part 2.
  console.log(`part 2: ${getFewestSteps(instructions[0], instructions[1])}`);
}

if (require.main === module) main();
