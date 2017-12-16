import org.junit.Test;

import java.io.IOException;

import static org.junit.Assert.assertEquals;

public class RecursiveCircusTest {
  @Test
  public void testBottomProgram() throws IOException {
    RecursiveCircus circus = new RecursiveCircus("../day-7/test/test.txt");
    assertEquals("tknk", circus.getRootProgramName());
  }
}
