import java.io.IOException;
import java.util.Map;

public class RecursiveCircus {
  private final Map<String, Program> nameToProgramMap;

  public RecursiveCircus(Map<String, Program> nameToProgramMap) {
    this.nameToProgramMap = nameToProgramMap;
  }

  public Program getProgram(String name) {
    return nameToProgramMap.get(name);
  }

  public String getRootProgramName() {
    return nameToProgramMap.values().stream().filter(Program::isRoot).findAny().get().getName();
  }

  public static void main(String[] args) throws IOException {
    RecursiveCircus circus = Utils.parseInput("day-7/src/part1.txt");
    System.out.println("Part 1: " + circus.getRootProgramName());
  }
}
