enum Direction { right, up, left, down }

class Pair {
  final int x, y;
  Pair(this.x, this.y);
}

Pair getShiftPair(Direction direction) {
  switch (direction) {
    case Direction.right:
      return new Pair(1, 0);
    case Direction.up:
      return new Pair(0, -1);
    case Direction.left:
      return new Pair(-1, 0);
    case Direction.down:
      return new Pair(0, 1);
    default: throw new Exception('Unsupported direction $direction');
  }
}

String getString(Direction direction) {
  switch (direction) {
    case Direction.right:
      return '→';
    case Direction.up:
      return '↑';
    case Direction.left:
      return '←';
    case Direction.down:
      return '↓';
    default: throw new Exception('Unsupported direction $direction');
  }
}
