import { readFileSync } from "fs";

/**
 * Reads input from the command line arg file name and returns it as an array of
 * lines.
 *
 * @param directory - The directory of the input file
 * @returns The content of the input file as an array of lines
 */
export function readLines(directory: string): string[] {
  const input = readInput(directory);
  return input.split("\n").filter((line) => line.trim() !== "");
}

/**
 * Reads input from the command line arg file name and returns it as a string.
 *
 * @param directory - The directory of the input file
 * @returns The content of the input file as a string
 */
export function readInput(directory: string): string {
  const fileName = `${directory}/${_getFileNameFromArgs()}`;
  return readFileSync(fileName, "utf-8");
}

function _getFileNameFromArgs() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    throw new Error("No input file specified as a command line argument.");
  }
  return args[0];
}
