const DIRECTIONS = {
  NORTH: '^',
  EAST: '>',
  SOUTH: 'v',
  WEST: '<',
};

function getOppositeDirection(direction) {
  const directions = Object.values(DIRECTIONS);
  return directions[(directions.indexOf(direction) + 2) % directions.length];
}

console.assert(getOppositeDirection(DIRECTIONS.NORTH) === DIRECTIONS.SOUTH);
console.assert(getOppositeDirection(DIRECTIONS.SOUTH) === DIRECTIONS.NORTH);
console.assert(getOppositeDirection(DIRECTIONS.EAST) === DIRECTIONS.WEST);
console.assert(getOppositeDirection(DIRECTIONS.WEST) === DIRECTIONS.EAST);

function getAdjacentDirections(direction) {
  const directions = Object.values(DIRECTIONS);
  const oppositeDirection = getOppositeDirection(direction);
  return directions.filter(
    dir => dir !== direction && dir != oppositeDirection
  );
}

console.assert(
  getAdjacentDirections(DIRECTIONS.NORTH).join('') ===
    [DIRECTIONS.EAST, DIRECTIONS.WEST].join('')
);
console.assert(
  getAdjacentDirections(DIRECTIONS.SOUTH).join('') ===
    [DIRECTIONS.EAST, DIRECTIONS.WEST].join('')
);
console.assert(
  getAdjacentDirections(DIRECTIONS.EAST).join('') ===
    [DIRECTIONS.NORTH, DIRECTIONS.SOUTH].join('')
);
console.assert(
  getAdjacentDirections(DIRECTIONS.WEST).join('') ===
    [DIRECTIONS.NORTH, DIRECTIONS.SOUTH].join('')
);

module.exports = {
  DIRECTIONS,
  getOppositeDirection,
  getAdjacentDirections,
};
