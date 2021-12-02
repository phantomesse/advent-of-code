const utils = require('../utils/utils');

const measurements = utils.readNumbers();
const getIncreases = measurements =>
  measurements
    .map((value, index) => value - measurements[index - 1])
    .filter(difference => difference > 0).length;
utils.printPart1(getIncreases(measurements));

const sums = measurements
  .map(
    (value, index) => value + measurements[index - 1] + measurements[index - 2]
  )
  .slice(2);
utils.printPart2(getIncreases(sums));
