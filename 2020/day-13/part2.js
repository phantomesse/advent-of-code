const { readLines, printPart2 } = require('../utils/utils');

function getEarliestTimestamp(input, minTimestamp = 100) {
  console.log('min timestamp is ' + minTimestamp);
  const buses = getBuses(input);
  let increment = buses.filter(bus => bus !== 'x')[0];
  let timestamp = Math.max(Math.floor(minTimestamp / increment), 1) * increment;
  while (true) {
    let foundEarliestTimestamp = true;
    for (let i = 0; i < buses.length; i++) {
      if (buses[i] === 'x') continue;
      console.log('checking ' + buses[i] + ' at ' + (timestamp + i));
      if ((timestamp + i) % buses[i] !== 0) {
        foundEarliestTimestamp = false;
        break;
      }
    }
    if (foundEarliestTimestamp) return timestamp;
    timestamp += increment;
    console.log();
  }
}

function printBusSchedule(input, earliestTimestamp, rowCount) {
  function getFixedColumnStr(msg, columnCount = 8) {
    while (msg.length < columnCount) msg += ' ';
    return msg;
  }

  const buses = getBuses(input);

  console.log(
    getFixedColumnStr('time', 10) +
      buses.map(bus => getFixedColumnStr(`bus ${bus}`)).join('')
  );

  for (
    let i = earliestTimestamp - Math.ceil(rowCount / 2);
    i < earliestTimestamp + Math.ceil(rowCount / 2);
    i++
  ) {
    let line = getFixedColumnStr(`${i}`, 10);
    for (const bus of buses) {
      line += getFixedColumnStr(bus === 'x' ? '_' : i % bus === 0 ? 'D' : '.');
    }

    if (i >= earliestTimestamp && i < earliestTimestamp + buses.length) {
      console.log(`\x1b[34m${line}\x1b[0m`);
    } else {
      console.log(line);
    }
  }
}

function getBuses(input) {
  return input.split(',').map(bus => (bus === 'x' ? 'x' : parseInt(bus)));
}

function test(input, expectedOutput) {
  const output = getEarliestTimestamp(input);
  if (output !== expectedOutput) {
    console.log(
      `${input} should occur at ${expectedOutput} but occured at ${output}`
    );
    printBusSchedule(input, output, 10);
  }
}

const input = readLines()[1];
printPart2(getEarliestTimestamp(input, 100000000000000));
printBusSchedule(input, getEarliestTimestamp(input), input.length);

test('17,x,13,19', 3417);
test('67,7,59,61', 754018);
test('67,x,7,59,61', 779210);
test('67,7,x,59,61', 1261476);
test('1789,37,47,1889', 1202161486);
