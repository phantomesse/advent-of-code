import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

enum Direction {
  UP('^'),
  DOWN('v'),
  LEFT('>'),
  RIGHT('<');

  private char character;

  Direction(char character) {
    this.character = character;
  }

  static Direction from(char character) {
    for (Direction direction : values()) {
      if (direction.character == character) {
        return direction;
      }
    }
    throw new IllegalArgumentException(character + " is not associated with a direction.");
  }

  static Direction getOpposite(Direction direction) {
    switch (direction) {
      case UP:
        return DOWN;
      case DOWN:
        return UP;
      case LEFT:
        return RIGHT;
      case RIGHT:
        return LEFT;
    }
    throw new IllegalArgumentException();
  }

  static List<Direction> getAdjacentDirections(Direction direction) {
    return Arrays.stream(values()).filter(otherDirection ->
        otherDirection != direction && otherDirection != getOpposite(direction)
    ).collect(Collectors.toList());
  }
}
