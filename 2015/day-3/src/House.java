import java.util.HashMap;
import java.util.Map;

class House {
  private Map<Direction, House> neighbors = new HashMap<>();
  private int presentCount = 1;

  void addNeighbor(Direction direction, House house) {
    neighbors.put(direction, house);
  }

  boolean hasNeighbor(Direction direction) {
    return neighbors.containsKey(direction);
  }

  House getNeighbor(Direction direction) {
    return neighbors.get(direction);
  }

  void addPresent() {
    presentCount++;
  }

  @Override
  public String toString() {
    return "{"
        + "presents: " + presentCount + ", neighbors: " + neighbors.keySet().toString()
        + "}";
  }
}
