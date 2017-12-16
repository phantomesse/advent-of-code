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

  private Program parseInput(String filePath) throws IOException {
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
  }
}
