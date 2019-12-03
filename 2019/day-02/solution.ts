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
let memory;

// Part 1.
