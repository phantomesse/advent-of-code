import 'dart:io';

import 'package:meta/meta.dart';

import 'cart.dart';
import 'track.dart';

class Mines {
  List<List<dynamic>> _mines;
  final carts = <Cart>[];

  Mines(String inputFilePath) {
    _mines = File(inputFilePath)
        .readAsStringSync()
        .split('\n')
        .map((inputRow) => inputRow.split('').map((inputValue) {
              // Check if track.
              final track = getTrack(inputValue);
              if (track != null) return track;

              // Check if cart.
              if (!Cart.isCart(inputValue)) return null;
              return Cart(inputValue);
            }).toList())
        .toList();

    for (var y = 0; y < _mines.length; y++) {
      for (var x = 0; x < _mines[y].length; x++) {
        final entry = _mines[y][x];
        if (!(entry is Cart)) continue;

        final cart = entry as Cart;
        cart
          ..x = x
          ..y = y;
        carts.add(cart);

        // Replace mine entry with track.
        if (cart.direction == CartDirection.down ||
            cart.direction == CartDirection.up) {
          _mines[y][x] = Track.vertical;
        } else {
          _mines[y][x] = Track.horizontal;
        }
      }
    }
  }

  void printMines() {
    for (var y = 0; y < _mines.length; y++) {
      var rowStr = '';
      for (var x = 0; x < _mines[y].length; x++) {
        var hadCart = false;
        for (final cart in carts) {
          if (cart.x == x && cart.y == y) {
            hadCart = true;
            rowStr += cart.toString();
          }
        }
        if (hadCart) continue;

        final entry = _mines[y][x];
        if (entry == null)
          rowStr += ' ';
        else
          rowStr += trackToString(entry);
      }
      print(rowStr);
    }
  }

  bool moveCarts() {
    for (final cart in carts) {
      final wasMoveSuccessful = _moveCart(cart);
      if (!wasMoveSuccessful) {
        crashPoint = <int>[cart.x, cart.y];
        return false;
      }
    }
    return true;
  }

  List<int> crashPoint;

  /// Returns true if cart moved successfully and false if cart crashed into
  /// another cart.
  bool _moveCart(Cart cart) {
    cart.moveForward();
    final next = _mines[cart.y][cart.x];

    for (final otherCart in carts) {
      if (cart == otherCart) continue;
      if (cart.x == otherCart.x && cart.y == otherCart.y) {
        return false;
      }
    }

    if (next == Track.intersection) _handleIntersection(cart);
    if (next == Track.curveRight) _handleCurveRight(cart);
    if (next == Track.curveLeft) _handleCurveLeft(cart);
    return true;
  }

  void _handleIntersection(Cart cart) {
    final mod = cart.crossedIntersectionCount % 4;
    if (mod == 0) cart.turnLeft();
    if (mod == 2) cart.turnRight();
    cart.crossedIntersectionCount++;
  }

  void _handleCurveRight(Cart cart) {
    // '/'
    switch (cart.direction) {
      case CartDirection.up:
      case CartDirection.down:
        cart.turnRight();
        break;
      case CartDirection.left:
      case CartDirection.right:
        cart.turnLeft();
        break;
    }
  }

  void _handleCurveLeft(Cart cart) {
    // '\'
    switch (cart.direction) {
      case CartDirection.up:
      case CartDirection.down:
        cart.turnLeft();
        break;
      case CartDirection.left:
      case CartDirection.right:
        cart.turnRight();
        break;
    }
  }
}
