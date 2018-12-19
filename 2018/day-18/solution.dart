import 'forest.dart';

void main() {
  part1();
  part2();
}

void part1() {
  final forest = Forest('input.txt');

  for (var i = 0; i < 10; i++) {
    forest.incrementMinute();
  }
  print('Part 1: ${forest.resourceValue}');
}

void part2() {
  final forest = Forest('input.txt');
  final constant = 84;

  for (var i = 0; i < constant * 10; i++) {
    forest.incrementMinute();
  }

  for (var i = 0; i < (1000000000 % constant); i++) {
    forest.incrementMinute();
  }
  print('Part 2: ${forest.resourceValue}');
}
