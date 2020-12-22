const fs = require('fs');

const input = fs
  .readFileSync('test-input.txt', 'utf-8')
  .trim()
  .split('\n')
  .map(line => parseInt(line));
console.log(input);
