public class Bank {
  private int blockCount;

  Bank(int blockCount) {
    this.blockCount = blockCount;
  }

  public int getBlockCount() {
    return blockCount;
  }

  public int clear() {
    int blockCount = this.blockCount;
    this.blockCount = 0;
    return blockCount;
  }

  public void addBlock() {
    this.blockCount++;
  }
}
