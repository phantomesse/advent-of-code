import 'dart:io';
import 'dart:math';

class Forest {
  List<List<Acre>> _acres;

  Forest(String inputFileName) {
    _acres = new File(inputFileName)
        .readAsStringSync()
        .split('\n')
        .map((inputRow) => inputRow.split('').map(_convertToAcre).toList())
        .toList();
  }

  void incrementMinute() {
    final newAcres = List.generate(_acres.length,
        (y) => List.generate(_acres[y].length, (x) => _acres[y][x]));

    for (var y = 0; y < _acres.length; y++) {
      for (var x = 0; x < _acres[y].length; x++) {
        newAcres[y][x] = _getNewAcre(x, y);
      }
    }

    _acres = newAcres;
  }

  int get woodedAcres => _acres
      .map((acreRow) => acreRow.where((acre) => acre == Acre.trees).length)
      .reduce((a, b) => a + b);

  int get lumberyards => _acres
      .map((acreRow) => acreRow.where((acre) => acre == Acre.lumberyard).length)
      .reduce((a, b) => a + b);

  int get resourceValue => woodedAcres * lumberyards;

  Acre _getNewAcre(int x, int y) {
    final currentAcre = _acres[y][x];
    final adjacentAcres = _getAdjacentAcres(x, y);

    switch (currentAcre) {
      case Acre.openGround:
        // An open acre will become filled with trees if three or more adjacent acres contained trees. Otherwise, nothing happens.
        final adjacentTreeCount =
            adjacentAcres.where((acre) => acre == Acre.trees).length;
        if (adjacentTreeCount >= 3) return Acre.trees;
        break;

      case Acre.trees:
        // An acre filled with trees will become a lumberyard if three or more adjacent acres were lumberyards. Otherwise, nothing happens.
        final adjacentLumberyardCount =
            adjacentAcres.where((acre) => acre == Acre.lumberyard).length;
        if (adjacentLumberyardCount >= 3) return Acre.lumberyard;
        break;

      case Acre.lumberyard:
        // An acre containing a lumberyard will remain a lumberyard if it was adjacent to at least one other lumberyard and at least one acre containing trees. Otherwise, it becomes open.
        if (adjacentAcres.contains(Acre.lumberyard) &&
            adjacentAcres.contains(Acre.trees)) {
          return Acre.lumberyard;
        }
        return Acre.openGround;
    }

    return currentAcre;
  }

  List<Acre> _getAdjacentAcres(int x, int y) {
    final adjacentAcres = <Acre>[];

    for (var i = max(y - 1, 0); i < min(y + 2, _acres.length); i++) {
      for (var j = max(x - 1, 0); j < min(x + 2, _acres[i].length); j++) {
        if (i == y && j == x) continue;
        adjacentAcres.add(_acres[i][j]);
      }
    }

    return adjacentAcres;
  }

  static Acre _convertToAcre(String symbol) {
    if (symbol == '.') return Acre.openGround;
    if (symbol == '|') return Acre.trees;
    if (symbol == '#') return Acre.lumberyard;
    throw 'Unknown symbol: $symbol';
  }

  static String _toString(Acre acre) {
    switch (acre) {
      case Acre.openGround:
        return '.';
      case Acre.trees:
        return '|';
      case Acre.lumberyard:
        return '#';
    }
    throw 'Unknown acre: $acre';
  }

  @override
  String toString() =>
      _acres.map((acreRow) => acreRow.map(_toString).join()).join('\n');
}

enum Acre { openGround, trees, lumberyard }
