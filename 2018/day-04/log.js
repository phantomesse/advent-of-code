'use strict';

class Log {
  constructor(log) {
    const timestamp = log.substring(1, log.indexOf(']')).split(' ');
    this.date = timestamp[0];

    const time = timestamp[1].split(':');
    this.time = new Date(this.date);
    this.time.setHours(time[0]);
    this.time.setMinutes(time[1]);
    this.event = log.substring(log.indexOf(']') + 2);
  }

  get isGuardBeginsShift() {
    return this.event.includes('Guard');
  }

  get guardId() {
    return this.event.substring(this.event.indexOf('#'),
      this.event.indexOf(' ', this.event.indexOf('#')), );
  }
}

module.exports.Log = Log;
