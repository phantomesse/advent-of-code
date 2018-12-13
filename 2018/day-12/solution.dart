import 'garden.dart';

void part1(Garden garden) {
  for (var i = 0; i < 20; i++) {
    garden.advanceGeneration();
  }
  print('Part 1: ${garden.potSum}');
}

void part2(Garden garden) {
  String lastPots;
  int lastPotSum;
  int potSumDifference;
  do {
    lastPots = garden.pots;
    lastPotSum = garden.potSum;
    garden.advanceGeneration();
    potSumDifference = garden.potSum - lastPotSum;
  } while (lastPots != garden.pots);

  final potSum =
      garden.potSum + (50000000000 - garden.generation) * potSumDifference;

  print('Part 2: $potSum');
}

void main() {
  final garden = Garden('input.txt');
  part1(garden);
  part2(garden);
}
