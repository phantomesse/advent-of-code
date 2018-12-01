import java.io.FileReader;
import java.io.IOException;
import java.util.HashSet;
import java.util.Scanner;
import java.util.Set;

public class Area {
  private final Bank[] banks;
  private Set<String> configurationHistory;
  private int redistributionCycleCount;

  Area(String input) {
    banks = convertInputToBanks(input);
    configurationHistory = new HashSet<>();
    configurationHistory.add(toString());
    redistributionCycleCount = 0;
  }

  /**
   * Find the bank with the most blocks.
   */
  public int getLargestBankIndex() {
    int largestBankIndex = 0;
    for (int i = 1; i < banks.length; i++) {
      if (banks[i].getBlockCount() > banks[largestBankIndex].getBlockCount()) {
        largestBankIndex = i;
      }
    }
    return largestBankIndex;
  }

  /**
   * Remove all blocks from largest bank and redistribute the blocks.
   */
  public void redistributeBlocks() {
    int largestBankIndex = getLargestBankIndex();

    int blocks = banks[largestBankIndex].clear();
    int bankIndex = (largestBankIndex + 1) % banks.length;
    do {
      banks[bankIndex].addBlock();
      blocks--;
      bankIndex = (bankIndex + 1) % banks.length;
    } while (blocks > 0);

    redistributionCycleCount++;
    configurationHistory.add(toString());
  }

  public int getRedistributionCycleCount() {
    return redistributionCycleCount;
  }

  public int getInfiniteLoopCycleCount() {
    int setLength;
    do {
      setLength = configurationHistory.size();
      redistributeBlocks();
    } while (setLength != configurationHistory.size());
    return redistributionCycleCount;
  }

  public int getSecondInfiniteLoopCycleCount() {
    int firstInfiniteLoopCycleCount = getInfiniteLoopCycleCount();
    String infiniteConfiguration = toString();

    do {
      redistributeBlocks();
    } while (!toString().equals(infiniteConfiguration));

    return redistributionCycleCount - firstInfiniteLoopCycleCount;
  }

  private static Bank[] convertInputToBanks(String input) {
    String[] inputArray = input.split("\\s+");
    Bank[] banks = new Bank[inputArray.length];
    for (int i = 0; i < inputArray.length; i++) {
      int blockCount = Integer.parseInt(inputArray[i]);
      banks[i] = new Bank(blockCount);
    }
    return banks;
  }

  @Override
  public String toString() {
    StringBuilder stringBuilder = new StringBuilder();
    for (Bank bank : banks) {
      stringBuilder.append(" ").append(bank.getBlockCount());
    }
    return stringBuilder.substring(1);
  }

  public static void main(String[] args) throws IOException {
    Area area = new Area(readFile("part1.txt"));
    System.out.println("Part 1: " + area.getInfiniteLoopCycleCount());

    area = new Area(readFile("part2.txt"));
    System.out.println("Part 2: " + area.getSecondInfiniteLoopCycleCount());
  }

  private static String readFile(String fileName) throws  IOException{
    Scanner in = new Scanner(new FileReader("day-6/src/" + fileName));
    StringBuilder stringBuilder = new StringBuilder();
    while (in.hasNext()) {
      stringBuilder.append(in.next()).append(" ");
    }
    in.close();
    return stringBuilder.toString();
  }
}
