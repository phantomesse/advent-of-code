const { assert } = require('console');

const input = '389125467';
const moveCount = 10000000;
const largestNumber = 1000000;
const debug = false;

class Node {
  constructor(number) {
    this.number = number;
    this.prev;
    this.next;
  }

  toString() {
    let numbers = [`(${this.number})`];
    let node = this.next;
    let counter = 5;
    while (node !== this && counter >= 0) {
      numbers.push(node.number);
      node = node.next;
      counter--;
    }
    counter = 10;
    node = this.prev;
    while (node !== this && counter >= 0) {
      numbers.unshift(node.number);
      node = node.prev;
      counter--;
    }
    return numbers.join(' ');
  }
}

const cups = input.split('').map(number => parseInt(number));

// Create linked list.
let rootNode = new Node(cups[0]);
let pointerNode = rootNode;
let smallestCup = rootNode;
let largestCup = rootNode;
let dictionary = [];
dictionary[rootNode.number] = rootNode;
for (let i = 1; i < cups.length; i++) {
  let number = cups[i];
  let node = new Node(number);
  if (number < smallestCup.number) smallestCup = node;
  if (number > largestCup.number) largestCup = node;
  node.prev = pointerNode;
  pointerNode.next = node;
  pointerNode = node;
  dictionary[number] = node;
}
for (let i = largestCup.number + 1; i <= largestNumber; i++) {
  let node = new Node(i);
  node.prev = pointerNode;
  pointerNode.next = node;
  pointerNode = node;
  dictionary[i] = node;
}
largestNode = pointerNode;
pointerNode.next = rootNode;
rootNode.prev = pointerNode;

// Check that we have every number to 1 million.
for (let i = 1; i <= largestNumber; i++) {
  assert(dictionary[i] !== undefined);
}

// Move.
let currentCup = rootNode;
for (let moveIndex = 0; moveIndex < moveCount; moveIndex++) {
  if (debug) {
    console.log(`\n-- move ${moveIndex + 1} --`);
    console.log(`cups: ${currentCup}`);
  }

  // Pick up the next 3 cups after the current cup.
  let pickedUpCups = [
    currentCup.next,
    currentCup.next.next,
    currentCup.next.next.next,
  ];
  if (debug) console.log(`pick up: ${pickedUpCups.map(cup => cup.number)}`);

  // Find the destination cup.
  let destinationCup =
    currentCup === smallestCup ? largestCup : dictionary[currentCup.number - 1];
  while (pickedUpCups.includes(destinationCup)) {
    destinationCup =
      destinationCup === smallestCup
        ? largestCup
        : (destinationCup = dictionary[destinationCup.number - 1]);
  }
  if (debug) console.log(`destination cup: ${destinationCup.number}`);

  // Remove the picked up cups from the cups.
  let firstPickedUpCup = pickedUpCups[0];
  let lastPickedUpCup = pickedUpCups.slice(-1)[0];
  let temp = lastPickedUpCup.next;
  currentCup.next = temp;
  temp.prev = currentCup;

  // Shift the picked up cups to after the destination cup.
  lastPickedUpCup.next = destinationCup.next;
  destinationCup.next.prev = lastPickedUpCup;
  destinationCup.next = firstPickedUpCup;
  firstPickedUpCup.prev = destinationCup;

  // Point to the next cup.
  currentCup = currentCup.next;
}

console.log(dictionary[1].toString());
console.log(dictionary[1].next.number);
console.log(dictionary[1].next.next.number);
console.log(dictionary[1].next.number * dictionary[1].next.next.number);
