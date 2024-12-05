import { part1, part2 } from '../utils/print-output.mjs';
import { readLines } from '../utils/read-input.mjs';

/**
 * @readonly
 * @enum {string}
 */
const Movement = {
  INCREASE: 'increase',
  DECREASE: 'decrease',
};

/**
 * @param {number[]} report
 * @returns {boolean} true if the report is safe, false if the report is unsafe
 */
function isSafe(report) {
  let movementTrend;

  for (let i = 0; i < report.length - 1; i++) {
    const level1 = report[i];
    const level2 = report[i + 1];
    const levelDiff = Math.abs(level2 - level1);
    if (levelDiff < 1 || levelDiff > 3) return false;

    const movement = level2 > level1 ? Movement.INCREASE : Movement.DECREASE;
    if (i === 0) {
      movementTrend = movement;
    }
    if (movementTrend !== movement) return false;
  }

  return true;
}

const reports = readLines().map(line =>
  line.split(' ').map(num => parseInt(num))
);

let safeReportCount = 0;
for (const report of reports) {
  if (isSafe(report)) safeReportCount++;
}
part1(safeReportCount);

safeReportCount = 0;
for (const report of reports) {
  if (isSafe(report)) {
    safeReportCount++;
    continue;
  }

  for (let i = 0; i < report.length; i++) {
    const newReport = [...report];
    newReport.splice(i, 1);
    if (isSafe(newReport)) {
      safeReportCount++;
      break;
    }
  }
}
part2(safeReportCount);
