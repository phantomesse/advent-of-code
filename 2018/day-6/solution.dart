import 'dart:io';
import 'grid.dart';

void part1(String input) {
  print('Part 1 ${Grid(input).largestFiniteArea}');
}

void part2(String input) {
  print('Part 2 ${Grid(input).getRegionSize(10000)}');
}

void main() {
  final inputFileName = 'input.txt';
  part1(inputFileName);
  part2(inputFileName);
}
