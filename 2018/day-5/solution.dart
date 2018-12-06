import 'dart:io';

const _placeHolder = '.';

String reducePolymer(String polymer) {
  for (var i = 0; i < polymer.length - 1; i++) {
    final unit = polymer[i];
    final followingUnit = polymer[i + 1];
    if (unit != followingUnit &&
        unit.toLowerCase() == followingUnit.toLowerCase()) {
      polymer = polymer.replaceRange(i, i + 2, '$_placeHolder$_placeHolder');
    }
  }
  final reduced = polymer.contains(_placeHolder);
  polymer = polymer.replaceAll(_placeHolder, '');
  if (reduced) polymer = reducePolymer(polymer);

  return polymer;
}

String removeType(String polymer, String type) {
  return polymer
      .replaceAll(type.toLowerCase(), '')
      .replaceAll(type.toUpperCase(), '');
}

String improvePolymer(String polymer) {
  // Get all the types in the polymer.
  final types = polymer.split('').map((letter) => letter.toLowerCase()).toSet();
  print(types);

  final improvedPolymers =
      types.map((type) {
        print('removing $type');
        final removedTypePolymer = removeType(polymer, type);
        print(removedTypePolymer);
        return reducePolymer(removedTypePolymer);
      });

  var improvedPolymer = improvedPolymers.first;
  for (final polymer in improvedPolymers) {
    if (polymer.length < improvedPolymer.length) improvedPolymer = polymer;
  }

  return improvedPolymer;
}

void main() {
  final input = new File('input.txt').readAsStringSync();
  print('Part 1: ${reducePolymer(input).length}');
  print('Part 2: ${improvePolymer(input).length}');
}
