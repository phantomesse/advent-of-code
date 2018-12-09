import 'dart:io';
import 'dart:math';

class Grid {
  List<Coordinate> _coordinates;
  List<List<String>> _grid;

  Grid(String inputFilePath) {
    final input = new File(inputFilePath).readAsStringSync().split('\n');
    int index = 0;
    _coordinates =
        input.map((str) => Coordinate((index++).toString(), str)).toList();

    // Get width and height of the grid.
    var width = 0;
    var height = 0;
    for (final coordinate in _coordinates) {
      width = max(width, coordinate.x);
      height = max(width, coordinate.y);
    }
    width += 2;
    height += 2;

    // Create grid.
    _grid = List.generate(height, (_) => List.generate(width, (_) => '.'));
    for (final coordinate in _coordinates) {
      _grid[coordinate.y][coordinate.x] = coordinate.name;
    }
  }

  int getRegionSize(int maxTotalDistance) {
    int regionSize = 0;

    for (var y = 0; y < _grid.length; y++) {
      for (var x = 0; x < _grid[y].length; x++) {
        final totalDistanceToAllCoordinates = getDistanceToAllCoordinates(x, y);
        if (totalDistanceToAllCoordinates >= maxTotalDistance) continue;
        regionSize++;
      }
    }

    return regionSize;
  }

  int getDistanceToAllCoordinates(int x, int y) {
    var totalDistance = 0;
    for (final coordinate in _coordinates) {
      final distance = _getDistanceToCoordinate(x, y, coordinate);
      totalDistance += distance;
    }
    return totalDistance;
  }

  int get largestFiniteArea {
    var largestArea = 0;

    for (final coordinate in _coordinates) {
      if (_hasInfiniteArea(coordinate)) continue;
      final area = _getFiniteArea(coordinate);
      largestArea = max(largestArea, area);
    }

    return largestArea;
  }

  int _getFiniteArea(Coordinate coordinate) {
    int area = 0;
    for (var y = 0; y < _grid.length; y++) {
      for (var x = 0; x < _grid[y].length; x++) {
        final closestCoordinates = _getClosestCoordinates(x, y);
        if (closestCoordinates.length != 1) continue;
        if (closestCoordinates.single == coordinate) area++;
      }
    }

    return area;
  }

  List<Coordinate> _getClosestCoordinates(int x, int y) {
    final coordinateToDistanceMap = <Coordinate, int>{};
    int closestDistance = null;

    for (final coordinate in _coordinates) {
      final distance = _getDistanceToCoordinate(x, y, coordinate);
      if (closestDistance != null && distance > closestDistance) continue;
      coordinateToDistanceMap[coordinate] = distance;
      closestDistance = distance;
      coordinateToDistanceMap
          .removeWhere((_, distance) => distance > closestDistance);
    }

    if (coordinateToDistanceMap.length > 1) return [];
    return coordinateToDistanceMap.keys.toList();
  }

  bool _hasInfiniteArea(Coordinate coordinate) {
    // Check first and last rows.
    for (var x = 0; x < _grid[0].length; x++) {
      if (_getClosestCoordinates(x, 0).contains(coordinate) ||
          _getClosestCoordinates(x, _grid.length - 1).contains(coordinate)) {
        return true;
      }
    }

    // Check first and last columns.
    for (var y = 0; y < _grid.length; y++) {
      if (_getClosestCoordinates(0, y).contains(coordinate) ||
          _getClosestCoordinates(_grid.length - 1, y).contains(coordinate)) {
        return true;
      }
    }

    return false;
  }

  static int _getDistanceToCoordinate(int x, int y, Coordinate coordinate) {
    return (coordinate.x - x).abs() + (coordinate.y - y).abs();
  }

  @override
  String toString() {
    String str = '';
    for (final row in _grid) {
      for (final entry in row) {
        str += '$entry ';
      }
      str += '\n';
    }
    return str;
  }
}

class Coordinate {
  final String name;
  int _x, _y;

  Coordinate(this.name, String str) {
    final nums = str.split(', ').map(int.parse);
    _x = nums.first;
    _y = nums.last;
  }

  int get x => _x;

  int get y => _y;

  @override
  String toString() => '$name ($x, $y)';
}
