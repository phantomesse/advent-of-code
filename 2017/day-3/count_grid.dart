import 'grid.dart';
import 'square.dart';

/// Grid used for part 1.
class CountGrid extends Grid {
  int getDistance(int number) {
    fillGrid(number);
    var square = squares[number - 1];
    var firstSquare = squares.first;
    return (square.x - firstSquare.x).abs() + (square.y - firstSquare.y).abs();
  }

  @override
  Square createSquare(int number) {
    return super.createSquare(number)
        ..number = number;
  }
}
