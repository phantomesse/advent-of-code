import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class AreaTest {
  private static String input = "0 2 7 0";
  private Area area;

  @Before
  public void setup() {
    area = new Area(input);
  }

  @Test
  public void testInstantiation() {
    assertEquals(input, area.toString());
  }

  @Test
  public void testGetLargestBank() {
    assertEquals(2, area.getLargestBankIndex());
  }

  @Test
  public void testRedistribution() {
    area.redistributeBlocks();
    assertEquals("2 4 1 2", area.toString());
    assertEquals(1, area.getRedistributionCycleCount());

    area.redistributeBlocks();
    assertEquals("3 1 2 3", area.toString());
    assertEquals(2, area.getRedistributionCycleCount());

    area.redistributeBlocks();
    assertEquals("0 2 3 4", area.toString());
    assertEquals(3, area.getRedistributionCycleCount());

    area.redistributeBlocks();
    assertEquals("1 3 4 1", area.toString());
    assertEquals(4, area.getRedistributionCycleCount());

    area.redistributeBlocks();
    assertEquals("2 4 1 2", area.toString());
    assertEquals(5, area.getRedistributionCycleCount());
  }

  @Test
  public void testInfiniteLoopCycleCount() {
    assertEquals(5, area.getInfiniteLoopCycleCount());
  }

  @Test
  public void testSecondInfiniteLoopCycleCount() {
    assertEquals(4, area.getSecondInfiniteLoopCycleCount());
  }
}
