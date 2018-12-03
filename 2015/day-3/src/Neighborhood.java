import java.util.ArrayList;
import java.util.List;

class Neighborhood {
  private House currentHouse;
  private List<House> houses;

  Neighborhood() {
    currentHouse = new House();
    houses = new ArrayList<>();
    houses.add(currentHouse);
  }

  void moveSanta(String instructions) {
    for (char instruction : instructions.toCharArray()) {
      moveSanta(instruction);
    }
  }

  private void moveSanta(char instruction) {
    Direction direction = Direction.from(instruction);

    if (currentHouse.hasNeighbor(direction)) {
      currentHouse = currentHouse.getNeighbor(direction);
      currentHouse.addPresent();
      return;
    }

    House newHouse = new House();
    houses.add(newHouse);
    currentHouse.addNeighbor(direction, newHouse);
    newHouse.addNeighbor(Direction.getOpposite(direction), currentHouse);

    for (Direction adjacentDirection : Direction.getAdjacentDirections(direction)) {
      if (!currentHouse.hasNeighbor(adjacentDirection)) continue;
      House adjacentDirectionNeighbor = currentHouse.getNeighbor(adjacentDirection);
      if (!adjacentDirectionNeighbor.hasNeighbor(direction)) continue;
      House newHouseNeighbor = adjacentDirectionNeighbor.getNeighbor(direction);
      newHouse.addNeighbor(adjacentDirection, newHouseNeighbor);
      newHouseNeighbor.addNeighbor(Direction.getOpposite(adjacentDirection), newHouse);

      if (!newHouseNeighbor.hasNeighbor(direction)) continue;
      House neighbor = newHouseNeighbor.getNeighbor(direction);
      if (!neighbor.hasNeighbor(adjacentDirection)) continue;
      neighbor = neighbor.getNeighbor(adjacentDirection);
      neighbor.addNeighbor(Direction.getOpposite(direction), newHouse);
      newHouse.addNeighbor(direction, neighbor);
    }
    currentHouse = newHouse;
  }

  int getHouseCount() {
    houses.forEach(System.out::println);
    return houses.size();
  }
}