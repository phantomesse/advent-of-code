import java.util.ArrayList;
import java.util.List;

public class Program {
  private String name;
  private int weight;
  private Program parent;
  private List<Program> children;
  private List<Program> siblings;

  public Program(String name, int weight) {
    this.name = name;
    this.weight = weight;
    children = new ArrayList<>();
    siblings = new ArrayList<>();
  }

  public String getName() {
    return name;
  }

  public int getWeight() {
    return weight;
  }

  public int getBranchWeight() {
    int weight = getWeight();
    for (Program child : children) {
      weight += child.getBranchWeight();
    }
    return weight;
  }

  public void setParent(Program parent) {
    this.parent = parent;
  }

  public Program getParent() {
    return parent;
  }

  public void addChild(Program child) {
    children.add(child);
  }

  public List<Program> getChildren() {
    return children;
  }

  public void addSibling(Program sibling) {
    siblings.add(sibling);
  }

  public List<Program> getSiblings() {
    return siblings;
  }

  public boolean isRoot() {
    return parent == null;
  }
}
