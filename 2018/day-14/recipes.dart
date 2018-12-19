class Recipes {
  final recipes = [3, 7];
  int elf1Index = 0;
  int elf2Index = 1;

  void incrementRound() {
    final elf1Recipe = recipes[elf1Index];
    final elf2Recipe = recipes[elf2Index];

    final newRecipes = combineRecipes(recipes[elf1Index], recipes[elf2Index]);
    recipes.addAll(newRecipes);

    elf1Index = (elf1Index + elf1Recipe + 1) % recipes.length;
    elf2Index = (elf2Index + elf2Recipe + 1) % recipes.length;
  }

  String getNext10Scores(int afterRecipeCount) {
    while (recipes.length < afterRecipeCount + 10) {
      incrementRound();
    }
    return recipes.skip(afterRecipeCount).take(10).join();
  }

  int getAppearsAfterRecipeCount(String pattern) {
    final numbers = pattern.split('').map(int.parse).toList();

    while (recipes.length < pattern.length) {
      incrementRound();
    }

    var startIndex = 0;
    do {
      for (var i = startIndex; i < recipes.length - numbers.length; i++) {
        if (recipes[i] == numbers.first) startIndex = i;
        for (var j = 0; j < numbers.length; j++) {
          if (recipes[i + j] != numbers[j]) break;
          if (j == numbers.length - 1) return i;
        }
      }
      incrementRound();
    } while (true);
  }

  static List<int> combineRecipes(int recipe1, int recipe2) =>
      (recipe1 + recipe2).toString().split('').map(int.parse).toList();

  @override
  String toString() {
    var str = '';

    for (var i = 0; i < recipes.length; i++) {
      if (i == elf1Index) {
        str += '(${recipes[i]})';
      } else if (i == elf2Index) {
        str += '[${recipes[i]}]';
      } else {
        str += ' ${recipes[i]} ';
      }
    }

    return str;
  }
}
