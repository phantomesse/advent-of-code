"use strict";

var assert = require('assert');
var TwistyTrampoline = require('./twisty-trampolines');

describe('TwistyTrampoline', function () {
  var trampoline = new TwistyTrampoline([0, 3, 0, 1, -3]);

  it('before we have taken any steps', function () {
    assert.deepEqual(trampoline.jumpOffsets, [0, 3, 0, 1, -3]);
    assert.equal(trampoline.currentPosition, 0);
    assert.equal(trampoline.stepCount, 0);
  });

  it('jump with offset 0 (that is, don\'t jump at all). Fortunately, the instruction is then incremented to 1', function () {
    trampoline.move();
    assert.deepEqual(trampoline.jumpOffsets, [1, 3, 0, 1, -3]);
    assert.equal(trampoline.currentPosition, 0);
    assert.equal(trampoline.stepCount, 1);
  });

  it('step forward because of the instruction we just modified. The first instruction is incremented again, now to 2', function () {
    trampoline.move();
    assert.deepEqual(trampoline.jumpOffsets, [2, 3, 0, 1, -3]);
    assert.equal(trampoline.currentPosition, 1);
    assert.equal(trampoline.stepCount, 2);
  });

  it('jump all the way to the end; leave a 4 behind', function () {
    trampoline.move();
    assert.deepEqual(trampoline.jumpOffsets, [2, 4, 0, 1, -3]);
    assert.equal(trampoline.currentPosition, 4);
    assert.equal(trampoline.stepCount, 3);
  });

  it('go back to where we just were; increment -3 to -2', function () {
    trampoline.move();
    assert.deepEqual(trampoline.jumpOffsets, [2, 4, 0, 1, -2]);
    assert.equal(trampoline.currentPosition, 1);
    assert.equal(trampoline.stepCount, 4);
  });

  it('jump 4 steps forward, escaping the maze', function () {
    trampoline.move();
    assert.deepEqual(trampoline.jumpOffsets, [2, 5, 0, 1, -2]);
    assert(trampoline.currentPosition < 0 || trampoline.currentPosition >= trampoline.jumpOffsets.length);
    assert.equal(trampoline.stepCount, 5);
  });
});

describe('Escape TwistyTrampoline', function() {
  var trampoline = new TwistyTrampoline([0, 3, 0, 1, -3]);

  it('escapes the trampoline in 5 steps', function() {
    assert.equal(trampoline.getStepCountToEscape(), 5);
  });
});

describe('Escape TwistyTrampoline custom offset function', function() {
  var trampoline = new TwistyTrampoline([0, 3, 0, 1, -3], function(offset) {
    if (offset >= 3) return offset - 1;
    return offset + 1;
  });

  it('escapes the trampoline in 10 steps', function() {
    assert.equal(trampoline.getStepCountToEscape(), 10);
    assert.deepEqual(trampoline.jumpOffsets, [2, 3, 2, 3, -1]);
  });
});
