'use strict';

const assert = require('assert');
const solution = require('./solution');

describe('Letter Counts', function() {
  it('abcdef contains no letters that appear exactly two or three times.',
    function() {
      assert.deepEqual(solution.getLetterCounts('abcdef'), {});
    });

  it('bababc contains two a and three b, so it counts for both.', function() {
    assert.deepEqual(solution.getLetterCounts('bababc'), {
      two: 'a',
      three: 'b'
    });

  });

  it('abbcde contains two b, but no letter appears exactly three times.',
    function() {
      assert.deepEqual(solution.getLetterCounts('abbcde'), {
        two: 'b'
      });
    });

  it('abcccd contains three c, but no letter appears exactly two times.',
    function() {
      assert.deepEqual(solution.getLetterCounts('abcccd'), {
        three: 'c'
      });
    });

  it('aabcdd contains two a and two d, but it only counts once.', function() {
    assert.deepEqual(solution.getLetterCounts('aabcdd'), {
      two: 'd',
    });
  });

  it('abcdee contains two e.', function() {
    assert.deepEqual(solution.getLetterCounts('abcdee'), {
      two: 'e',
    });
  });

  it('ababab contains three a and three b, but it only counts once.',
    function() {
      assert.deepEqual(solution.getLetterCounts('ababab'), {
        three: 'b'
      });
    });

  it('checksum', function() {
    assert.equal(solution.part1('part1-test-input.txt'), 12);
  });

  it('common letters between two correct box ids', function() {
    assert.equal(solution.part2('part2-test-input.txt'), 'fgij');
  });
});
