import java.util.List;
import java.util.stream.Collectors;

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

  public void setChildren(List<Program> children) {
    this.children = children;
  }

  public List<Program> getChildren() {
    return children;
  }

  public void setParent(Program parent) {
    this.parent = parent;
  }

  public List<Program> getSiblings() {
    return parent.getChildren().stream().filter(program -> program != this).collect(Collectors.toList());
  }

  public boolean isRoot() {
    return parent == null;
  }

  public int getWeight() {
    return weight;
  }

  public int getBranchWeight() {
    if (children == null) return weight;
    return weight + children.stream().map(Program::getBranchWeight).reduce((weight1, weight2) -> weight1 +
        weight2)
        .orElse(0);
  }
}
