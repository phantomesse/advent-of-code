import 'package:test/test.dart';

import 'solution.dart';

void main() {
  group('Part 1', () {
    test('In aA, a and A react, leaving nothing behind.', () {
      expect(reducePolymer('aA'), '');
    });

    test(
        'In abBA, bB destroys itself, leaving aA. As above, this then destroys '
        'itself, leaving nothing.', () {
      expect(reducePolymer('abBA'), '');
    });

    test(
        'In abAB, no two adjacent units are of the same type, and so nothing '
        'happens.', () {
      expect(reducePolymer('abAB'), 'abAB');
    });

    test(
        'In aabAAB, even though aa and AA are of the same type, their '
        'polarities match, and so nothing happens.', () {
      expect(reducePolymer('aabAAB'), 'aabAAB');
    });

    test('dabAcCaCBAcCcaDA results in dabCBAcaDA', () {
      expect(reducePolymer('dabAcCaCBAcCcaDA'), 'dabCBAcaDA');
    });
  });

  group('Part 2', () {
    test(
        'Removing all A/a units produces dbcCCBcCcD. Fully reacting this '
        'polymer produces dbCBcD, which has length 6.', () {
      final removedTypePolymer = removeType('dabAcCaCBAcCcaDA', 'a');
      expect(removedTypePolymer, 'dbcCCBcCcD');
      final reducedPolymer = reducePolymer(removedTypePolymer);
      expect(reducedPolymer, 'dbCBcD');
      expect(reducedPolymer.length, 6);
    });

    test(
        'Removing all B/b units produces daAcCaCAcCcaDA. Fully reacting this '
        'polymer produces daCAcaDA, which has length 8.', () {
      final removedTypePolymer = removeType('dabAcCaCBAcCcaDA', 'b');
      expect(removedTypePolymer, 'daAcCaCAcCcaDA');
      final reducedPolymer = reducePolymer(removedTypePolymer);
      expect(reducedPolymer, 'daCAcaDA');
      expect(reducedPolymer.length, 8);
    });

    test(
        'Removing all C/c units produces dabAaBAaDA. Fully reacting this '
        'polymer produces daDA, which has length 4.', () {
      final removedTypePolymer = removeType('dabAcCaCBAcCcaDA', 'c');
      expect(removedTypePolymer, 'dabAaBAaDA');
      final reducedPolymer = reducePolymer(removedTypePolymer);
      expect(reducedPolymer, 'daDA');
      expect(reducedPolymer.length, 4);
    });

    test(
        'Removing all D/d units produces abAcCaCBAcCcaA. Fully reacting this '
        'polymer produces abCBAc, which has length 6.', () {
      final removedTypePolymer = removeType('dabAcCaCBAcCcaDA', 'd');
      expect(removedTypePolymer, 'abAcCaCBAcCcaA');
      final reducedPolymer = reducePolymer(removedTypePolymer);
      expect(reducedPolymer, 'abCBAc');
      expect(reducedPolymer.length, 6);
    });

    test('improve polymer', () {
      expect(improvePolymer('dabAcCaCBAcCcaDA'), 'daDA');
    });
  });
}
