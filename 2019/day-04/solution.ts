import { readFileSync } from 'fs';

export function meetsCriteria(passwordStr: string): boolean {
  let password = passwordStr.split('').map(number => parseInt(number, 10));
  if (password.length != 6) return false;

  // Two adjacent digits are the same and digits never decrease.
  let hasTwoAdjacentDigits = false;
  for (let i = 1; i < password.length; i++) {
    if (password[i] === password[i - 1]) {
      hasTwoAdjacentDigits = true;
    }
    if (password[i] < password[i - 1]) {
      return false;
    }
  }

  return hasTwoAdjacentDigits;
}

export function meetsCriteria2(passwordStr: string): boolean {
  let password = passwordStr.split('').map(number => parseInt(number, 10));
  if (password.length != 6) return false;

  // Two adjacent digits are the same and digits never decrease.
  let hasTwoAdjacentDigits = false;
  for (let i = 1; i < password.length; i++) {
    if (password[i] === password[i - 1]) {
      if (password.filter(number => number === password[i]).length == 2) {
        hasTwoAdjacentDigits = true;
      }
    }
    if (password[i] < password[i - 1]) {
      return false;
    }
  }

  return hasTwoAdjacentDigits;
}

function main() {
  // Part 1.
  let passwordCount = 0;
  for (var i = 124075; i <= 580769; i++) {
    if (meetsCriteria(`${i}`)) passwordCount++;
  }
  console.log(`part 1: ${passwordCount}`);

  // Part 2.
  passwordCount = 0;
  for (var i = 124075; i <= 580769; i++) {
    if (meetsCriteria2(`${i}`)) passwordCount++;
  }
  console.log(`part 2: ${passwordCount}`);
}

if (require.main === module) main();
