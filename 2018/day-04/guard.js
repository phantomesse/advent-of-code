'use strict';

const Log = require('./log').Log;

class Guard {
  constructor(id) {
    this.id = id;
    this.logs = [];
  }

  addLog(log) {
    this.logs.push(log);
  }

  get totalTimeAsleep() {
    let totalTimeAsleep = 0;

    for (let i = 0; i < this.logs.length; i += 2) {
      const fallsAsleepLog = this.logs[i];
      const wakesUpLog = this.logs[i + 1];
      const timeAsleep = (wakesUpLog.time.getTime() - fallsAsleepLog.time.getTime()) /
        1000 / 60;
      totalTimeAsleep += timeAsleep;
    }

    return totalTimeAsleep;
  }

  // Returns {minute: minute, times: times}
  get mostAsleepMinute() {
    let minuteToTimeAsleep = {};
    for (let i = 0; i < 60; i++) {
      minuteToTimeAsleep[i] = 0;
    }

    for (let i = 0; i < this.logs.length; i += 2) {
      const fallsAsleepLog = this.logs[i];
      const wakesUpLog = this.logs[i + 1];

      let asleepTime = fallsAsleepLog.time;
      while (asleepTime < wakesUpLog.time) {
        const minute = asleepTime.getMinutes();
        minuteToTimeAsleep[minute]++;
        asleepTime = new Date(asleepTime.valueOf() + (60 * 1000));
      }
    }

    let mostAsleepMinute;
    let mostTimes = 0;
    for (const minute in minuteToTimeAsleep) {
      const times = minuteToTimeAsleep[minute];
      if (times >= mostTimes) {
        mostTimes = times;
        mostAsleepMinute = minute;
      }
    }

    return {
      minute: mostAsleepMinute,
      times: mostTimes
    };
  }
}

module.exports.Guard = Guard;
