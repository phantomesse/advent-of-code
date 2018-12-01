import 'dart:math';

import 'grid.dart';
import 'square.dart';

/// Grid used for part 2.
class SumGrid extends Grid {
  int getFirstLargerNumber(int largerThan) {
    var index = 1;
    var number = 0;
    while (number <= largerThan) {
      fillGrid(index++);
      number = squares.last.number;
    }
    return number;
  }

  @override
  Square createSquare(int number) {
    var square = super.createSquare(number);

    if (squares.isEmpty) return square..number = 1;
    square.number = 0;

    // Find neighbors.
    for (var y = max(0, square.y - 1);
        y <= min(grid.length - 1, square.y + 1);
        y++) {
      for (var x = max(0, square.x - 1);
          x <= min(grid[y].length - 1, square.x + 1);
          x++) {
        var neighborSquare = grid[y][x];
        if (neighborSquare == null || (x == square.x && y == square.y))
          continue;
        square.number += neighborSquare.number;
      }
    }

    return square;
  }
}
