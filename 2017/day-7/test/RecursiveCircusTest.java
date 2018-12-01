import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.Assert.*;

public class RecursiveCircusTest {
  RecursiveCircus circus;

  @Before
  public void setup() throws IOException {
    circus = Utils.parseInput("../day-7/test/test.txt");
  }

  @Test
  public void testWeights() {
    assertWeight("pbga", 66);
    assertWeight("xhth", 57);
    assertWeight("ebii", 61);
    assertWeight("havc", 66);
    assertWeight("ktlj", 57);
    assertWeight("fwft", 72);
    assertWeight("qoyq", 66);
    assertWeight("padx", 45);
    assertWeight("tknk", 41);
    assertWeight("jptl", 61);
    assertWeight("ugml", 68);
    assertWeight("gyxo", 61);
    assertWeight("cntj", 57);
  }

  @Test
  public void testBranchWeights() {
    assertBranchWeight("pbga", 66);
    assertBranchWeight("xhth", 57);
    assertBranchWeight("ebii", 61);
    assertBranchWeight("havc", 66);
    assertBranchWeight("ktlj", 57);
    assertBranchWeight("fwft", 243);
    assertBranchWeight("qoyq", 66);
    assertBranchWeight("padx", 243);
    assertBranchWeight("tknk", 778);
    assertBranchWeight("jptl", 61);
    assertBranchWeight("ugml", 251);
    assertBranchWeight("gyxo", 61);
    assertBranchWeight("cntj", 57);
  }

  @Test
  public void testParent() {
    assertParent("pbga", "padx");
    assertParent("xhth", "fwft");
    assertParent("ebii", "ugml");
    assertParent("havc", "padx");
    assertParent("ktlj", "fwft");
    assertParent("fwft", "tknk");
    assertParent("qoyq", "padx");
    assertParent("padx", "tknk");
    assertParent("jptl", "ugml");
    assertParent("ugml", "tknk");
    assertParent("gyxo", "ugml");
    assertParent("cntj", "fwft");
    assertNull(circus.getProgram("tknk").getParent());
  }

  @Test
  public void testChildren() {
    assertNoChildren("pbga");
    assertNoChildren("xhth");
    assertNoChildren("ebii");
    assertNoChildren("havc");
    assertNoChildren("ktlj");
    assertNoChildren("qoyq");
    assertNoChildren("jptl");
    assertNoChildren("gyxo");
    assertNoChildren("cntj");
    assertChildren("fwft", "ktlj", "cntj", "xhth");
    assertChildren("padx", "pbga", "havc", "qoyq");
    assertChildren("tknk", "ugml", "padx", "fwft");
    assertChildren("ugml", "gyxo", "ebii", "jptl");
  }

  @Test
  public void testSiblings() {
    assertSiblings("ktlj", "cntj", "xhth");
    assertSiblings("pbga", "havc", "qoyq");
    assertSiblings("ugml", "padx", "fwft");
    assertSiblings("gyxo", "ebii", "jptl");
    assertTrue(circus.getProgram("tknk").getSiblings().isEmpty());
  }

  @Test
  public void testRootProgram() {
    assertEquals("tknk", circus.getRootProgramName());
  }

  @Test
  public void testUnbalancedProgram() {
    assertEquals("ugml", circus.getUnbalancedProgramName());
  }

  private void assertWeight(String programName, int expectedWeight) {
    assertEquals(expectedWeight, circus.getProgram(programName).getWeight());
  }

  private void assertBranchWeight(String programName, int expectedWeight) {
    assertEquals(expectedWeight, circus.getProgram(programName).getBranchWeight());
  }

  private void assertParent(String programName, String expectedParentName) {
    assertEquals(expectedParentName, circus.getProgram(programName).getParent().getName());
  }

  private void assertNoChildren(String programName) {
    assertTrue(circus.getProgram(programName).getChildren().isEmpty());
  }

  private void assertChildren(String programName, String... expectedChildrenNames) {
    List<Program> actualChildren = circus.getProgram(programName).getChildren();
    compareLists(actualChildren, expectedChildrenNames);
  }

  private void assertSiblings(String programName, String... expectedSiblingNames) {
    List<Program> actualSiblings = circus.getProgram(programName).getSiblings();
    compareLists(actualSiblings, expectedSiblingNames);

  }

  private void compareLists(List<Program> actualPrograms, String[] expectedNames) {
    assertFalse(actualPrograms.isEmpty());
    assertEquals(expectedNames.length, actualPrograms.size());
    List<String> actualNames = actualPrograms.stream().map(Program::getName).collect(Collectors.toList());
    for (String expectedName : expectedNames) {
      assertTrue(actualNames.contains(expectedName));
    }
  }

}
