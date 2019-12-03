'use strict';

const fs = require('fs');

class Wires {}

class Wire {
  constructor(line) {
    this.instructions = line.split(',');
    this.matrix = [['o']];

    let rowIndex = 0;
    let columnIndex = 0;
    for (let instruction of this.instructions) {
      let direction = instruction.charAt(0);
      let steps = parseInt(instruction.substr(1), 10);
      if (this.matrix[rowIndex][columnIndex] != 'o') {
        this.matrix[rowIndex][columnIndex] = '+';
      }
      switch (direction) {
        case 'R': // Right
          if (this.matrix[0].length < columnIndex + steps) {
            this.addColumnsRightOfCentralPort(
              columnIndex + steps - this.matrix[0].length + 1
            );
          }
          for (var i = 0; i < steps; i++) {
            columnIndex++;
            this.matrix[rowIndex][columnIndex] = '-';
          }
          break;
        case 'U': // Up
          if (rowIndex - steps < 0) {
            let rowCount = steps - rowIndex;
            this.addRowsAboveCentralPort(rowCount);
            rowIndex += rowCount;
          }
          for (var i = 0; i < steps; i++) {
            rowIndex--;
            this.matrix[rowIndex][columnIndex] = '|';
          }
          break;
        case 'L': // Left
          if (columnIndex - steps < 0) {
            let columnCount = steps - columnIndex;
            this.addColumnsLeftOfCentralPort(columnCount);
            columnIndex += columnCount;
          }
          for (var i = 0; i < steps; i++) {
            columnIndex--;
            this.matrix[rowIndex][columnIndex] = '-';
          }
          break;
        case 'D': // Down
          if (this.matrix.length < rowIndex + steps) {
            this.addRowsBelowCentralPort(
              rowIndex + steps - this.matrix.length + 1
            );
          }
          for (var i = 0; i < steps; i++) {
            rowIndex++;
            this.matrix[rowIndex][columnIndex] = '|';
          }
          break;
      }
    }
  }

  get centralPortLocation() {
    for (var i = 0; i < this.matrix.length; i++) {
      for (var j = 0; j < this.matrix[i].length; j++) {
        if (this.matrix[i][j] == 'o') {
          return { rowIndex: i, columnIndex: j };
        }
      }
    }
  }

  draw() {
    for (var rowIndex = 0; rowIndex < this.matrix.length; rowIndex++) {
      console.log(this.matrix[rowIndex].join(''));
    }
  }

  addRowsAboveCentralPort(rowCount) {
    const columnCount = this.matrix[0].length;
    for (var i = 0; i < rowCount; i++) {
      let row = [];
      for (var j = 0; j < columnCount; j++) {
        row.push('.');
      }
      this.matrix.unshift(row);
    }
  }

  addRowsBelowCentralPort(rowCount) {
    const columnCount = this.matrix[0].length;
    for (var i = 0; i < rowCount; i++) {
      let row = [];
      for (var j = 0; j < columnCount; j++) {
        row.push('.');
      }
      this.matrix.push(row);
    }
  }

  addColumnsLeftOfCentralPort(columnCount) {
    for (var i = 0; i < this.matrix.length; i++) {
      for (var j = 0; j < columnCount; j++) {
        this.matrix[i].unshift('.');
      }
    }
  }

  addColumnsRightOfCentralPort(columnCount) {
    for (var i = 0; i < this.matrix.length; i++) {
      for (var j = 0; j < columnCount; j++) {
        this.matrix[i].push('.');
      }
    }
  }
}

function getClosestIntersection(wire1, wire2) {}

function main() {
  let input = fs.readFileSync('input.txt', 'utf8');
  let wires = input
    .split('\n')
    .filter(line => line.length > 0)
    .map(line => new Wire(line));
  wires[0].draw();
  wires[2].draw();
}

if (require.main === module) main();

module.exports.Wire = Wire;
