import java.util.List;

public class Program {
  private String name;
  private int weight;
  private List<Program> children;
  private Program parent;

  public Program(String name, int weight) {
    this.name = name;
    this.weight = weight;
  }

  public String getName() {
    return name;
  }

  public int getWeight() {
    return weight;
  }

  public void setChildren(List<Program> children) {
    this.children = children;
  }

  public void setParent(Program parent) {
    this.parent = parent;
  }

  public boolean isRoot() {
    return parent == null;
  }
}
