'use strict';

const assert = require('assert');
const solution = require('./solution');

describe('Not Quite Lisp', function() {
  it('(()) and ()() both result in floor 0.', function() {
    assert.equal(solution.getFloor('(())'), 0);
    assert.equal(solution.getFloor('()()'), 0);
  });

  it('((( and (()(()( both result in floor 3.', function() {
    assert.equal(solution.getFloor('((('), 3);
    assert.equal(solution.getFloor('(()(()('), 3);
  });

  it('))((((( also results in floor 3.', function() {
    assert.equal(solution.getFloor('))((((('), 3);
  });

  it('()) and ))( both result in floor -1 (the first basement level).',
    function() {
      assert.equal(solution.getFloor('())'), -1);
      assert.equal(solution.getFloor('))('), -1);
    });

  it('))) and )())()) both result in floor -3.', function() {
    assert.equal(solution.getFloor(')))'), -3);
    assert.equal(solution.getFloor(')())())'), -3);
  });

  it(') causes him to enter the basement at character position 1.',
    function() {
      assert.equal(solution.getFirstBasementPosition(')'), 1);
    });

  it('()()) causes him to enter the basement at character position 5.',
    function() {
      assert.equal(solution.getFirstBasementPosition('()())'), 5);
    });
});
