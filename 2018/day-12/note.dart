class Note {
  bool leftMostPot;
  bool leftPot;
  bool currentPot;
  bool rightPot;
  bool rightMostPot;
  bool willCurrentPotHavePlantNextGeneration;

  Note(String input) {
    final havePlants = input
        .replaceAll(' => ', '')
        .split('')
        .map((str) => str == '#')
        .toList();
    leftMostPot = havePlants[0];
    leftPot = havePlants[1];
    currentPot = havePlants[2];
    rightPot = havePlants[3];
    rightMostPot = havePlants[4];
    willCurrentPotHavePlantNextGeneration = havePlants[5];
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
  String toString() {
    // TODO
  }
}
