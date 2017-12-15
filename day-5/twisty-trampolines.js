"use strict"

const fs = require('fs');

var TwistyTrampoline = function (jumpOffsets, offsetChangeFunction) {
  this.jumpOffsets = jumpOffsets;
  this.offsetChangeFunction = offsetChangeFunction || function (offset) {
    return offset + 1;
  };
  this.currentPosition = 0;
  this.stepCount = 0;
};

TwistyTrampoline.prototype.move = function () {
  var instruction = this.jumpOffsets[this.currentPosition];
  this.jumpOffsets[this.currentPosition] = this.offsetChangeFunction(instruction);
  this.currentPosition += instruction;
  this.stepCount++;
};

TwistyTrampoline.prototype.getStepCountToEscape = function () {
  while (this.currentPosition >= 0 && this.currentPosition < this.jumpOffsets.length) {
    this.move();
  }
  return this.stepCount;
};

function main() {
  fs.readFile('./part1.txt', 'utf8', function (error, data) {
    var jumpOffsets = data.split('\n');
    jumpOffsets = jumpOffsets.map(function (str) {
      return parseInt(str);
    });
    console.log('Part 1: ' + new TwistyTrampoline(jumpOffsets).getStepCountToEscape());
  });

  fs.readFile('./part2.txt', 'utf8', function (error, data) {
    var jumpOffsets = data.split('\n');
    jumpOffsets = jumpOffsets.map(function (str) {
      return parseInt(str);
    });

    console.log('Part 2: ' + new TwistyTrampoline(jumpOffsets, function (offset) {
      if (offset >= 3) return offset - 1;
      return offset + 1;
    }).getStepCountToEscape());
  });
}

if (require.main === module) main();

module.exports = TwistyTrampoline;

