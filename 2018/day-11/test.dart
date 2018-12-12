import 'package:test/test.dart';
import 'fuel_cell.dart';
import 'grid.dart';

void main() {
  test('Fuel cell at 3,5, grid serial number 8: rack id is 13', () {
    expect(FuelCell(3, 5, 8).rackId, 13);
  });

  test('Fuel cell at 3,5, grid serial number 8: power level 4', () {
    expect(FuelCell(3, 5, 8).powerLevel, 4);
  });

  test('Fuel cell at 122,79, grid serial number 57: power level -5.', () {
    expect(FuelCell(122, 79, 57).powerLevel, -5);
  });

  test('Fuel cell at 217,196, grid serial number 39: power level  0.', () {
    expect(FuelCell(217, 196, 39).powerLevel, 0);
  });

  test('Fuel cell at 101,153, grid serial number 71: power level  4.', () {
    expect(FuelCell(101, 153, 71).powerLevel, 4);
  });

  test('Power level for square at 33,45 with grid serial number 18 is 29', () {
    expect(Grid(18).get3x3SquarePowerLevel(FuelCell(33, 45, 18)), 29);
  });

  test('Greatest power level for grid serial number 18 is at square at 33,45',
      () {
    final expectedFuelCell = FuelCell(33, 45, 18);
    final actualFuelCell = Grid(18).mostPowerful3x3SquareTopLeftFuelCell;
    expect(actualFuelCell.x, expectedFuelCell.x);
    expect(actualFuelCell.y, expectedFuelCell.y);
  });

  test(
      'Largest total square for grid serial number 18 has power of 113, square size of 16, and at 90,269',
      () {
    final grid = Grid(18);
    final combo = grid.mostPowerfulNxNSquare;
    expect(combo.totalPowerLevel, 113);
    expect(combo.squareSize, 16);
    expect(combo.fuelCell.x, 90);
    expect(combo.fuelCell.y, 269);
  });
}
