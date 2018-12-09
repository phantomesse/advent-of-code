'use strict';

class Marbles {
  constructor() {
    this.currentNode = new MarbleNode(0);
    this.currentNode.next = this.currentNode;
    this.currentNode.prev = this.currentNode;
  }

  // Adds a marble to the next of the current node and sets the new marble
  // node as the current node.
  add(marble) {
    const node = new MarbleNode(marble);
    node.next = this.currentNode.next;
    node.prev = this.currentNode;
    this.currentNode.next.prev = node;
    this.currentNode.next = node;
    this.currentNode = node;
  }

  // Removes the current node and returns the marble.
  // Sets the next node as the current node.
  remove() {
    const marble = this.currentNode.marble;
    this.currentNode.next.prev = this.currentNode.prev;
    this.currentNode.prev.next = this.currentNode.next;
    this.currentNode = this.currentNode.next;
    return marble;
  }

  // Rotates the marble to the "next" count number of times.
  // If count < 0, then rotates "prev" count number of times.
  rotate(count) {
    while (count > 0) {
      this.currentNode = this.currentNode.next;
      count--;
    }
    while (count < 0) {
      this.currentNode = this.currentNode.prev;
      count++;
    }
  }

  toString() {
    // Find the node with 0.
    let node = this.currentNode;
    do {
      if (node.marble === 0) break;
      node = node.next;
    } while (node != this.currentNode);

    let str = '';
    let zeroNode = node;
    do {
      if (node === this.currentNode) {
        str += ` (${node}) `;
      } else {
        str += `  ${node}  `;
      }
      node = node.next;
    } while (node != zeroNode);

    return str;
  }
}

class MarbleNode {
  constructor(marble) {
    this.marble = marble;
    this.prev;
    this.next;
  }

  toString() {
    return (this.marble < 10 ? ' ' : '') + this.marble;
  }
}

module.exports.Marbles = Marbles;
