import { getFuelRequired, getTotalFuelRequired } from './solution';
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
  it('mass 14 => total fuel 2', function() {
    expect(getTotalFuelRequired(14)).to.equal(2);
  });

  it('mass 1969 => total fuel 966', function() {
    expect(getTotalFuelRequired(1969)).to.equal(966);
  });

  it('mass 100756 => total fuel 50346', function() {
    expect(getTotalFuelRequired(100756)).to.equal(50346);
  });
});
