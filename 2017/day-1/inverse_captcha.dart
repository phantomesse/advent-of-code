import 'dart:io';

class InverseCaptcha {
  static int getSum(String input) => _getSum(input, (index) => index + 1);

  static int getHalfwaySum(String input) =>
      _getSum(input, (index) => index + (input.length ~/ 2));

  static List<int> _parseNumbers(String input) =>
      input.split('').map(int.parse).toList(growable: false);

  static int _getSum(String input, OffsetFunction offset) {
    var numbers = _parseNumbers(input);
    var sum = 0;
    for (var i = 0; i < numbers.length; i++) {
      if (numbers[offset(i) % numbers.length] == numbers[i]) sum += numbers[i];
    }
    return sum;
  }
}

typedef int OffsetFunction(int index);

void main() {
  var input = new File('part1.txt').readAsStringSync();
  print(InverseCaptcha.getSum(input));

  input = new File('part2.txt').readAsStringSync();
  print(InverseCaptcha.getHalfwaySum(input));
}
