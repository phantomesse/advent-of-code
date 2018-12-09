'use strict';

const Marbles = require('./marbles').Marbles;

class Game {
  constructor(input) {
    input = input.split(' ');

    const playerCount = parseInt(input[0]);
    this.players = []; // Index is player index and value is score.
    for (let i = 0; i < playerCount; i++) {
      this.players[i] = 0;
    }

    this.lastMarble = parseInt(input[input.length - 2]);
    this.marbles = new Marbles();
  }

  get playerCount() {
    return this.players.length;
  }

  get highScore() {
    let currentMarble = 0;
    let currentPlayerIndex = -1;

    while (currentMarble < this.lastMarble) {
      currentMarble++;
      currentPlayerIndex = (currentPlayerIndex + 1) % this.playerCount;

      if (currentMarble % 23 != 0) {
        this.marbles.rotate(1);
        this.marbles.add(currentMarble);
        continue;
      }

      // Current marble is a multiple of 23.
      this.marbles.rotate(-7);
      this.players[currentPlayerIndex] += currentMarble + this.marbles.remove();
    }

    return Math.max.apply(null, this.players);
  }
}

module.exports.Game = Game;
