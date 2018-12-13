import 'package:meta/meta.dart';

class Note {
  String _potOrientation;
  String _currentPot;
  String _newPot;

  Note(String note) {
    final input = note.split(' => ');
    _potOrientation = input.first;
    _currentPot = _potOrientation[2];
    _newPot = input.last;
  }

  bool matches(String pots, int currentPotIndex) {
    if (pots[currentPotIndex] != _currentPot) return false;
    final potOrientation =
        pots.substring(currentPotIndex - 2, currentPotIndex + 3);
    return potOrientation == _potOrientation;
  }

  @visibleForTesting
  String get potOrientation => _potOrientation;

  @visibleForTesting
  String get currentPot => _currentPot;

  String get newPot => _newPot;
}
