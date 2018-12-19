import 'package:test/test.dart';
import 'recipes.dart';

void main() {
  group('$Recipes', () {
    Recipes recipes;

    setUp(() {
      recipes = Recipes();
    });

    test(
        'combining recipes of scores 3 and 7 creates recipes of scores 1 and 0',
        () {
      final newRecipes = Recipes.combineRecipes(3, 7);
      expect(newRecipes, hasLength(2));
      expect(newRecipes, containsAll([1, 0]));
    });

    test('combining recipes of scores 2 and 3 creates one recipe of score 5',
        () {
      final newRecipes = Recipes.combineRecipes(2, 3);
      expect(newRecipes, hasLength(1));
      expect(newRecipes.single, 5);
    });

    test('initial recipes string is "(3)[7]"', () {
      expect(recipes.toString(), '(3)[7]');
    });

    test('recipes after multiple rounds', () {
      recipes.incrementRound();
      expect(recipes.toString(), '(3)[7] 1  0 ');
      recipes.incrementRound();
      expect(recipes.toString(), ' 3  7  1 [0](1) 0 ');
      recipes.incrementRound();
      expect(recipes.toString(), ' 3  7  1  0 [1] 0 (1)');
      recipes.incrementRound();
      expect(recipes.toString(), '(3) 7  1  0  1  0 [1] 2 ');
      recipes.incrementRound();
      expect(recipes.toString(), ' 3  7  1  0 (1) 0  1  2 [4]');
      recipes.incrementRound();
      expect(recipes.toString(), ' 3  7  1 [0] 1  0 (1) 2  4  5 ');
      recipes.incrementRound();
      expect(recipes.toString(), ' 3  7  1  0 [1] 0  1  2 (4) 5  1 ');
      recipes.incrementRound();
      expect(recipes.toString(), ' 3 (7) 1  0  1  0 [1] 2  4  5  1  5 ');
      recipes.incrementRound();
      expect(recipes.toString(), ' 3  7  1  0  1  0  1  2 [4](5) 1  5  8 ');
      recipes.incrementRound();
      expect(recipes.toString(), ' 3 (7) 1  0  1  0  1  2  4  5  1  5  8 [9]');
      recipes.incrementRound();
      expect(recipes.toString(),
          ' 3  7  1  0  1  0  1 [2] 4 (5) 1  5  8  9  1  6 ');
      recipes.incrementRound();
      expect(recipes.toString(),
          ' 3  7  1  0  1  0  1  2  4  5 [1] 5  8  9  1 (6) 7 ');
      recipes.incrementRound();
      expect(recipes.toString(),
          ' 3  7  1  0 (1) 0  1  2  4  5  1  5 [8] 9  1  6  7  7 ');
      recipes.incrementRound();
      expect(recipes.toString(),
          ' 3  7 [1] 0  1  0 (1) 2  4  5  1  5  8  9  1  6  7  7  9 ');
      recipes.incrementRound();
      expect(recipes.toString(),
          ' 3  7  1  0 [1] 0  1  2 (4) 5  1  5  8  9  1  6  7  7  9  2 ');
    });

    test('After 5 recipes, the scores of the next ten would be 0124515891.',
        () {
      expect(recipes.getNext10Scores(5), '0124515891');
    });

    test('After 9 recipes, the scores of the next ten would be 5158916779.',
        () {
      expect(recipes.getNext10Scores(9), '5158916779');
    });

    test('After 18 recipes, the scores of the next ten would be 9251071085.',
        () {
      expect(recipes.getNext10Scores(18), '9251071085');
    });

    test('After 2018 recipes, the scores of the next ten would be 5941429882.',
        () {
      expect(recipes.getNext10Scores(2018), '5941429882');
    });

    test('51589 first appears after 9 recipes.', () {
      expect(recipes.getAppearsAfterRecipeCount('51589'), 9);
    });
    test('01245 first appears after 5 recipes.', () {
      expect(recipes.getAppearsAfterRecipeCount('01245'), 5);
    });
    test('92510 first appears after 18 recipes.', () {
      expect(recipes.getAppearsAfterRecipeCount('92510'), 18);
    });
    test('59414 first appears after 2018 recipes.', () {
      expect(recipes.getAppearsAfterRecipeCount('59414'), 2018);
    });
  });
}
