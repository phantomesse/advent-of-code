import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.assertEquals;

public class RecursiveCircusTest {
  RecursiveCircus circus;

  @Before
  public void setup() throws IOException {
    circus = new RecursiveCircus("../day-7/test/test.txt");
  }

  @Test
  public void testBottomProgram() {
    assertEquals("tknk", circus.getRootProgramName());
  }

  @Test
  public void testFindProgram() {
    String[] names =
        new String[]{"pbga", "xhth", "ebii", "havc", "ktlj", "fwft", "qoyq", "padx", "tknk", "jptl", "ugml", "gyxo",
            "cntj"};
    for (String name : names) {
      assertEquals(name, circus.findProgram(name).getName());
    }
  }

  @Test
  public void testBranchWeights() {
    Map<String, Integer> nameToWeightMap = new HashMap<>();
    nameToWeightMap.put("gyxo", 61);
    nameToWeightMap.put("ebii", 61);
    nameToWeightMap.put("jptl", 61);
    nameToWeightMap.put("pbga", 66);
    nameToWeightMap.put("havc", 66);
    nameToWeightMap.put("qoyq", 66);
    nameToWeightMap.put("ktlj", 57);
    nameToWeightMap.put("cntj", 57);
    nameToWeightMap.put("xhth", 57);
    nameToWeightMap.put("ugml", 251);
    nameToWeightMap.put("padx", 243);
    nameToWeightMap.put("fwft", 243);
    for (Map.Entry<String, Integer> entry : nameToWeightMap.entrySet()) {
      int expectedWeight = nameToWeightMap.get(entry.getKey());
      int actualWeight = circus.findProgram(entry.getKey()).getBranchWeight();
      assertEquals(expectedWeight, actualWeight);
    }
  }

  @Test
  public void testUnbalancedBranch() {
    assertEquals("ugml", circus.getUnbalancedProgramName());
  }

  @Test
  public void testSiblings() {
    Map<String, >
  }
}
