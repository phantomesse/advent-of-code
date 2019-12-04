import { getShortestDistance, getFewestSteps } from './solution';
import { expect } from 'chai';

describe('part 1', function() {
  function test(instructions1, instructions2, expectedDistance): void {
    it(`${instructions1} x ${instructions2} => ${expectedDistance}`, function() {
      expect(getShortestDistance(instructions1, instructions2)).to.equal(
        expectedDistance
      );
    });
  }

  test('R8,U5,L5,D3', 'U7,R6,D4,L4', 6);
  test(
    'R75,D30,R83,U83,L12,D49,R71,U7,L72',
    'U62,R66,U55,R34,D71,R55,D58,R83',
    159
  );
  test(
    'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
    'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7',
    135
  );
});

describe('part 2', function() {
  function test(instructions1, instructions2, expectedDistance): void {
    it(`${instructions1} x ${instructions2} => ${expectedDistance}`, function() {
      expect(getFewestSteps(instructions1, instructions2)).to.equal(
        expectedDistance
      );
    });
  }

  test('R8,U5,L5,D3', 'U7,R6,D4,L4', 30);
  test(
    'R75,D30,R83,U83,L12,D49,R71,U7,L72',
    'U62,R66,U55,R34,D71,R55,D58,R83',
    610
  );
  test(
    'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
    'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7',
    410
  );
});
