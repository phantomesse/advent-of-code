class FuelCell {
  final int x, y;
  final int gridSerialNumber;
  final squareSizeToTotalPowerLevelMap = <int, int>{};

  FuelCell(this.x, this.y, this.gridSerialNumber);

  int get rackId => x + 10;

  int _powerLevel = null;
  int get powerLevel {
    if (_powerLevel != null) return _powerLevel;
    var powerLevel = (rackId * y + gridSerialNumber) * rackId;
    if (powerLevel < 100) {
      powerLevel = 0;
    }
    else {
      powerLevel = (powerLevel % 1000) ~/ 100;
    }

    _powerLevel = powerLevel - 5;
    return _powerLevel;
  }

  @override
  String toString() => '$x,$y';
}
