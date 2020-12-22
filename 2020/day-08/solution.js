const fs = require('fs');

class Instruction {
  constructor(instruction) {
    this.operation = instruction.split(' ')[0];
    this.argument = parseInt(instruction.split(' ')[1]);
  }
}

const instructions = fs
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n')
  .map(line => new Instruction(line));

function part1(instructions) {
  const calledInstructions = [];
  let pointer = 0;
  let accumulator = 0;
  while (
    !calledInstructions.includes(instructions[pointer]) &&
    pointer < instructions.length
  ) {
    const instruction = instructions[pointer];
    calledInstructions.push(instruction);
    switch (instruction.operation) {
      case 'nop':
        pointer++;
        break;
      case 'acc':
        accumulator += instruction.argument;
        pointer++;
        break;
      case 'jmp':
        pointer += instruction.argument;
        break;
    }
  }
  return accumulator;
}

function hasInfiniteLoop(instructions) {
  const calledInstructions = [];
  let pointer = 0;
  while (
    !calledInstructions.includes(instructions[pointer]) &&
    pointer < instructions.length
  ) {
    const instruction = instructions[pointer];
    calledInstructions.push(instruction);
    switch (instruction.operation) {
      case 'nop':
        pointer++;
        break;
      case 'acc':
        pointer++;
        break;
      case 'jmp':
        pointer += instruction.argument;
        break;
    }
  }
  return pointer < instructions.length;
}

function part2(instructions) {
  let pointer = -1;
  let newInstructions;
  do {
    pointer++;
    newInstructions = [...instructions];
    const instruction = instructions[pointer];
    if (instruction.operation === 'acc') continue;
    const newOperation = instruction.operation === 'nop' ? 'jmp' : 'nop';
    const newInstruction = new Instruction(
      `${newOperation} ${instruction.argument}`
    );
    newInstructions[pointer] = newInstruction;
  } while (
    hasInfiniteLoop(newInstructions) &&
    pointer < instructions.length - 1
  );
  return part1(newInstructions);
}

console.log(`Part 1: ${part1(instructions)}`);
console.log(`Part 2: ${part2(instructions)}`);
