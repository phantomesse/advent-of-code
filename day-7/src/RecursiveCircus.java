import java.io.IOException;
import java.util.*;

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

  public String getUnbalancedProgramName() {
    Program root = getProgram(getRootProgramName());
    return getUnbalancedProgramName(root);
  }

  private String getUnbalancedProgramName(Program root) {
    if (root.getChildren().isEmpty()) return root.getName();

    Map<Integer, List<Program>> branchWeightToProgramsMap = new HashMap<>();
    for (Program program : root.getChildren()) {
      int branchWeight = program.getBranchWeight();
      if (branchWeightToProgramsMap.containsKey(branchWeight)) {
        branchWeightToProgramsMap.get(branchWeight).add(program);
      } else {
        List<Program> programs = new LinkedList<>();
        programs.add(program);
        branchWeightToProgramsMap.put(branchWeight, programs);
      }
    }

    Optional<List<Program>> unbalancedRoot = branchWeightToProgramsMap.values().stream().filter(programs -> programs
        .size() == 1)
        .findFirst();
    if (unbalancedRoot.isPresent()) {
      return getUnbalancedProgramName(unbalancedRoot.get().get(0));
    }
    return root.getName();
  }

  public static void main(String[] args) throws IOException {
    RecursiveCircus circus = Utils.parseInput("day-7/src/part1.txt");
    System.out.println("Part 1: " + circus.getRootProgramName());

    circus = Utils.parseInput("day-7/src/part2.txt");
    Program unbalancedProgram = circus.getProgram(circus.getUnbalancedProgramName());
    int expectedBranchWeight = unbalancedProgram.getSiblings().get(0).getBranchWeight();
    System.out.println("Part 2: ");
    System.out.println("\tExpected branch weight: " + expectedBranchWeight);
    System.out.println("\tCurrent branch weight: " + unbalancedProgram.getBranchWeight());
    System.out.println("\tCurrent weight: " + unbalancedProgram.getWeight());
  }
}
