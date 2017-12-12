import 'count_grid.dart';

void main() {
  // Print out a grid of length 25.
  var grid = new CountGrid();
  grid.getDistance(25);
  print(grid);

  // Part 1.
  print(grid.getDistance(289326));
}
