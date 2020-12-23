const { printPart1, printPart2 } = require('../utils/utils');

function part1(input, moveCount) {
  const cups = input.split('').map(number => parseInt(number));
  const smallestCup = Math.min(...cups);
  const largestCup = Math.max(...cups);
  let pointer = 0;

  for (let moveIndex = 0; moveIndex < moveCount; moveIndex++) {
    console.log(`\n-- move ${moveIndex + 1} --`);
    console.log(`cups: ${cups.join(' ')}`);
    let currentCup = cups[pointer];
    console.log('current cup: ' + currentCup);

    let pickedUpCups = cups.splice(pointer + 1, 3);
    while (pickedUpCups.length < 3) {
      pickedUpCups.push(cups.shift());
    }

    let destinationCup = currentCup;
    while (!cups.includes(destinationCup) || destinationCup === currentCup) {
      destinationCup =
        destinationCup === smallestCup ? largestCup : destinationCup - 1;
    }

    console.log('pick up: ' + pickedUpCups);
    console.log('destination: ' + destinationCup);
    cups.splice(cups.indexOf(destinationCup) + 1, 0, ...pickedUpCups);
    pointer = (cups.indexOf(currentCup) + 1) % cups.length;
  }
  console.log(`\n${cups.join(' ')}\n`);

  while (cups[0] !== 1) {
    cups.push(cups.shift());
  }
  cups.shift();
  return cups.join('');
}

function part2(input) {
  const cups = input.split('').map(number => parseInt(number));
  const smallestCup = Math.min(...cups);
  let largestCup = Math.max(...cups);
  for (let i = largestCup + 1; i <= 1000000; i++) {
    cups.push(i);
  }
  largestCup = cups.slice(-1)[0];

  let pointer = 0;
  for (let moveIndex = 0; moveIndex < 10000000; moveIndex++) {
    let currentCup = cups[pointer];

    let pickedUpCups = cups.splice(pointer + 1, 3);
    while (pickedUpCups.length < 3) {
      pickedUpCups.push(cups.shift());
    }

    let destinationCup = currentCup;
    while (!cups.includes(destinationCup) || destinationCup === currentCup) {
      destinationCup =
        destinationCup === smallestCup ? largestCup : destinationCup - 1;
    }

    cups.splice(cups.indexOf(destinationCup) + 1, 0, ...pickedUpCups);
    pointer = (cups.indexOf(currentCup) + 1) % cups.length;

    if (moveIndex % 1000 === 0) {
      console.log(`${(moveIndex / 10000000) * 100}% done`);
    }
  }
  return cups.join(' ');
}

// printPart1(part1('135468729', 100));
printPart2(part2('389125467'));
