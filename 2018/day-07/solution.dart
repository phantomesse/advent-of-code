import 'instructions.dart';

void part1(String inputFileName) {
  final instructions = Instructions(inputFileName);
  print('Part 1: ${instructions.order}');
}

void part2(String inputFileName) {
  final instructions = Instructions(inputFileName);
  print('Part 2: ${instructions.getSeconds(5)}');
}

void main() {
  final inputFileName = 'input.txt';
  part1(inputFileName);
  part2(inputFileName);
}