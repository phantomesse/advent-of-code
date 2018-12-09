import 'package:test/test.dart';

import 'grid.dart';

void main() {
  group('Part 1', () {
    test('', () {
      final grid = Grid('test-input.txt');
      expect(grid.largestFiniteArea, 17);
    });
  });

  group('Part 2', () {
    test('', () {
      final grid = Grid('test-input.txt');
      expect(grid.getDistanceToAllCoordinates(4, 3), 30);
      expect(grid.getRegionSize(32), 16);
    });
  });
}
