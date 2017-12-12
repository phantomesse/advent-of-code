import 'count_grid.dart';
import 'sum_grid.dart';

void main() {
  // Part 1.
  print('Part 1');

  // Print out a grid.
  var grid = new CountGrid();
  grid.getDistance(25);
  print(grid);

  // Solution.
  print(grid.getDistance(289326));

  // Part 2.
  print('\n\nPart 2');

  // Print out a grid.
  grid = new SumGrid();
  grid.getFirstLargerNumber(350);
  print(grid);

  // Solution.
  print(grid.getFirstLargerNumber(289326));
}
