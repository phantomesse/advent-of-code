import 'direction.dart';
import 'square.dart';

/// Grid used for part 1.
class CountGrid {
  /// Matrix of all the squares.
  final List<List<Square>> _grid = <List<Square>>[
    <Square>[null]
  ];

  /// Map of number to [Square].
  final Map<int, Square> _map = <int, Square>{};

  int getDistance(int number) {
    _fillGrid(number);
    var square = _map[number];
    var firstSquare = _map[1];
    return (square.x - firstSquare.x).abs() + (square.y - firstSquare.y).abs();
  }

  void _fillGrid(int length) {
    while (_map.length < length) {
      var square = _createSquare(_map.length + 1);
      _grid[square.y][square.x] = square;
      _map[square.number] = square;
    }
  }

  Square _createSquare(int number) {
    var square = new Square()..number = number;

    // Base case.
    if (_map.isEmpty) {
      assert(number == 1);
      return square
        ..x = 0
        ..y = 0
        ..nextDirection = Direction.right;
    }

    // Get the direction to add this square to based on the last square.
    var lastSquare = _map[_map.length];
    var nextDirection = lastSquare.nextDirection;
    var shiftPair = getShiftPair(nextDirection);
    square
      ..x = lastSquare.x + shiftPair.x
      ..y = lastSquare.y + shiftPair.y
      ..nextDirection = nextDirection;

    // Edge cases.
    if (nextDirection == Direction.right &&
        square.x == _grid[square.y].length) {
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
    } else if (nextDirection == Direction.down && square.y == _grid.length) {
      _addRowBelow();
      square.nextDirection = Direction.right;
    }

    return square;
  }

  /// Add a column to the right of the grid.
  void _addRightColumn() {
    _grid.forEach((row) => row.add(null));
  }

  /// Add a column to the left of the grid.
  void _addLeftColumn() {
    for (var row in _grid) {
      row.forEach((square) => square.x++);
      row.insert(0, null);
    }
  }

  /// Add a row to the top of the grid.
  void _addRowAbove() {
    for (var row in _grid) {
      row.forEach((square) => square.y++);
    }
    _grid.insert(0, new List.generate(_grid.first.length, (_) => null));
  }

  /// Add a row to the bottom of the grid.
  void _addRowBelow() {
    _grid.add(new List.generate(_grid.last.length, (_) => null));
  }

  @override
  String toString() {
    return _grid.map((row) {
      return row.map((square) => square.toString()).join(' ');
    }).join('\n');
  }
}
