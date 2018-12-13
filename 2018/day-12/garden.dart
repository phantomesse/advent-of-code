import 'dart:io';

import 'note.dart';

class Garden {
  int generation = 0;
  var pots = <bool>[];
  final notes = <Note>[];
  List<Note> _emptyPotNotes;
  List<Note> _fullPotNotes;
  var zeroIndex = 0;

  Garden(String inputFilePath) {
    var inputs = new File(inputFilePath).readAsStringSync().split('\n');

    pots.addAll(
        inputs.first.split(': ').last.split('').map((input) => input == '#'));
    notes.addAll(inputs.skip(2).map((input) => Note(input)));
    _emptyPotNotes = notes.where((note) => !note.currentPot).toList();
    _fullPotNotes = notes.where((note) => note.currentPot).toList();
  }

  void advanceGeneration() {
    // Add some empty pots to the left and right to make sure that either side
    // has 5 empty pots.
    while (!pots.sublist(0, 6).contains(true)) {
      pots.removeAt(0);
      zeroIndex++;
    }
    while (pots.sublist(0, 5).contains(true)) {
      pots.insert(0, false);
      zeroIndex--;
    }
    while (pots.sublist(pots.length - 5).contains(true)) {
      pots.add(false);
    }

    final newPots = List<bool>.from(pots);

    for (int i = 2; i < pots.length - 2; i++) {
      final pot = pots[i];

      // Match pot to a note.
      Note note;
      if (pot) {
        // Look in full pot notes.
        note = _fullPotNotes.singleWhere((note) => note.matchesNote(pots, i),
            orElse: () => null);
      } else {
        // Look in empty pot notes.
        note = _emptyPotNotes.singleWhere((note) => note.matchesNote(pots, i),
            orElse: () => null);
      }
      if (note == null) {
        // Does not produce a plant.
        newPots[i] = false;
      } else {
        // Transform the pot.
        newPots[i] = note.willCurrentPotHavePlantNextGeneration;
      }
    }

    generation++;
    pots = newPots;
  }

  int get potsWithPlantsCount {
    int potsWithPlantsCount = 0;

    for (var i = 0; i < pots.length; i++) {
      if (!pots[i]) continue;
      potsWithPlantsCount += i + zeroIndex;
    }

    return potsWithPlantsCount;
  }

  int get withoutZero {
    int potsWithPlantsCount = 0;

    for (var i = 0; i < pots.length; i++) {
      if (!pots[i]) continue;
      potsWithPlantsCount += i;
    }

    return potsWithPlantsCount;
  }

  static String _potsToString(List<bool> pots) =>
      pots.map((boolean) => boolean ? '#' : '.').join();

  @override
  String toString() => '$generation: ${_potsToString(pots)}';
}
