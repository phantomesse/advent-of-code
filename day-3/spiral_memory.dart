class SpiralMemory {
  List<List<Square>> _grid = <List<Square>>[];
  List<Square> _map = <Square>[null];

  /// Last square in the grid.
  Square _lastSquare;

  void fillGrid(int lastNumber) {
    while (_lastSquare == null || _lastSquare.number < lastNumber) {
      var number = _lastSquare == null ? 1 : (_lastSquare.number + 1);
      _lastSquare = _addSquare(number);
      _map.add(_lastSquare);
    }
  }

  int getDistance(int number) {
    fillGrid(number);
    var square = _map[number];
    var firstSquare = _map[1];
    return (square.x - firstSquare.x).abs() + (square.y - firstSquare.y).abs();
  }

  void draw() {
    for (var row in _grid) {
      var rowStr = '';
      for (var square in row) {
        rowStr += '$square';
      }
      print(rowStr);
    }
  }

  Square _addSquare(int number) {
    var square = new Square()..number = number;

    // Base case.
    if (number == 1) {
      _grid.add(<Square>[square]);
      return square
        ..x = 0
        ..y = 0
      ..nextDirection = Direction.right;
    }

    switch (_lastSquare.nextDirection) {
      case Direction.right: return _addToRight(square);
      case Direction.up: return _addAbove(square);
      case Direction.left: return _addToLeft(square);
      case Direction.down: return _addBelow(square);
    }

    return square;
  }

  Square _addToRight(Square square) {
    square
      ..x = _lastSquare.x + 1
      ..y = _lastSquare.y
      ..nextDirection = Direction.right;

    if (square.x == _grid[square.y].length) {
      // Add a column to the right.
      for (var row in _grid) {
        row.add(null);
      }
      square.nextDirection = Direction.up;
    } else {
      square.nextDirection = Direction.right;
    }

    _grid[square.y][square.x] = square;
    return square;
  }

  Square _addAbove(Square square) {
    square
      ..x = _lastSquare.x
      ..y = _lastSquare.y - 1;

    if (square.y == -1) {
      // Add a row above.
      for (var row in _grid) {
        for (var square in row) {
          square.y++;
        }
      }
      _grid.insert(0, new List.generate(_grid[0].length, (_) => null));
      square..y = 0
      ..nextDirection = Direction.left;
    } else {
      square.nextDirection = Direction.up;
    }

    _grid[square.y][square.x] = square;
    return square;
  }

  Square _addToLeft(Square square) {
    square
      ..x = _lastSquare.x - 1
      ..y = _lastSquare.y;

    if (square.x == -1) {
      // Add a column to the left.
      for (var row in _grid) {
        for (var square in row) {
          square.x++;
        }
      }
      for (var row in _grid) {
        row.insert(0, null);
      }
      square
        ..x = 0
      ..nextDirection = Direction.down;
    } else {
      square.nextDirection = Direction.left;
    }

    _grid[square.y][square.x] = square;
    return square;
  }

  Square _addBelow(Square square) {
    square
      ..x = _lastSquare.x
      ..y = _lastSquare.y + 1;

    if (square.y == _grid.length) {
      // Add a row below.
      _grid.add(new List.generate(_grid.last.length, (_) => null));
      square.nextDirection = Direction.right;
    } else {
      square.nextDirection = Direction.down;
    }

    _grid[square.y][square.x] = square;
    return square;
  }
}

class Square {
  int number;
  int x, y;
  Direction nextDirection;

  @override
  String toString() {
    var numberStr = _formatString('$number', 3);
    var coordinates = '(${_formatString('$x', 2)}, ${_formatString('$y', 2)})';

    var directionStr;
    switch (nextDirection) {
      case Direction.right:
        directionStr= '→';
        break;
      case Direction.up:
        directionStr= '↑';
        break;
      case Direction.left:
        directionStr= '←';
        break;
      case Direction.down:
        directionStr= '↓';
        break;
    }

    return _formatString('$numberStr $coordinates $directionStr', 15);
  }

  String _formatString(String str, int length) {
    while (str.length < length) {
      str = ' ' + str;
    }
    return str;
  }
}

enum Direction { right, up, left, down }

void main() {
  var grid = new SpiralMemory();
  grid.fillGrid(25);
  grid.draw();

  print(grid.getDistance(289326));
}
