import 'package:test/test.dart';

import 'garden.dart';
import 'note.dart';

void main() {
  group('$Note', () {
    Note note;

    setUp(() {
      note = Note('##.#. => .');
    });

    test('parsing', () {
      expect(note.potOrientation, '##.#.');
      expect(note.currentPot, '.');
      expect(note.newPot, '.');
    });

    test('matching', () {
      expect(note.matches('..##.#.#####', 4), true);
      expect(note.matches('...#.#.#.#.#', 4), false);
    });
  });

  group('$Garden', () {
    Garden garden;

    setUp(() {
      garden = Garden('test-input.txt');
    });

    test('initial state', () {
      expect(garden.generation, 0);
      expect(garden.pots, '#..#.#..##......###...###');
    });

    test('notes', () {
      expect(garden.notes, hasLength(14));
      expect(garden.notes.first.potOrientation, '...##');
      expect(garden.notes.first.currentPot, '.');
      expect(garden.notes.first.newPot, '#');
    });

    test('pot sum', () {
      for (var i = 0; i < 20; i++) {
        garden.advanceGeneration();
      }
      expect(garden.potSum, 325);
    });

    test('generations', () {
      expect(garden.generation, 0);
      expect(garden.pots, contains('#..#.#..##......###...###'));

      garden.advanceGeneration();

      expect(garden.generation, 1);
      expect(garden.pots, contains('#...#....#.....#..#..#..#'));

      garden.advanceGeneration();

      expect(garden.generation, 2);
      expect(garden.pots, contains('..##..##...##....#..#..#..##'));

      garden.advanceGeneration();

      expect(garden.generation, 3);
      expect(garden.pots, contains('.#.#...#..#.#....#..#..#...#'));

      garden.advanceGeneration();

      expect(garden.generation, 4);
      expect(garden.pots, contains('..#.#..#...#.#...#..#..##..##'));

      garden.advanceGeneration();

      expect(garden.generation, 5);
      expect(garden.pots, contains('...#...##...#.#..#..#...#...#'));

      garden.advanceGeneration();

      expect(garden.generation, 6);
      expect(garden.pots, contains('...##.#.#....#...#..##..##..##'));

      garden.advanceGeneration();

      expect(garden.generation, 7);
      expect(garden.pots, contains('..#..###.#...##..#...#...#...#'));

      garden.advanceGeneration();

      expect(garden.generation, 8);
      expect(garden.pots, contains('..#....##.#.#.#..##..##..##..##'));

      garden.advanceGeneration();

      expect(garden.generation, 9);
      expect(garden.pots, contains('..##..#..#####....#...#...#...#'));

      garden.advanceGeneration();

      expect(garden.generation, 10);
      expect(garden.pots, contains('.#.#..#...#.##....##..##..##..##'));

      garden.advanceGeneration();

      expect(garden.generation, 11);
      expect(garden.pots, contains('..#...##...#.#...#.#...#...#...#'));

      garden.advanceGeneration();

      expect(garden.generation, 12);
      expect(garden.pots, contains('..##.#.#....#.#...#.#..##..##..##'));

      garden.advanceGeneration();

      expect(garden.generation, 13);
      expect(garden.pots, contains('.#..###.#....#.#...#....#...#...#'));

      garden.advanceGeneration();

      expect(garden.generation, 14);
      expect(garden.pots, contains('.#....##.#....#.#..##...##..##..##'));

      garden.advanceGeneration();

      expect(garden.generation, 15);
      expect(garden.pots, contains('##..#..#.#....#....#..#.#...#...#'));

      garden.advanceGeneration();

      expect(garden.generation, 16);
      expect(
          garden.pots, contains('#.#..#...#.#...##...#...#.#..##..##'));

      garden.advanceGeneration();

      expect(garden.generation, 17);
      expect(garden.pots, contains('#...##...#.#.#.#...##...#....#...#'));

      garden.advanceGeneration();

      expect(garden.generation, 18);
      expect(
          garden.pots, contains('##.#.#....#####.#.#.#...##...##..##'));

      garden.advanceGeneration();

      expect(garden.generation, 19);
      expect(
          garden.pots, contains('#..###.#..#.#.#######.#.#.#..#.#...#'));

      garden.advanceGeneration();

      expect(garden.generation, 20);
      expect(
          garden.pots, contains('#....##....#####...#######....#.#..##'));
    });
  });
}
