'use strict';

const Player = require('./player').Player;

class Turn {
  constructor(index, marbles, lastCurrentMarbleIndex, currentMarble, player) {
    this.index = index;
    this.marbles = marbles;

    if (currentMarble > 0 && currentMarble % 23 === 0) {
      player.score += currentMarble;

      let takeIndex = (lastCurrentMarbleIndex - 7 + this.marbles.length) %
        this.marbles.length;
      player.score += this.marbles.splice(takeIndex, 1)[0];

      this.currentMarble = this.marbles[takeIndex % this.marbles.length];
    } else {
      const currentMarbleIndex = (lastCurrentMarbleIndex + 2) % this.marbles
        .length;
      if (currentMarble <= 1) {
        this.marbles.push(currentMarble);
      } else {
        this.marbles.splice(currentMarbleIndex, 0, currentMarble);
      }
      this.currentMarble = currentMarble;
    }
  }

  toString() {
    let str = `[${this.index < 10 ? ' ' : ''}${this.index}]  `;

    // Get index of 0.
    const zeroIndex = this.marbles.indexOf(0);

    for (let i = zeroIndex; i < this.marbles.length; i++) {
      str += this._toString(this.marbles[i]);
    }
    for (let i = 0; i < zeroIndex; i++) {
      str += this._toString(this.marbles[i]);
    }

    return str;
  }

  _toString(marble) {
    let str = marble >= 10 ? `${marble}` : ` ${marble}`;

    if (marble === this.currentMarble) {
      str = `(${str})`;
    } else {
      str = ` ${str} `;
    }

    return ` ${str} `;
  }
}

module.exports.Turn = Turn;
