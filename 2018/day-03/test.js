'use strict';

const assert = require('assert');
const Claim = require('./claim').Claim;
const Fabric = require('./fabric').Fabric;

describe('Claim', function() {
  before(function() {
    const input = [
      '#1 @ 1,3: 4x4',
      '#2 @ 3,1: 4x4',
      '#3 @ 5,5: 2x2'
    ];
    const claims = input.map(input => new Claim(input));
    this.fabric = new Fabric(claims);
  });

  it('overlapping fabric', function() {
    assert.equal(this.fabric.overlappingSquareCount, 4);
  });

  it('intact claim', function() {
    assert.equal(this.fabric.intactClaimId, 3);
  });
});
