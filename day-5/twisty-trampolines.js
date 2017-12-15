"use strict"

const fs = require('fs');

var TwistyTrampoline = function(jumpOffsets) {
  this.jumpOffsets = jumpOffsets;
  this.currentPosition = 0;
  this.stepCount = 0;
};

TwistyTrampoline.prototype.move = function() {
  var instruction = this.jumpOffsets[this.currentPosition];
  this.jumpOffsets[this.currentPosition]++;
  this.currentPosition += instruction;
  this.stepCount++;
};

TwistyTrampoline.prototype.getStepCountToEscape = function() {
  while (this.currentPosition >= 0 && this.currentPosition < this.jumpOffsets.length) {
    this.move();
  }
  return this.stepCount;
};

function main() {
  fs.readFile('./part1.txt', 'utf8', function(error, data) {
    var jumpOffsets = data.split('\n');
    jumpOffsets = jumpOffsets.map(function(str) {
      return parseInt(str);
    });
    console.log(new TwistyTrampoline(jumpOffsets).getStepCountToEscape());
  });
}

if (require.main === module) main();

module.exports = TwistyTrampoline;

