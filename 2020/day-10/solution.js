const { readNumbers, numberSort, printPart1 } = require('../utils/utils');

const adapters = readNumbers();
adapters.sort(numberSort);
adapters.unshift(0);
adapters.push(adapters.slice(-1)[0] + 3);
const differenceToCountMap = {};
for (let i = 1; i < adapters.length; i++) {
  const difference = adapters[i] - adapters[i - 1];
  if (difference in differenceToCountMap) {
    differenceToCountMap[difference]++;
  } else {
    differenceToCountMap[difference] = 1;
  }
}
printPart1(differenceToCountMap[1] * differenceToCountMap[3]);
