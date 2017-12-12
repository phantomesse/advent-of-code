import 'dart:async';
import 'package:test/test.dart';

import 'spiral_memory.dart';

Future main() async {
  group('$SpiralMemory part 1', () {
    var spiralMemory = new SpiralMemory();

    test(
        'Data from square 1 is carried 0 steps, since it\'s at the access port',
        () {
          expect(spiralMemory.getDistance(1), 0);
        });

    test('Data from square 12 is carried 3 steps, such as: down, left, left',
        () {
          expect(spiralMemory.getDistance(12), 3);
        });

    test('Data from square 23 is carried only 2 steps: up twice', () {
      expect(spiralMemory.getDistance(23), 2);
    });

    test('Data from square 1024 must be carried 31 steps.', () {
      expect(spiralMemory.getDistance(1024), 31);
    });
  });
}
