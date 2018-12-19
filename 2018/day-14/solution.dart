import 'recipes.dart';

void main() {
  final recipes = Recipes();
  print('Part 1: ${recipes.getNext10Scores(236021)}');
  print('Part 2: ${recipes.getAppearsAfterRecipeCount('236021')}');
}
