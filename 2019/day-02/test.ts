import { runIntcode } from './solution';
import { expect } from 'chai';

describe('part 1', function() {
  it('[1,9,10,3,2,3,11,0,99,30,40,50] => [3500,9,10,70,2,3,11,0,99,30,40,50]', function() {
    expect(runIntcode('1,9,10,3,2,3,11,0,99,30,40,50')).to.equal(
      '3500,9,10,70,2,3,11,0,99,30,40,50'
    );
  });

  it('[1,0,0,0,99] => [2,0,0,0,99]', function() {
    expect(runIntcode('1,0,0,0,99')).to.equal('2,0,0,0,99');
  });

  it('[2,3,0,3,99] => [2,3,0,6,99]', function() {
    expect(runIntcode('2,3,0,3,99')).to.equal('2,3,0,6,99');
  });

  it('[2,4,4,5,99,0] => [2,4,4,5,99,9801]', function() {
    expect(runIntcode('2,4,4,5,99,0')).to.equal('2,4,4,5,99,9801');
  });

  it('[1,1,1,4,99,5,6,0,99] => [30,1,1,4,2,5,6,0,99]', function() {
    expect(runIntcode('1,1,1,4,99,5,6,0,99')).to.equal('30,1,1,4,2,5,6,0,99');
  });
});

describe('part 2', function() {});
