import { readFileSync } from 'fs';

export function runIntcode(memory: string): string {
  return _convertMemoryToString(_runIntcode(_convertMemoryToArray(memory)));
}

function _runIntcode(
  memory: number[],
  instructionPointer: number = 0
): number[] {
  let opcode = memory[instructionPointer];
  if (opcode === 99) return memory;

  let noun = memory[memory[instructionPointer + 1]];
  let verb = memory[memory[instructionPointer + 2]];
  let outputAddress = memory[instructionPointer + 3];
  switch (opcode) {
    case 1:
      memory[outputAddress] = noun + verb;
      break;
    case 2:
      memory[outputAddress] = noun * verb;
      break;
  }

  return _runIntcode(memory, instructionPointer + 4);
}

function _convertMemoryToArray(memory: string): number[] {
  return memory.split(',').map((value: string) => parseInt(value, 10));
}

function _convertMemoryToString(memory: number[]): string {
  return memory.join(',');
}

// Get memory.
let memoryStr = readFileSync('input.txt', 'utf8');
let memory = _convertMemoryToArray(memoryStr);
memory[1] = 12;
memory[2] = 2;

// Part 1.
console.log(`part 1: ${_runIntcode(memory)[0]}`);

// Part 2.
let noun = 0,
  verb = 0,
  output = 0;
while (output !== 19690720 && noun < 100 && verb < 100) {
  if (noun === 99) {
    verb++;
    noun = 0;
  } else {
    noun++;
  }
  let memory = _convertMemoryToArray(memoryStr);
  memory[1] = noun;
  memory[2] = verb;
  output = _runIntcode(memory)[0];
}
console.log(`part 2: ${100 * noun + verb}`);
