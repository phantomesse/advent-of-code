const utils = require('../utils/utils');

const binaries = utils.readLines();

let gammaRate = '',
  epsilonRate = '';
for (let position = 0; position < binaries[0].length; position++) {
  gammaRate += getGammaRateBit(binaries, position);
  epsilonRate += getEpsilonRateBit(binaries, position);
}

utils.printPart1(parseInt(gammaRate, 2) * parseInt(epsilonRate, 2));

let generatorBinaries = [...binaries];
let scrubberBinaries = [...binaries];
for (let position = 0; position < binaries[0].length; position++) {
  const gammaRateBit = getGammaRateBit(generatorBinaries, position);
  const epsilonRateBit = getEpsilonRateBit(scrubberBinaries, position);
  if (generatorBinaries.length > 1) {
    generatorBinaries = generatorBinaries.filter(
      binary => binary[position] === `${gammaRateBit}`
    );
  }
  if (scrubberBinaries.length > 1) {
    scrubberBinaries = scrubberBinaries.filter(
      binary => binary[position] === `${epsilonRateBit}`
    );
  }
}
utils.printPart2(
  parseInt(generatorBinaries, 2) * parseInt(scrubberBinaries, 2)
);

// Returns the bit that is most present in a given position.
function getGammaRateBit(binaries, position) {
  const bitCounts = getBitCounts(binaries, position);
  return bitCounts.zero > bitCounts.one ? 0 : 1;
}

// Returns the bit that is least present in a given position.
function getEpsilonRateBit(binaries, position) {
  const bitCounts = getBitCounts(binaries, position);
  return bitCounts.one < bitCounts.zero ? 1 : 0;
}

function getBitCounts(binaries, position) {
  let zeroCount = 0,
    oneCount = 0;
  for (const binary of binaries) {
    binary[position] === '0' ? zeroCount++ : oneCount++;
  }
  return { zero: zeroCount, one: oneCount };
}
