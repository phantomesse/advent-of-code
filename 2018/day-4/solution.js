'use strict';

const fs = require('fs');
const Database = require('./database').Database;

function part1(inputFilePath) {
  const database = new Database(inputFilePath);

  let mostAsleepGuardId;
  let mostTimeAsleep = 0;
  for (const guardId in database.guards) {
    const totalTimeAsleep = database.guards[guardId].totalTimeAsleep;
    if (totalTimeAsleep > mostTimeAsleep) {
      mostTimeAsleep = totalTimeAsleep;
      mostAsleepGuardId = guardId;
    }
  }

  return parseInt(mostAsleepGuardId.substring(1)) * database.guards[
    mostAsleepGuardId].mostAsleepMinute.minute;
}

function part2(inputFilePath) {
  const database = new Database(inputFilePath);

  let mostAsleepGuardId;
  let mostAsleepMinute = {
    minute: 0,
    times: 0
  };
  for (const guardId in database.guards) {
    const minute = database.guards[guardId].mostAsleepMinute;
    if (minute.times > mostAsleepMinute.times) {
      mostAsleepGuardId = guardId;
      mostAsleepMinute = minute;
    }
  }

  return parseInt(mostAsleepGuardId.substring(1)) * mostAsleepMinute.minute;
}

function main() {
  console.log('Part 1: ' + part1('input.txt'));
  console.log('Part 2: ' + part2('input.txt'));
}

if (require.main === module) main();

module.exports.part1 = part1;
module.exports.part2 = part2;
