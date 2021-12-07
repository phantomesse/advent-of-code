import 'dart:io';

int getWrappingPaperAmount(String dimensionsStr) {
  final dimensions = dimensionsStr.split('x');
  final length = int.parse(dimensions[0]);
  final width = int.parse(dimensions[1]);
  final height = int.parse(dimensions[2]);

  final sides = [length * width, width * height, height * length]..sort();
  final surfaceArea = sides.fold(0, (surfaceArea, side) {
    return surfaceArea + side * 2;
  });
  final smallestSide = sides.first;

  return surfaceArea + smallestSide;
}

int getRibbonAmount(String dimensionsStr) {
  final dimensions = dimensionsStr.split('x').map(int.parse).toList()..sort();
  return dimensions[0] * 2 +
      dimensions[1] * 2 +
      dimensions.reduce((a, b) => a * b);
}

void main() {
  final dimensions = new File('input.txt').readAsStringSync().split('\n');

  // Part 1.
  print(dimensions.map(getWrappingPaperAmount).reduce((a, b) => a + b));

  // Part 2.
  print(dimensions.map(getRibbonAmount).reduce((a, b) => a + b));
}
