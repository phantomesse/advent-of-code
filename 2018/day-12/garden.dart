import 'dart:io';

import 'note.dart';

class Garden {
  int generation = 0;
  final pots = <bool>[];
  final notes = <Note>[];
  List<Note> _emptyPotNotes;
  List<Note> _fullPotNotes;

  Garden(String inputFilePath) {
    var inputs = new File(inputFilePath).readAsStringSync().split('\n');

    pots.addAll(
        inputs.first.split(': ').last.split('').map((input) => input == '#'));
    notes.addAll(inputs.skip(2).map((input) => Note(input)));
    _emptyPotNotes = notes.where((note) => !note.currentPot).toList();
    _fullPotNotes = notes.where((note) => note.currentPot).toList();
  }

  void advanceGeneration() {
    // Add some empty pots to the left and right.
    pots.insertAll(0, [false, false]);
    pots.addAll([false, false]);

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
      print(note);
      if (note == null) continue;

      // Transform the pot.
      pots[i] == note.willCurrentPotHavePlantNextGeneration;
    }

    generation++;
  }

  @override
  String toString() {
    return '$generation: ${pots.map((boolean) => boolean ? '#' : '.').join()}';
  }
}
