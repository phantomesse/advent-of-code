'use strict';

class Player {
  constructor(index) {
    this.index = index;
    this.score = 0;
  }

  toString() {
    return `Player ${this.index} with and score ${this.score}`;
  }
}

module.exports.Player = Player;
