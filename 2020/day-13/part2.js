const { readLines, printPart2 } = require('../utils/utils');

function getEarliestTimestamp(input, minTimestamp = 100) {
  const buses = getBuses(input);
  const largestBusId = Math.max(...buses.filter(bus => bus !== 'x'));
  const largestBusIndex = buses.indexOf(largestBusId);
  console.log(largestBusId + ' is at ' + largestBusIndex);
  let timestamp =
    (Math.floor(minTimestamp / largestBusId) + 1) * largestBusId -
    largestBusIndex;
  let foundEarliestTimestamp;
  do {
    foundEarliestTimestamp = true;
    for (let i = 0; i < buses.length; i++) {
      if (buses[i] === 'x') continue;
      console.log('checking ' + buses[i] + ' at ' + (timestamp + i));
      if ((timestamp + i) % buses[i] !== 0) {
        foundEarliestTimestamp = false;
        break;
      }
    }
    timestamp += largestBusId;
  } while (!foundEarliestTimestamp);
  return timestamp;
}

function getBuses(input) {
  return input.split(',').map(bus => (bus === 'x' ? 'x' : parseInt(bus)));
}

const input = readLines('test-input.txt')[1];
printPart2(getEarliestTimestamp(input));
