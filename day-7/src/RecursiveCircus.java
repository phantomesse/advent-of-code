import java.io.FileReader;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

public class RecursiveCircus {
  private final Program root;

  RecursiveCircus(String filePath) throws IOException {
    root = parseInput(filePath);
  }

  public String getRootProgramName() {
    return root.getName();
  }

  public String getUnbalancedProgramName() {
    return getUnbalancedProgramName(root);
  }

  private static String getUnbalancedProgramName(Program root) {
    List<Program> children = root.getChildren();
    if (children == null) return null;

    List<Program> weight1 = new ArrayList<>();
    List<Program> weight2 = new ArrayList<>();
    for (Program child : children) {
      if (weight1.isEmpty()) {
        weight1.add(child);
        continue;
      }

      if (child.getBranchWeight() == weight1.get(0).getBranchWeight()) {
        weight1.add(child);
      } else {
        weight2.add(child);
      }
    }

    if (weight2.isEmpty()) {
      // All children branches are balanced.
      for (Program child : children) {
        String unbalancedProgramName = getUnbalancedProgramName(child);
        if (unbalancedProgramName != null) return unbalancedProgramName;
      }
      return null;
    }

    return weight1.size() == 1 ? weight1.get(0).getName() : weight2.get(0).getName();
  }

  public Program findProgram(String programName) {
    return findProgram(programName, root);
  }

  private static Program findProgram(String name, Program root) {
    if (root.getName().equals(name)) return root;
    if (root.getChildren() == null) return null;

    for (Program child : root.getChildren()) {
      Program program = findProgram(name, child);
      if (program != null) return program;
    }

    return null;
  }

  private static Program parseInput(String filePath) throws IOException {
    Map<String, Program> nameToProgramNameMap = new HashMap<>();
    Map<String, List<String>> nameToChildrenNamesMap = new HashMap<>();

    // Parse file.
    Scanner in = new Scanner(new FileReader(filePath));
    while (in.hasNextLine()) {
      // Create Program with just the name and weight.
      String line = in.nextLine();
      String name = line.substring(0, line.indexOf(" "));
      int weight = Integer.parseInt(line.substring(line.indexOf("(") + 1, line.indexOf(")")));
      Program program = new Program(name, weight);
      nameToProgramNameMap.put(name, program);

      // Add the children names to the `nameToChildrenNamesMap`.
      String arrow = " -> ";
      if (line.indexOf(arrow) > 0) {
        List<String> childrenNames =
            Arrays.asList(
                line.substring(line.indexOf(arrow) + arrow.length()).split(", "));
        nameToChildrenNamesMap.put(name, childrenNames);
      }
    }

    // Add parent and children to each program based on `nameToChildrenNamesMap`.
    for (Map.Entry<String, List<String>> nameToChildrenNames : nameToChildrenNamesMap.entrySet()) {
      Program parent = nameToProgramNameMap.get(nameToChildrenNames.getKey());
      List<Program> children =
          nameToChildrenNames.getValue().stream().map(nameToProgramNameMap::get).collect(Collectors.toList());
      parent.setChildren(children);
      for (Program child : children) {
        child.setParent(parent);
      }
    }

    // Set the root.
    Optional<Program> root = nameToProgramNameMap.values().stream().filter(Program::isRoot).findFirst();
    if (root.isPresent()) return root.get();
    throw new RuntimeException("Root not found.");
  }

  public static void main(String[] args) throws IOException {
    RecursiveCircus circus = new RecursiveCircus("day-7/src/part1.txt");
    System.out.println("Part 1: " + circus.getRootProgramName());

    circus = new RecursiveCircus("day-7/src/part1.txt");
    Program unbalancedProgram = circus.findProgram(circus.getUnbalancedProgramName());
    int balancedBranchWeight = unbalancedProgram.getParent().getChildren().stream().filter(program -> program.getName
        () != unbalancedProgram.getName()).findAny().get().getBranchWeight();
    int shouldBeWeight;
    if (balancedBranchWeight > unbalancedProgram.getBranchWeight()) {
      shouldBeWeight = unbalancedProgram.getWeight() + (balancedBranchWeight - unbalancedProgram.getBranchWeight());
    } else {
      shouldBeWeight = unbalancedProgram.getWeight() - (unbalancedProgram.getBranchWeight() - balancedBranchWeight);
    }
    System.out.println("Part 2: " + shouldBeWeight);
  }
}
