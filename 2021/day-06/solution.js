const utils = require('../utils/utils');

class Fish {
  timer;
  nextFish;

  constructor(timer) {
    this.timer = timer;
  }
}

class Ocean {
  rootFish;
  lastFish;
  fishCount;

  constructor(timers) {
    for (const timer of timers) {
      this.addFish(new Fish(timer));
    }
  }

  addFish(fish) {
    if (!this.rootFish) {
      this.rootFish = fish;
      this.lastFish = fish;
      this.fishCount = 1;
      return;
    }
    this.lastFish.nextFish = fish;
    this.lastFish = fish;
    this.fishCount++;
  }

  elapseDay() {
    let currentFish = this.rootFish;
    let fishToAddCount = 0;
    while (currentFish) {
      if (currentFish.timer === 0) {
        currentFish.timer = 6;
        fishToAddCount++;
      } else {
        currentFish.timer--;
      }
      currentFish = currentFish.nextFish;
    }
    for (let i = 0; i < fishToAddCount; i++) {
      this.addFish(new Fish(8));
    }
  }

  toString() {
    let str = '';
    let currentFish = this.rootFish;
    while (currentFish) {
      str += ',' + currentFish.timer;
      currentFish = currentFish.nextFish;
    }
    return str.substr(1);
  }
}

const timers = utils
  .readInput()
  .split(',')
  .map(timer => parseInt(timer));
const ocean = new Ocean(timers);
for (let i = 1; i <= 80; i++) {
  ocean.elapseDay();
}
console.log(ocean.fishCount);
