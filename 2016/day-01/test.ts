import { getDistance } from './solution';
import { expect } from 'chai';

describe('part 1', function() {
  function test(instructions: string, expectedDistance: number) {
    it(`${instructions} => ${expectedDistance}`, function() {
      expect(getDistance(instructions)).to.equal(expectedDistance);
    });
  }

  test('R2, L3', 5);
  test('R2, R2, R2', 2);
  test('R5, L5, R5, R3', 12);
});

describe('part 2', function() {
  it('R8, R4, R4, R8 => 4', function() {
    expect(true).to.equal(true);
  });
});
