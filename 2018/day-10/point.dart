class Point {
  _Position _position;
  _Velocity _velocity;

  Point(String input) {
    final positionPair = _getPair(input);
    _position = _Position(positionPair.first, positionPair.last);

    final velocityPair = _getPair(input, input.indexOf('velocity'));
    _velocity = _Velocity(velocityPair.first, velocityPair.last);
  }

  static List<int> _getPair(String input, [int startIndex = 0]) {
    final openBracketIndex = input.indexOf('<', startIndex);
    final closedBracketIndex = input.indexOf('>', startIndex);
    return input
        .substring(openBracketIndex + 1, closedBracketIndex)
        .split(', ')
        .map(int.parse)
        .toList();
  }

  int get x => _position.x;

  int get y => _position.y;

  void advancePlane(int amount) {
    _position = new _Position(
        _position.x + amount * _velocity.offsetX, _position.y + amount * _velocity.offsetY);
  }
}

class _Position {
  final int x, y;

  _Position(this.x, this.y);
}

class _Velocity {
  final int offsetX, offsetY;

  _Velocity(this.offsetX, this.offsetY);
}
