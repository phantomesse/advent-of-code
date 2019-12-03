import { getFuelRequired } from './solution';
import { expect } from 'chai';

describe('part 1', function() {
  it('mass 12 => fuel 2', function() {
    expect(getFuelRequired(12)).to.equal(2);
  });

  it('mass 14 => fuel 2', function() {
    expect(getFuelRequired(14)).to.equal(2);
  });

  it('mass 1969 => fuel 654', function() {
    expect(getFuelRequired(1969)).to.equal(654);
  });

  it('mass 100756 => fuel 33583', function() {
    expect(getFuelRequired(100756)).to.equal(33583);
  });
});

describe('part 2', function() {
  // TODO: write tests for part 2.
});
