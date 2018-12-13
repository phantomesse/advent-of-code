import 'mines.dart';

void part1() {
  final mines = Mines('input.txt');
  print('Part 1: ');
  var crashed = false;
  while (!crashed) {
    mines.printMines();
    crashed = !mines.moveCarts();
  }
  print(mines.crashPoint);
}

void part2() {
  print('Part 2: ');
}

void main() {
  part1();
  part2();
}
