class Cart {
  int x, y;
  CartDirection direction;
  int crossedIntersectionCount = 0;

  Cart(String inputValue) {
    direction = _getCartDirection(inputValue);
  }

  void turnLeft() {
    switch (direction) {
      case CartDirection.right:
        direction = CartDirection.up;
        return;
      case CartDirection.left:
        direction = CartDirection.down;
        return;
      case CartDirection.down:
        direction = CartDirection.right;
        return;
      case CartDirection.up:
        direction = CartDirection.left;
        return;
    }
  }

  void turnRight() {
    switch (direction) {
      case CartDirection.right:
        direction = CartDirection.down;
        return;
      case CartDirection.left:
        direction = CartDirection.up;
        return;
      case CartDirection.down:
        direction = CartDirection.left;
        return;
      case CartDirection.up:
        direction = CartDirection.right;
        return;
    }
  }

  static CartDirection _getCartDirection(String inputValue) {
    switch (inputValue) {
      case '>':
        return CartDirection.right;
      case '<':
        return CartDirection.left;
      case 'v':
        return CartDirection.down;
      case '^':
        return CartDirection.up;
      default:
        return null;
    }
  }

  static bool isCart(String inputValue) =>
      ['>', '<', 'v', '^'].contains(inputValue);

  @override
  String toString() {
    switch (direction) {
      case CartDirection.right:
        return '>';
      case CartDirection.left:
        return '<';
      case CartDirection.down:
        return 'v';
      case CartDirection.up:
        return '^';
    }
    return 'something went wrong';
  }
}

enum CartDirection { up, down, left, right }
