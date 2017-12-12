import 'direction.dart';

class Square {
  int number;
  int x, y;
  Direction nextDirection;

  @override
  String toString() {
    var numberStr = number.toString().padRight(3);
    var coordinates = '($x, $y)';
    return '$numberStr $coordinates ${getString(nextDirection)}'.padRight(15);
  }
}
