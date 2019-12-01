import 'pair.dart';

class Vein {
  int _startX, _startY, _endX, _endY;

  Vein(String input) {
    final parts = input.split(', ');
    assert(parts.length == 2);

    final firstPart = parts.first.split('=');
    final number = int.parse(firstPart.last);
    if (firstPart.first == 'x') {
      _startX = number;
      _endX = number;
    } else {
      assert(firstPart.first == 'y');
      _startY = number;
      _endY = number;
    }

    final secondPart = parts.last.split('=');
    final numbers = secondPart.last.split('..').map(int.parse);
    if (secondPart.first == 'x') {
      _startX = numbers.first;
      _endX = numbers.last;
    } else {
      assert(secondPart.first == 'y');
      _startY = numbers.first;
      _endY = numbers.last;
    }
  }

  Pair get start => Pair(_startX, _startY);
  Pair get end => Pair(_endX, _endY);
}
