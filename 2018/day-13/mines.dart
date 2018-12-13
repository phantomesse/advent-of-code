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
    print('before cart: ${cart.x}, ${cart.y}');
    switch (cart.direction) {
      case CartDirection.right:
        cart.x++;
        final nextTrack = _mines[cart.y][cart.x];
        if (nextTrack is Cart) return false;

        if (nextTrack as Track == Track.curveLeft) {
          cart.direction = CartDirection.down;
        }
        if (nextTrack as Track == Track.curveRight) {
          cart.direction = CartDirection.up;
        }
        if (nextTrack as Track == Track.intersection) _handleIntersection(cart);
        return true;

      case CartDirection.left:
        cart.x--;
        final nextTrack = _mines[cart.y][cart.x];
        if (nextTrack is Cart) return false;

        if (nextTrack as Track == Track.curveLeft) {
          cart.direction = CartDirection.up;
        }
        if (nextTrack as Track == Track.curveRight) {
          cart.direction = CartDirection.down;
        }
        if (nextTrack as Track == Track.intersection) _handleIntersection(cart);
        return true;

      case CartDirection.down:
        cart.y++;
        final nextTrack = _mines[cart.y][cart.x];
        if (nextTrack is Cart) return false;

        if (nextTrack as Track == Track.curveLeft) {
          cart.direction = CartDirection.right;
        }
        if (nextTrack as Track == Track.curveRight) {
          cart.direction = CartDirection.left;
        }
        if (nextTrack as Track == Track.intersection) _handleIntersection(cart);
        return true;

      case CartDirection.up:
        cart.y--;
        final nextTrack = _mines[cart.y][cart.x];
        if (nextTrack is Cart) return false;

        if (nextTrack as Track == Track.curveLeft) {
          cart.direction = CartDirection.left;
        }
        if (nextTrack as Track == Track.curveRight) {
          cart.direction = CartDirection.right;
        }
        if (nextTrack as Track == Track.intersection) _handleIntersection(cart);
        return true;
    }

    throw 'something went wrong';
  }

  void _handleIntersection(Cart cart) {
    final mod = cart.crossedIntersectionCount % 4;
    switch (mod) {
      case 0:
        cart.turnLeft();
        return;
      case 2:
        cart.turnRight();
        return;
      default:
        return;
    }
  }
}
