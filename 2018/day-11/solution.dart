import 'grid.dart';

void main() {
  final grid = Grid(7403);
  print('Part 1: ${grid.mostPowerful3x3SquareTopLeftFuelCell}');
  print('Part 2: ${grid.mostPowerfulNxNSquare}');
}