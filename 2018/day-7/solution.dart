import 'dart:io';

void part1(String input) {
  print('Part 1: $input');
}

void part2(String input) {
  print('Part 2: $input');
}

void main() {
  final input = new File('input.txt').readAsStringSync();
  part1(input);
  part2(input);
}