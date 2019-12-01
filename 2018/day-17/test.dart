import 'package:test/test.dart';
import 'reservoir.dart';

void main() {
  group('$Reservoir', () {
    Reservoir reservoir;

    setUp(() {
      reservoir = Reservoir('test-input.txt');
    });

    test('initial state', () {
      expect(
          reservoir.toString(),
          '......+.......\n'
          '............#.\n'
          '.#..#.......#.\n'
          '.#..#..#......\n'
          '.#..#..#......\n'
          '.#.....#......\n'
          '.#.....#......\n'
          '.#######......\n'
          '..............\n'
          '..............\n'
          '....#.....#...\n'
          '....#.....#...\n'
          '....#.....#...\n'
          '....#######...');
    });

    test('water count', () {
      expect(reservoir.waterCount, 0);
    });
  });
}
