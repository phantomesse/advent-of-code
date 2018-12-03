import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.Scanner;

class Solution {
  public static void main(String[] args) throws FileNotFoundException {
    Neighborhood neighborhood = new Neighborhood();
    neighborhood.moveSanta(">");
    System.out.println(neighborhood.getHouseCount());

    neighborhood = new Neighborhood();
    neighborhood.moveSanta("^>v<");
    System.out.println(neighborhood.getHouseCount());

    neighborhood = new Neighborhood();
    neighborhood.moveSanta("^v^v^v^v^v");
    System.out.println(neighborhood.getHouseCount());

    // Part 1.
    Scanner in = new Scanner(new FileReader("day-3/src/input.txt"));
    StringBuilder stringBuilder = new StringBuilder();
    while (in.hasNext()) {
      stringBuilder.append(in.next());
    }
    in.close();
    String instructions = stringBuilder.toString();
    neighborhood = new Neighborhood();
    neighborhood.moveSanta(instructions);
    System.out.println(neighborhood.getHouseCount());
  }
}