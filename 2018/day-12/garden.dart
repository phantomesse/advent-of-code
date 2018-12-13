import 'dart:io';

import 'package:meta/meta.dart';

import 'note.dart';

class Garden {
  int generation;
  String pots;
  List<Note> _notes;
  int zeroIndex;

  Garden(String inputFilePath) {
    final input = new File(inputFilePath).readAsStringSync().split('\n');
    generation = 0;
    zeroIndex = 0;
    pots = input.first.split(': ').last;
    _notes = input.skip(2).map((note) => Note(note)).toList();
  }

  void advanceGeneration() {
    generation++;
    _addAndRemovePots();

    var newPots = pots;
    for (var i = 2; i < pots.length - 2; i++) {
      final note = _notes.singleWhere((note) => note.matches(pots, i),
          orElse: () => null);
      final newPot = note?.newPot ?? '.';
      newPots = newPots.replaceRange(i, i + 1, newPot);
    }
    pots = newPots;
  }

  int get potSum {
    var sum = 0;
    for (var i = 0; i < pots.length; i++) {
      if (pots[i] != '#') continue;
      sum += i + zeroIndex;
    }
    return sum;
  }

  void _addAndRemovePots() {
    // Trim pots so that only 5 empty pots exist on either side.
    while (pots.startsWith('......')) {
      pots = pots.substring(1);
      zeroIndex++;
    }
    while (pots.endsWith('......')) {
      pots = pots.substring(0, pots.length - 1);
    }

    // Add pots so that 5 empty pots exist on either side.
    while (!pots.startsWith('.....#')) {
      pots = '.${pots}';
      zeroIndex--;
    }
    while (!pots.endsWith('#.....')) {
      pots = '${pots}.';
    }
  }

  @visibleForTesting
  List<Note> get notes => _notes;
}
