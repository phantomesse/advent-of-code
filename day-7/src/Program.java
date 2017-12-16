import java.util.List;

public class Program {
  private String name;
  private int weight;
  private List<String> childrenProgramNames;
  private Program parentProgram;

  public Program(String name, int weight, List<String> childrenProgramNames) {
    this.name = name;
    this.weight = weight;
    this.childrenProgramNames = childrenProgramNames;
  }

  public String getName() {
    return name;
  }

  public List<String> getChildrenProgramNames() {
    return childrenProgramNames;
  }

  public void setParentProgram(Program program) {
    this.parentProgram = program;
  }

  public boolean isRoot() {
    return parentProgram == null;
  }
}
