import 'fuel_cell.dart';

class Grid {
  final List<List<FuelCell>> fuelCells;

  Grid(int serialNumber) : fuelCells = _createFuelCells(serialNumber);

  FuelCell get mostPowerful3x3SquareTopLeftFuelCell {
    int greatestTotalPowerLevel = 0;
    FuelCell mostPowerfulSquareTopLeftFuelCell = null;

    for (int y = 0; y < fuelCells.length - 3; y++) {
      for (int x = 0; x < fuelCells.length - 3; x++) {
        final fuelCell = fuelCells[y][x];
        final powerLevel = get3x3SquarePowerLevel(fuelCell);
        if (mostPowerfulSquareTopLeftFuelCell == null ||
            powerLevel > greatestTotalPowerLevel) {
          greatestTotalPowerLevel = powerLevel;
          mostPowerfulSquareTopLeftFuelCell = fuelCell;
        }
      }
    }

    return mostPowerfulSquareTopLeftFuelCell;
  }

  FuelCellAndSquareSize get mostPowerfulNxNSquare {
    FuelCellAndSquareSize greatestCombo = null;

    for (int squareSize = 1; squareSize <= fuelCells.length; squareSize++) {
      for (int y = 0; y < fuelCells.length - squareSize; y++) {
        for (int x = 0; x < fuelCells[y].length - squareSize; x++) {
          final fuelCell = fuelCells[y][x];
          final totalPowerLevel = getNxNSquarePowerLevel(fuelCell, squareSize);
          if (greatestCombo == null ||
              totalPowerLevel > greatestCombo.totalPowerLevel) {
            greatestCombo =
                FuelCellAndSquareSize(fuelCell, squareSize, totalPowerLevel);
          }
        }
      }
    }

    return greatestCombo;
  }

  // Returns the power level of a 3x3 square
  int get3x3SquarePowerLevel(FuelCell topLeftFuelCell) =>
      getNxNSquarePowerLevel(topLeftFuelCell, 3);

  int getNxNSquarePowerLevel(FuelCell topLeftFuelCell, int n) {
    var totalPowerLevel = 0;

//    if (topLeftFuelCell.squareSizeToTotalPowerLevelMap.containsKey(n - 1)) {
//      totalPowerLevel = topLeftFuelCell.squareSizeToTotalPowerLevelMap[n - 1];
//      print('here! $n $totalPowerLevel');
//
//      // Add right column.
//      for (var y = 0; y < n; y++) {
//        totalPowerLevel += fuelCells[topLeftFuelCell.y + y]
//                [topLeftFuelCell.x + n - 1]
//            .powerLevel;
//      }
//
//      // Add bottom row.
//      for (var x = 0; x < n; x++) {
//        totalPowerLevel += fuelCells[topLeftFuelCell.y + n - 1]
//                [topLeftFuelCell.x + x]
//            .powerLevel;
//      }
//
//      // Add bottom right fuel cell.
//      totalPowerLevel += fuelCells[topLeftFuelCell.y + n - 1]
//              [topLeftFuelCell.x + n - 1]
//          .powerLevel;
//    } else {
      for (var y = 0; y < n; y++) {
        for (var x = 0; x < n; x++) {
          totalPowerLevel += fuelCells[y + topLeftFuelCell.y]
                  [x + topLeftFuelCell.x]
              .powerLevel;
        }
      }
//    }
//
//    topLeftFuelCell.squareSizeToTotalPowerLevelMap[n] = totalPowerLevel;

    return totalPowerLevel;
  }

  static List<List<FuelCell>> _createFuelCells(int serialNumber) {
    return List.generate(
        300, (y) => List.generate(300, (x) => FuelCell(x, y, serialNumber)));
  }
}

class FuelCellAndSquareSize {
  final FuelCell fuelCell;
  final int squareSize;
  final int totalPowerLevel;

  FuelCellAndSquareSize(this.fuelCell, this.squareSize, this.totalPowerLevel);

  @override
  String toString() => '$fuelCell,$squareSize';
}
