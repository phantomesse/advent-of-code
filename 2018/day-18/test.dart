import 'package:test/test.dart';
import 'forest.dart';

void main() {
  group('$Forest', () {
    Forest forest;

    setUp(() {
      forest = Forest('test-input.txt');
    });

    test('initial state', () {
      expect(
          forest.toString(),
          '.#.#...|#.\n'
          '.....#|##|\n'
          '.|..|...#.\n'
          '..|#.....#\n'
          '#.#|||#|#|\n'
          '...#.||...\n'
          '.|....|...\n'
          '||...#|.#|\n'
          '|.||||..|.\n'
          '...#.|..|.');
    });

    test('after 1 minute', () {
      forest.incrementMinute();
      expect(
          forest.toString(),
          '.......##.\n'
          '......|###\n'
          '.|..|...#.\n'
          '..|#||...#\n'
          '..##||.|#|\n'
          '...#||||..\n'
          '||...|||..\n'
          '|||||.||.|\n'
          '||||||||||\n'
          '....||..|.');
    });

    test(
        'after 10 minutes, there are 37 wooded acres and 31 lumberyards with a total resource value of 1147',
        () {
      for (var i = 0; i < 10; i++) {
        forest.incrementMinute();
      }
      expect(forest.woodedAcres, 37);
      expect(forest.lumberyards, 31);
      expect(forest.resourceValue, 1147);
    });
  });
}
