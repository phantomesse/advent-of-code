import 'dart:async';
import 'package:test/test.dart';
import 'inverse_captcha.dart';

Future main() async {
  group('$InverseCaptcha part 1', () {
    test(
        '1122 produces a sum of 3 (1 + 2) because the first digit (1) matches '
        'the second digit and the third digit (2) matches the fourth digit',
        () {
      expect(InverseCaptcha.getSum('1122'), 3);
    });

    test('1111 produces 4 because each digit (all 1) matches the next.', () {
      expect(InverseCaptcha.getSum('1111'), 4);
    });

    test('1234 produces 0 because no digit matches the next', () {
      expect(InverseCaptcha.getSum('1234'), 0);
    });

    test(
        '91212129 produces 9 because the only digit that matches the next one '
        'is the last digit, 9.', () {
      expect(InverseCaptcha.getSum('91212129'), 9);
    });
  });

  group('$InverseCaptcha part 2', () {
    test(
        '1212 produces 6: the list contains 4 items, and all four digits match '
        'the digit 2 items ahead', () {
      expect(InverseCaptcha.getHalfwaySum('1212'), 6);
    });

    test('1221 produces 0, because every comparison is between a 1 and a 2',
        () {
      expect(InverseCaptcha.getHalfwaySum('1221'), 0);
    });

    test(
        '123425 produces 4, because both 2s match each other, but no other '
        'digit has a match', () {
      expect(InverseCaptcha.getHalfwaySum('123425'), 4);
    });

    test('123123 produces 12', () {
      expect(InverseCaptcha.getHalfwaySum('123123'), 12);
    });

    test('12131415 produces 4', () {
      expect(InverseCaptcha.getHalfwaySum('12131415'), 4);
    });
  });
}
