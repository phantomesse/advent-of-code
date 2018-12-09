'use strict';

const assert = require('assert');
const solution = require('./solution');

describe('Part 1', function() {
  it('input 1', function() {
    assert.equal(solution.part1('part1-test-input1.txt'), 3);
  });

  it('input 2', function() {
    assert.equal(solution.part1('part1-test-input2.txt'), 0);
  });

  it('input 3', function() {
    assert.equal(solution.part1('part1-test-input3.txt'), -6);
  });
});

describe('Part 2', function() {
  it('input 1', function() {
    assert.equal(solution.part2('part2-test-input1.txt'), 0);
  });

  it('input 2', function() {
    assert.equal(solution.part2('part2-test-input2.txt'), 10);
  });

  it('input 3', function() {
    assert.equal(solution.part2('part2-test-input3.txt'), 5);
  });

  it('input 4', function() {
    assert.equal(solution.part2('part2-test-input4.txt'), 14);
  });
});
