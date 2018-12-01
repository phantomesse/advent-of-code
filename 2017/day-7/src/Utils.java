import java.io.FileReader;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

public final class Utils {
  public static RecursiveCircus parseInput(String filePath) throws IOException {
    Map<String, Program> nameToProgramMap = new HashMap<>();
    Map<String, List<String>> nameToChildrenNamesMap = new HashMap<>();

    Scanner in = new Scanner(new FileReader(filePath));
    while (in.hasNextLine()) {
      // Create {@link Program} with just the name and the weight.
      String line = in.nextLine();
      String name = line.substring(0, line.indexOf(" "));
      int weight = Integer.parseInt(line.substring(line.indexOf("(") + 1, line.indexOf(")")));
      nameToProgramMap.put(name, new Program(name, weight));

      // Add the children names to the {@code nameToChildrenNamesMap}.
      String arrow = " -> ";
      if (line.indexOf(arrow) > 0) {
        List<String> childrenNames = Arrays.asList(
            line.substring(line.indexOf(arrow) + arrow.length()).split(", "));
        nameToChildrenNamesMap.put(name, childrenNames);
      }
    }

    // Add the parent, children, and siblings to each program based on {@code nameToChildrenNamesMap}.
    for (Map.Entry<String, List<String>> nameToChildrenNames : nameToChildrenNamesMap.entrySet()) {
      Program parent = nameToProgramMap.get(nameToChildrenNames.getKey());
      List<Program> children = nameToChildrenNames.getValue().stream().map(nameToProgramMap::get).collect(Collectors.toList());

      for (Program child : children) {
        parent.addChild(child);
        child.setParent(parent);
      }

      for (Program child : children) {
        parent.getChildren().stream().filter(program -> program != child).forEach(child::addSibling);
      }
    }

    return new RecursiveCircus(nameToProgramMap);
  }
}
