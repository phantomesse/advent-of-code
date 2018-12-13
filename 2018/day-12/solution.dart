import 'garden.dart';

void part1() {
  final garden = Garden('input.txt');
  for (var i = 0; i < 20; i++) {
    garden.advanceGeneration();
    print(garden);
  }
  print('Part 1: ${garden.potsWithPlantsCount}');
}

void part2() {
  final garden = Garden('input.txt');
  var lastZero = 0;
  for (var i = 0; i < 3000; i++) {
    garden.advanceGeneration();
    print('generation is ${garden.generation}');
//    print(garden);
    print('\ngeneration = $i \t zero = ${garden.zeroIndex} = +${garden.zeroIndex - lastZero}');
    print('garden zero: ${garden.potsWithPlantsCount}');
    print('garden without zero: ${garden.withoutZero}');
    print('diff: ${garden.potsWithPlantsCount - garden.withoutZero}');
//    lastZero = garden.zeroIndex;
//    print(garden);
  }
  print('Part 2: ${garden.potsWithPlantsCount}');
}

void main() {
//  part1();
  part2();
}
