import 'dart:async';
import 'package:test/test.dart';

import 'count_grid.dart';

Future main() async {
  group('$CountGrid part 1', () {
    var grid = new CountGrid();

    test(
        'Data from square 1 is carried 0 steps, since it\'s at the access port',
        () {
          expect(grid.getDistance(1), 0);
        });

    test('Data from square 12 is carried 3 steps, such as: down, left, left',
        () {
          expect(grid.getDistance(12), 3);
        });

    test('Data from square 23 is carried only 2 steps: up twice', () {
      expect(grid.getDistance(23), 2);
    });

    test('Data from square 1024 must be carried 31 steps.', () {
      expect(grid.getDistance(1024), 31);
    });
  });
}
