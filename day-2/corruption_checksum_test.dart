import 'dart:async';
import 'package:test/test.dart';

import 'corruption_checksum.dart';

Future main() async {
  group('$CorruptionChecksum part 1', () {
    test('Parse input into $Spreadsheet', () {
      expect(
          CorruptionChecksum.getSpreadsheet('5 1 9 5\n7 5 3\n2 4 6 8'),
          new Spreadsheet([
            new Row([5, 1, 9, 5]),
            new Row([7, 5, 3]),
            new Row([2, 4, 6, 8])
          ]));
    });

    test(
        'The first row\'s largest and smallest values are 9 and 1, and their '
        'difference is 8', () {
      expect(new Row([5, 1, 9, 5]).checksum, 8);
    });

    test(
        'The second row\'s largest and smallest values are 7 and 3, and their '
        'difference is 4', () {
      expect(new Row([7, 5, 3]).checksum, 4);
    });

    test('The third row\'s difference is 6', () {
      expect(new Row([2, 4, 6, 8]).checksum, 6);
    });

    test('The spreadsheet\'s checksum would be 8 + 4 + 6 = 18', () {
      expect(
          new Spreadsheet([
            new Row([5, 1, 9, 5]),
            new Row([7, 5, 3]),
            new Row([2, 4, 6, 8])
          ]).checksum,
          18);
    });
  });
}
