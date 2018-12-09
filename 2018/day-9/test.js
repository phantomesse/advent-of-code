'use strict';

const assert = require('assert');
const Game = require('./game').Game;

describe('', function() {
  it('9 players; last marble is worth 25: high score is 32', function() {
    const game = new Game(
      '9 players; last marble is worth 25 points'
    );
    assert.equal(game.playerCount, 9);
    assert.equal(game.lastMarble, 25);
    assert.equal(game.highScore, 32);
  });

  it('10 players; last marble is worth 1618 points: high score is 8317',
    function() {
      const game = new Game(
        '10 players; last marble is worth 1618 points'
      );
      assert.equal(game.playerCount, 10);
      assert.equal(game.lastMarble, 1618);
      assert.equal(game.highScore, 8317);
    });

  it('13 players; last marble is worth 7999 points: high score is 146373',
    function() {
      const game = new Game(
        '13 players; last marble is worth 7999 points'
      );
      assert.equal(game.playerCount, 13);
      assert.equal(game.lastMarble, 7999);
      assert.equal(game.highScore, 146373);
    });

  it('17 players; last marble is worth 1104 points: high score is 2764',
    function() {
      const game = new Game(
        '17 players; last marble is worth 1104 points'
      );
      assert.equal(game.playerCount, 17);
      assert.equal(game.lastMarble, 1104);
      assert.equal(game.highScore, 2764);
    });

  it('21 players; last marble is worth 6111 points: high score is 54718',
    function() {
      const game = new Game(
        '21 players; last marble is worth 6111 points'
      );
      assert.equal(game.playerCount, 21);
      assert.equal(game.lastMarble, 6111);
      assert.equal(game.highScore, 54718);
    });

  it('30 players; last marble is worth 5807 points: high score is 37305',
    function() {
      const game = new Game(
        '30 players; last marble is worth 5807 points'
      );
      assert.equal(game.playerCount, 30);
      assert.equal(game.lastMarble, 5807);
      assert.equal(game.highScore, 37305);
    });
});
