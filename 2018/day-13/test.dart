import 'package:test/test.dart';

import 'mines.dart';
import 'cart.dart';

void main() {
  group('$Mines', () {
    Mines mines;

    setUp(() {
      mines = Mines('test-input.txt');
    });

    test('has 2 carts, one facing right and one facing down', () {
      expect(mines.carts, hasLength(2));

      final cartFacingRight = mines.carts.singleWhere(
          (cart) => cart.direction == CartDirection.right,
          orElse: () => null);
      expect(cartFacingRight, isNot(null));
      expect(cartFacingRight.x, 2);
      expect(cartFacingRight.y, 0);

      final cartFacingDown = mines.carts.singleWhere(
          (cart) => cart.direction == CartDirection.down,
          orElse: () => null);
      expect(cartFacingDown, isNot(null));
      expect(cartFacingDown.x, 9);
      expect(cartFacingDown.y, 3);
    });

    test('crash', () {
      var crashed = false;
      while (!crashed) {
        mines.printMines();
        crashed = !mines.moveCarts();
      }
      print(mines.crashPoint);
    });
  });
}
