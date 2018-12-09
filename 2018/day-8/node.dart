class Node {
  final int childNodeCount;
  final int metadataEntryCount;

  final childNodes = <Node>[];
  final metadataEntries = [];

  Node(this.childNodeCount, this.metadataEntryCount);

  int get inputLength {
    var length = 2 + metadataEntryCount;

    for (final child in childNodes) {
      length += child.inputLength;
    }

    return length;
  }

  int get value {
    if (childNodeCount == 0) {
      return metadataEntries.reduce((a, b) => a + b);
    }

    var sum = 0;
    final indices = metadataEntries
        .where((metadata) => metadata > 0 && metadata <= childNodeCount);
    for (final index in indices) {
      sum += childNodes[index - 1].value;
    }
    return sum;
  }

  @override
  String toString() {
    var str =
        'Node(childCount: $childNodeCount, metadataCount: $metadataEntryCount})';
    str += metadataEntries.toString();
    return str;
  }
}
