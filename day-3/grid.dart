import 'direction.dart';
import 'square.dart';

abstract class Grid {
  /// Matrix of all the squares.
  final List<List<Square>> grid = <List<Square>>[
    <Square>[null]
  ];

  /// List of all the [Square]s in the order that they were added into the grid.
  final List<Square> squares = <Square>[];

  void fillGrid(int length) {
    while (squares.length < length) {
      var square = createSquare(squares.length + 1);
      grid[square.y][square.x] = square;
      squares.add(square);
    }
  }

  Square createSquare(int number) {
    var square = new Square();

    // Base case.
    if (squares.isEmpty) {
      assert(number == 1);
      return square
        ..x = 0
        ..y = 0
        ..nextDirection = Direction.right;
    }

    // Get the direction to add this square to based on the last square.
    var lastSquare = squares.last;
    var nextDirection = lastSquare.nextDirection;
    var shiftPair = getShiftPair(nextDirection);
    square
      ..x = lastSquare.x + shiftPair.x
      ..y = lastSquare.y + shiftPair.y
      ..nextDirection = nextDirection;

    // Edge cases.
    if (nextDirection == Direction.right &&
        square.x == grid[square.y].length) {
      _addRightColumn();
      square.nextDirection = Direction.up;
    } else if (nextDirection == Direction.up && square.y == -1) {
      _addRowAbove();
      square
        ..y = 0
        ..nextDirection = Direction.left;
    } else if (nextDirection == Direction.left && square.x == -1) {
      _addLeftColumn();
      square
        ..x = 0
        ..nextDirection = Direction.down;
    } else if (nextDirection == Direction.down && square.y == grid.length) {
      _addRowBelow();
      square.nextDirection = Direction.right;
    }

    return square;
  }

  /// Add a column to the right of the grid.
  void _addRightColumn() {
    grid.forEach((row) => row.add(null));
  }

  /// Add a column to the left of the grid.
  void _addLeftColumn() {
    for (var row in grid) {
      row.forEach((square) => square.x++);
      row.insert(0, null);
    }
  }

  /// Add a row to the top of the grid.
  void _addRowAbove() {
    for (var row in grid) {
      row.forEach((square) => square.y++);
    }
    grid.insert(0, new List.generate(grid.first.length, (_) => null));
  }

  /// Add a row to the bottom of the grid.
  void _addRowBelow() {
    grid.add(new List.generate(grid.last.length, (_) => null));
  }

  @override
  String toString() {
    return grid.map((row) {
      return row.map((square) => square.toString()).join(' ');
    }).join('\n');
  }
}
