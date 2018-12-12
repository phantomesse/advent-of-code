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
      expect(garden.toString(), '0: #..#.#..##......###...###');
      garden.advanceGeneration();
      expect(garden.toString(), '1: ...#...#....#.....#..#..#..#...........');
      garden.advanceGeneration();
      expect(garden.toString(), '2: ...##..##...##....#..#..#..##..........');
      garden.advanceGeneration();
      expect(garden.toString(), '3: ..#.#...#..#.#....#..#..#...#..........');
      garden.advanceGeneration();
      expect(garden.toString(), '4: ...#.#..#...#.#...#..#..##..##.........');
      garden.advanceGeneration();
      expect(garden.toString(), '5: ....#...##...#.#..#..#...#...#.........');
      garden.advanceGeneration();
      expect(garden.toString(), '6: ....##.#.#....#...#..##..##..##........');
      garden.advanceGeneration();
      expect(garden.toString(), '7: ...#..###.#...##..#...#...#...#........');
      garden.advanceGeneration();
      expect(garden.toString(), '8: ...#....##.#.#.#..##..##..##..##.......');
      garden.advanceGeneration();
      expect(garden.toString(), '9: ...##..#..#####....#...#...#...#.......');
      garden.advanceGeneration();
      expect(garden.toString(), '10: ..#.#..#...#.##....##..##..##..##......');
      garden.advanceGeneration();
      expect(garden.toString(), '11: ...#...##...#.#...#.#...#...#...#......');
      garden.advanceGeneration();
      expect(garden.toString(), '12: ...##.#.#....#.#...#.#..##..##..##.....');
      garden.advanceGeneration();
      expect(garden.toString(), '13: ..#..###.#....#.#...#....#...#...#.....');
      garden.advanceGeneration();
      expect(garden.toString(), '14: ..#....##.#....#.#..##...##..##..##....');
      garden.advanceGeneration();
      expect(garden.toString(), '15: ..##..#..#.#....#....#..#.#...#...#....');
      garden.advanceGeneration();
      expect(garden.toString(), '16: .#.#..#...#.#...##...#...#.#..##..##...');
      garden.advanceGeneration();
      expect(garden.toString(), '17: ..#...##...#.#.#.#...##...#....#...#...');
      garden.advanceGeneration();
      expect(garden.toString(), '18: ..##.#.#....#####.#.#.#...##...##..##..');
      garden.advanceGeneration();
      expect(garden.toString(), '19: .#..###.#..#.#.#######.#.#.#..#.#...#..');
      garden.advanceGeneration();
      expect(garden.toString(), '20: .#....##....#####...#######....#.#..##.');
    });
  });
}
