import 'package:test/test.dart';

import 'garden.dart';
import 'note.dart';

void main() {
  group('', () {
    Garden garden;

    setUp(() {
      garden = Garden('test-input.txt');
    });

    test('Initial state', () {
      expect(garden.pots, [
        true,
        false,
        false,
        true,
        false,
        true,
        false,
        false,
        true,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        true,
        true,
        true,
        false,
        false,
        false,
        true,
        true,
        true
      ]);
    });

    test('Note count', () {
      expect(garden.notes, hasLength(14));
    });

    test('Note parsing', () {
      var note = Note('...## => #');
      expect(note.leftMostPot, false);
      expect(note.leftPot, false);
      expect(note.currentPot, false);
      expect(note.rightPot, true);
      expect(note.rightMostPot, true);
      expect(note.willCurrentPotHavePlantNextGeneration, true);

      note = garden.notes.first;
      expect(note.leftMostPot, false);
      expect(note.leftPot, false);
      expect(note.currentPot, false);
      expect(note.rightPot, true);
      expect(note.rightMostPot, true);
      expect(note.willCurrentPotHavePlantNextGeneration, true);
    });

    test('Generations', () {
      expect(garden.generation, 0);
      expect(garden.toString(), contains('#..#.#..##......###...###'));

      garden.advanceGeneration();

      expect(garden.generation, 1);
      expect(garden.toString(), contains('#...#....#.....#..#..#..#'));

      garden.advanceGeneration();

      expect(garden.generation, 2);
      expect(garden.toString(), contains('..##..##...##....#..#..#..##'));

      garden.advanceGeneration();

      expect(garden.generation, 3);
      expect(garden.toString(), contains('.#.#...#..#.#....#..#..#...#'));

      garden.advanceGeneration();

      expect(garden.generation, 4);
      expect(garden.toString(), contains('..#.#..#...#.#...#..#..##..##'));

      garden.advanceGeneration();

      expect(garden.generation, 5);
      expect(garden.toString(), contains('...#...##...#.#..#..#...#...#'));

      garden.advanceGeneration();

      expect(garden.generation, 6);
      expect(garden.toString(), contains('...##.#.#....#...#..##..##..##'));

      garden.advanceGeneration();

      expect(garden.generation, 7);
      expect(garden.toString(), contains('..#..###.#...##..#...#...#...#'));

      garden.advanceGeneration();

      expect(garden.generation, 8);
      expect(garden.toString(), contains('..#....##.#.#.#..##..##..##..##'));

      garden.advanceGeneration();

      expect(garden.generation, 9);
      expect(garden.toString(), contains('..##..#..#####....#...#...#...#'));

      garden.advanceGeneration();

      expect(garden.generation, 10);
      expect(garden.toString(), contains('.#.#..#...#.##....##..##..##..##'));

      garden.advanceGeneration();

      expect(garden.generation, 11);
      expect(garden.toString(), contains('..#...##...#.#...#.#...#...#...#'));

      garden.advanceGeneration();

      expect(garden.generation, 12);
      expect(garden.toString(), contains('..##.#.#....#.#...#.#..##..##..##'));

      garden.advanceGeneration();

      expect(garden.generation, 13);
      expect(garden.toString(), contains('.#..###.#....#.#...#....#...#...#'));

      garden.advanceGeneration();

      expect(garden.generation, 14);
      expect(garden.toString(), contains('.#....##.#....#.#..##...##..##..##'));

      garden.advanceGeneration();

      expect(garden.generation, 15);
      expect(garden.toString(), contains('##..#..#.#....#....#..#.#...#...#'));

      garden.advanceGeneration();

      expect(garden.generation, 16);
      expect(
          garden.toString(), contains('#.#..#...#.#...##...#...#.#..##..##'));

      garden.advanceGeneration();

      expect(garden.generation, 17);
      expect(garden.toString(), contains('#...##...#.#.#.#...##...#....#...#'));

      garden.advanceGeneration();

      expect(garden.generation, 18);
      expect(
          garden.toString(), contains('##.#.#....#####.#.#.#...##...##..##'));

      garden.advanceGeneration();

      expect(garden.generation, 19);
      expect(
          garden.toString(), contains('#..###.#..#.#.#######.#.#.#..#.#...#'));

      garden.advanceGeneration();

      expect(garden.generation, 20);
      expect(
          garden.toString(), contains('#....##....#####...#######....#.#..##'));

      expect(garden.potsWithPlantsCount, 325);
    });

    test('after 20 generations', () {
      for (var i = 0; i < 20; i++) {
        garden.advanceGeneration();
        print(garden);
      }
      expect(garden.potsWithPlantsCount, 325);
    });
  });
}
