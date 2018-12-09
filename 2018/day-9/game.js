'use strict';

const Turn = require('./turn').Turn;
const Player = require('./player').Player;

class Game {
  constructor(input) {
    input = input.split(' ');

    const playerCount = parseInt(input[0]);
    this.players = [];
    for (let i = 0; i < playerCount; i++) {
      this.players.push(new Player(i));
    }

    this.turns = [];
    this.lastMarble = parseInt(input.slice(-2)[0]);

    // Play the game.
    this._playGame();
  }

  _playGame() {
    let currentPlayerIndex = this.players.length - 2;
    let currentMarble = -1;

    while (this.turns.length === 0 || currentMarble < this.lastMarble) {
      currentPlayerIndex = (currentPlayerIndex + 1) % this.players.length;
      const currentPlayer = this.players[currentPlayerIndex];

      currentMarble++;

      let turn;

      if (this.turns.length === 0) {
        turn = new Turn(0, [], 0, currentMarble, currentPlayer);
        this.turns.push(turn);
        // console.log(`${turn}`);
        continue;
      }

      const lastTurn = this._lastTurn;
      const lastCurrentMarbleIndex = lastTurn.marbles.indexOf(lastTurn.currentMarble);
      turn = new Turn(lastTurn.index + 1, lastTurn.marbles,
        lastCurrentMarbleIndex, currentMarble, currentPlayer);
      this.turns.push(turn);

      // console.log(`\n${currentPlayer}`);
      // console.log(`${turn}`);
    }
  }

  get _lastTurn() {
    return this.turns[this.turns.length - 1];
  }

  get playerCount() {
    return this.players.length;
  }

  get highScore() {
    // for (const player of this.players) {
    //   console.log(player);
    // }

    return Math.max.apply(undefined, this.players.map(player => player.score));
  }
}

module.exports.Game = Game;
