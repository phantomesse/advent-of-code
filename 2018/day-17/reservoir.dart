import 'dart:io';
import 'dart:math';
import 'vein.dart';
import 'pair.dart';

class Reservoir {
  final _spring = Pair(500, 0);
  Pair _topLeftPair;
  List<List<Type>> _map;

  Reservoir(String inputFilePath) {
    final veins =
        File(inputFilePath).readAsLinesSync().map((input) => Vein(input));

    _topLeftPair = veins.map((vein) => vein.start).reduce((pair1, pair2) {
      final x = min(pair1.x, pair2.x);
      final y = min(pair1.y, pair2.y);
      return Pair(x, y);
    });
    _topLeftPair = Pair(_topLeftPair.x - 1, _topLeftPair.y - 1);

    final bottomRightPair =
        veins.map((vein) => vein.end).reduce((pair1, pair2) {
      final x = max(pair1.x, pair2.x);
      final y = max(pair1.y, pair2.y);
      return Pair(x, y);
    });
    final mapWidth = bottomRightPair.x - _topLeftPair.x + 2;
    final mapHeight = bottomRightPair.y - _topLeftPair.y + 1;
    assert(mapWidth > 0 && mapHeight > 0);

    _map = List.generate(
        mapHeight,
        (y) => List.generate(mapWidth, (x) {
              return x == _spring.x - _topLeftPair.x &&
                      y == _spring.y - _topLeftPair.y
                  ? Type.spring
                  : Type.sand;
            }));
    for (final vein in veins) {
      for (var x = vein.start.x - _topLeftPair.x;
          x <= vein.end.x - _topLeftPair.x;
          x++) {
        for (var y = vein.start.y - _topLeftPair.y;
            y <= vein.end.y - _topLeftPair.y;
            y++) {
          _map[y][x] = Type.clay;
        }
      }
    }
  }

  int get waterCount {
    // Fill with water.
    return _getWaterCount(_spring);
  }

  int _getWaterCount(Pair water) {
    // Check if water is in the correct spot.
    final x = water.x - _topLeftPair.x;
    final y = water.y - _topLeftPair.y;
    if (x < 0 || y < 0 || y >= _map.length || x >= _map[y].length) return 0;
    if (_map[y][x] != Type.sand) return 0;

    print(this);

    // Try going down.
    final downCount = _getWaterCount(Pair(x, y + 1));
    if (downCount > 0) return downCount;

    // Try going left and right.
    return _getWaterCount(Pair(x - 1, y)) + _getWaterCount(Pair(x + 1, y));
  }

  @override
  String toString() =>
      _map.map((row) => row.map(_renderType).join()).join('\n');

  static String _renderType(Type type) {
    switch (type) {
      case Type.clay:
        return '#';
      case Type.sand:
        return '.';
      case Type.water:
        return '|';
      case Type.spring:
        return '+';
    }
    throw 'Unsupported type: $type';
  }
}

enum Type { clay, sand, water, spring }
