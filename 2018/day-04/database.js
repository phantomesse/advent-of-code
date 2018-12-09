'use strict';

const fs = require('fs');
const Guard = require('./guard').Guard;
const Log = require('./log').Log;

class Database {
  constructor(inputFilePath) {
    this.guards = {};

    const logs = fs.readFileSync(inputFilePath, 'utf8').split('\n');
    let currentGuardId;
    for (const logStr of logs) {
      const log = new Log(logStr);

      if (log.isGuardBeginsShift) {
        currentGuardId = log.guardId;
        if (!(currentGuardId in this.guards)) {
          this.guards[currentGuardId] = new Guard(currentGuardId);
        }
        continue;
      }

      this.guards[currentGuardId].addLog(log);
    }
  }
}

module.exports.Database = Database;
