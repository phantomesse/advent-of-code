import java.io.FileReader;
import java.io.IOException;
import java.util.*;

public class RecursiveCircus {
  private Map<String, Program> programNameToProgramMap;

  RecursiveCircus(String filePath) throws IOException {
    programNameToProgramMap = new HashMap<>();
    parseInput(filePath);
  }

  public String getRootProgramName() {
    return programNameToProgramMap.values().stream().filter(Program::isRoot).findFirst().get().getName();
  }

  private void parseInput(String filePath) throws IOException {
    Scanner in = new Scanner(new FileReader(filePath));
    while (in.hasNextLine()) {
      String line = in.nextLine();
      String programName = line.substring(0, line.indexOf(" "));
      int weight = Integer.parseInt(line.substring(line.indexOf("(") + 1, line.indexOf(")")));

      List<String> childrenProgramNames = new LinkedList<>();
      String arrow = " -> ";
      if (line.indexOf(arrow) > 0) {
        childrenProgramNames.addAll(Arrays.asList(
            line.substring(line.indexOf(arrow) + arrow.length()).split(", ")));
      }

      Program program = new Program(programName, weight, childrenProgramNames);
      programNameToProgramMap.put(programName, program);
    }

    for (Program program : programNameToProgramMap.values()) {
      for (String childProgramName : program.getChildrenProgramNames()) {
        Program childProgram = programNameToProgramMap.get(childProgramName);
        childProgram.setParentProgram(program);
      }
    }
  }

  public static void main(String[] args) throws IOException {
    RecursiveCircus circus = new RecursiveCircus("day-7/src/part1.txt");
    System.out.println("Part 1: " + circus.getRootProgramName());
  }
}
