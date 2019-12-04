import { readFileSync } from 'fs';

enum Cardinal {
  North,
  East,
  South,
  West
}

const _cardinateDeltas = [
  { x: 0, y: 1 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: -1, y: 0 }
];

export function getDistance(instructionsStr: string) {
  let instructions = instructionsStr.split(', ');
  let coordinate = { x: 0, y: 0 };
  let direction = Cardinal.North;
  for (let instruction of instructions) {
    let directionDelta = instruction.charAt(0) == 'R' ? 1 : -1;
    direction = (direction + directionDelta + 4) % 4;
    let steps = parseInt(instruction.substr(1), 10);
    coordinate.x += steps * _cardinateDeltas[direction].x;
    coordinate.y += steps * _cardinateDeltas[direction].y;
  }
  return Math.abs(coordinate.x) + Math.abs(coordinate.y);
}

export function getFirstLocationVisitedTwice(instructionsStr: string) {
  let instructions = instructionsStr.split(', ');
  let coordinates: { x: number; y: number }[] = [];
  let direction = Cardinal.North;
  for (let instruction of instructions) {
    let directionDelta = instruction.charAt(0) == 'R' ? 1 : -1;
    direction = (direction + directionDelta + 4) % 4;
    let steps = parseInt(instruction.substr(1), 10);
    for (let i = 0; i < steps; i++) {
      let x =
        (coordinates.length == 0 ? 0 : coordinates[coordinates.length - 1].x) +
        _cardinateDeltas[direction].x;
      let y =
        (coordinates.length == 0 ? 0 : coordinates[coordinates.length - 1].y) +
        _cardinateDeltas[direction].y;
      if (
        coordinates.some(coordinate => coordinate.x === x && coordinate.y === y)
      ) {
        return Math.abs(x) + Math.abs(y);
      }
      coordinates.push({ x: x, y: y });
    }
  }
}

function main() {
  let input = readFileSync('input.txt', 'utf8');

  // Part 1.
  console.log(`part 1: ${getDistance(input)}`);

  // Part 2.
  console.log(`part 2: ${getFirstLocationVisitedTwice(input)}`);
}

if (require.main === module) main();
