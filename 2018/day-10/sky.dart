import 'dart:io';
import 'dart:math';

import 'point.dart';

class Sky {
  List<Point> _points;
  List<List<String>> _grid;
  _BoundingBox _boundingBox;

  Sky(String inputFilePath) {
    final inputs = new File(inputFilePath).readAsStringSync().split('\n');
    _points = inputs.map((input) => Point(input)).toList();
    _boundingBox = _BoundingBox(_points);
  }

  void _setGrid() {
    final rowCount = _boundingBox.largestY - _boundingBox.smallestY + 1;
    final columnCount = _boundingBox.largestX - _boundingBox.smallestX + 1;

    _grid = List<List<String>>.generate(
        rowCount, (_) => List<String>.generate(columnCount, (_) => ' '));
    for (final point in _points) {
      _grid[point.y - _boundingBox.smallestY]
          [point.x - _boundingBox.smallestX] = '#';
    }
  }

  void advancePlanes(int amount) {
    for (final point in _points) {
      point.advancePlane(amount);
    }
    _boundingBox = _BoundingBox(_points);
  }

  int get boundingBoxSize => _boundingBox.size;

  @override
  String toString() {
    _setGrid();
    return _grid.map((row) => row.join('')).join('\n');
  }
}

class _BoundingBox {
  int smallestX;
  int smallestY;
  int largestX = 0;
  int largestY = 0;

  _BoundingBox(List<Point> points) {
    for (final point in points) {
      smallestX = min(point.x, smallestX ?? point.x);
      smallestY = min(point.y, smallestY ?? point.y);
      largestX = max(point.x, largestX);
      largestY = max(point.y, largestY);
    }
  }

  int get size => (largestX - smallestX) * (largestY - smallestY);

  @override
  String toString() {
    return '$smallestX, $smallestY to $largestX, $largestY';
  }
}
