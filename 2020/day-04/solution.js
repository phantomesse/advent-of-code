const fs = require('fs');

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const eyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

class PassportData {
  constructor(data) {
    const lines = data.split(/[ \n]+/);
    for (const line of lines) {
      const pair = line.split(':');
      this[pair[0]] = pair[1];
    }
  }
}

function hasRequiredFields(data) {
  for (const field of requiredFields) {
    if (!(field in data)) return false;
  }
  return true;
}

function hasRequiredFieldsAndValidValues(data) {
  if (!hasRequiredFields(data)) return false;

  const birthYear = parseInt(data.byr);
  if (birthYear < 1920 || birthYear > 2002) return false;

  const issueYear = parseInt(data.iyr);
  if (issueYear < 2010 || issueYear > 2020) return false;

  const expirationYear = parseInt(data.eyr);
  if (expirationYear < 2020 || expirationYear > 2030) return false;

  const height = data.hgt;
  const heightMetric = height.slice(-2);
  const heightValue = parseInt(height.substr(0, height.length - 2));
  switch (heightMetric) {
    case 'cm':
      if (heightValue < 150 || heightValue > 193) return false;
      break;
    case 'in':
      if (heightValue < 59 || heightValue > 76) return false;
      break;
    default:
      return false;
  }

  const hairColor = data.hcl;
  let match = hairColor.match(/#[a-f0-9]{6}/);
  if (!(match && match[0] === hairColor)) return false;

  const eyeColor = data.ecl;
  if (!eyeColors.includes(eyeColor)) return false;

  match = data.pid.match(/[0-9]{9}/);
  return match && data.pid === match[0];
}

const passportData = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
  .split('\n\n')
  .filter(block => block.length > 0)
  .map(block => new PassportData(block.trim()));

function getValidCount(passportData, validationFn) {
  return passportData.filter(data => validationFn(data)).length;
}

// Part 1
// console.log(getValidCount(passportData, hasRequiredFields));

// Part 2
console.log(getValidCount(passportData, hasRequiredFieldsAndValidValues));
