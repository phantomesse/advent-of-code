import { meetsCriteria, meetsCriteria2 } from './solution';
import { expect } from 'chai';

describe('part 1', function() {
  it('111111 meets criteria', function() {
    expect(meetsCriteria('111111')).to.equal(true);
  });

  it("223450 doesn't meet criteria", function() {
    expect(meetsCriteria('223450')).to.equal(false);
  });

  it("123789 doesn't meet criteria", function() {
    expect(meetsCriteria('123789')).to.equal(false);
  });
});

describe('part 2', function() {
  it('112233 meets criteria', function() {
    expect(meetsCriteria2('112233')).to.equal(true);
  });

  it("123444 doesn't meets criteria", function() {
    expect(meetsCriteria2('123444')).to.equal(false);
  });

  it('111122 meets criteria', function() {
    expect(meetsCriteria2('111122')).to.equal(true);
  });
});
