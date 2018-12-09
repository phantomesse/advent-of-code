import 'dart:io';

import 'node.dart';

class Tree {
  List<Node> nodes;
  Node node;

  Tree(String inputFilePath) {
    final inputs = new File(inputFilePath)
        .readAsStringSync()
        .split(' ')
        .map(int.parse)
        .toList();

    // Print.
    this.node = getNode(inputs);
//    printNodes(this.node);

    print(getValue(this.node));

//    print(getMetadataSum(this.node));
  }

  int getValue(Node node) {

    return node.value;
  }

  void printNodes(Node node) {
    print(node);
    for (final child in node.childNodes) {
      printNodes(child);
    }
  }

  int getMetadataSum(Node node) {
    int sum = node.metadataEntries.reduce((a, b) => a + b);

    for (final child in node.childNodes) {
      sum += getMetadataSum(child);
    }

    return sum;
  }

  Node getNode(List<int> inputs) {
    var childNodeCount = inputs.removeAt(0);
    var metadataEntryCount = inputs.removeAt(0);
    final node = Node(childNodeCount, metadataEntryCount);

    // Add child nodes.
    int i = 0;
    while (node.childNodes.length < node.childNodeCount) {
      final childNode = getNode(inputs.sublist(i).toList());
      node.childNodes.add(childNode);
      i += childNode.inputLength;
    }

    // Add metadata.
    for (int j = 0; j < metadataEntryCount; j++) {
      node.metadataEntries.add(inputs[i + j]);
    }

    return node;
  }
}
