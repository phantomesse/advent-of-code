import { readLines } from "../utils/read-input";
import { printPart1Output } from "../utils/print-output";

const MAX_INDEX = 99;
const START_INDEX = 50;

const instructions = readLines(__dirname);

let index = START_INDEX;
let indexWasZeroCount = 0;

for (const instruction of instructions) {
  const turnAmount = parseInt(instruction.slice(1), 10);

  if (instruction.startsWith("L")) {
    index = (index - turnAmount + MAX_INDEX + 1) % (MAX_INDEX + 1);
  }

  if (instruction.startsWith("R")) {
    index = (index + turnAmount) % (MAX_INDEX + 1);
  }

  if (index === 0) indexWasZeroCount++;
}
printPart1Output(indexWasZeroCount);
