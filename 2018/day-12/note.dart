class Note {
  bool leftMostPot;
  bool leftPot;
  bool currentPot;
  bool rightPot;
  bool rightMostPot;
  bool willCurrentPotHavePlantNextGeneration;
  List<bool> _note;

  Note(String input) {
    _note = input
        .replaceAll(' => ', '')
        .split('')
        .map((str) => str == '#')
        .toList();
    leftMostPot = _note[0];
    leftPot = _note[1];
    currentPot = _note[2];
    rightPot = _note[3];
    rightMostPot = _note[4];
    willCurrentPotHavePlantNextGeneration = _note[5];
  }

  bool matchesNote(List<bool> pots, int currentPotIndex) {
    if (pots[currentPotIndex] != currentPot) return false;

    // Check left pots.
    if (pots[currentPotIndex - 1] != leftPot ||
        pots[currentPotIndex - 2] != leftMostPot) return false;

    // Check right pots.
    if (pots[currentPotIndex + 1] != rightPot ||
        pots[currentPotIndex + 2] != rightMostPot) return false;

    return true;
  }

  @override
  String toString() =>
      _note.map((boolean) => boolean ? '#' : '.').join() +
      ' => ' +
      (willCurrentPotHavePlantNextGeneration ? '#' : '.');
}
