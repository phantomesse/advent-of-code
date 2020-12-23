const { readNumbers, numberSort, printPart2 } = require('../utils/utils');

function getPotentialAdapters(adapters, device) {
  let potentialAdapters = [];
  for (const adapter of adapters) {
    if (device - adapter >= 1 && device - adapter <= 3) {
      potentialAdapters.push(adapter);
    }
  }
  return potentialAdapters;
}

let cachedAdapterToArrangementCount = {};

function getArrangementCount(adapterToPotentialAdaptersMap, adapter) {
  if (adapter in cachedAdapterToArrangementCount) {
    return cachedAdapterToArrangementCount[adapter];
  }

  let potentialAdapters = adapterToPotentialAdaptersMap[adapter];
  if (potentialAdapters.length === 0) return 1;
  let arrangementCount = 0;
  for (let potentialAdapter of potentialAdapters) {
    arrangementCount += getArrangementCount(
      adapterToPotentialAdaptersMap,
      potentialAdapter
    );
  }
  cachedAdapterToArrangementCount[adapter] = arrangementCount;
  return arrangementCount;
}

const adapters = readNumbers();
adapters.sort(numberSort);
adapters.unshift(0);
adapters.push(adapters.slice(-1)[0] + 3);

const adapterToPotentialAdaptersMap = {};
for (const adapter of adapters) {
  adapterToPotentialAdaptersMap[adapter] = getPotentialAdapters(
    adapters,
    adapter
  );
}

printPart2(
  getArrangementCount(adapterToPotentialAdaptersMap, adapters.slice(-1)[0])
);
