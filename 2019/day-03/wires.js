'use strict';

const fs = require('fs');

const _centralPortSymbol = 'o';
const _emptySymbol = '.';
const _crossedWiresSymbol = 'X';

class Wires {
  constructor(instructionStrs) {
    this.instructions = instructionStrs.map(
      instructionStr => new Instructions(instructionStr)
    );
    this.matrix = Array.from({ length: 1100 }, () =>
      Array.from({ length: 1100 }, () => _emptySymbol)
    );
    this.centralPortLocation = {
      rowIndex: this.matrix.length / 2,
      columnIndex: this.matrix[0].length / 2
    };
    this.matrix[this.centralPortLocation.rowIndex][
      this.centralPortLocation.columnIndex
    ] = _centralPortSymbol;
    this.crossedWiresLocations = [];

    for (let instructions of this.instructions) {
      let rowIndex = this.centralPortLocation.rowIndex;
      let columnIndex = this.centralPortLocation.columnIndex;
      for (let instruction of instructions.instructions) {
        if (this.matrix[rowIndex][columnIndex] != _centralPortSymbol) {
          this.matrix[rowIndex][columnIndex] = '+';
        }
        let steps = instruction.steps;
        switch (instruction.direction) {
          case 'U': // Up.
            if (rowIndex - steps < 0) {
              let rowCount = steps - rowIndex;
              this._addRowsAboveCentralPort(rowCount);
              rowIndex += rowCount;
            }
            for (var i = 0; i < steps; i++) {
              rowIndex--;
              if (this.matrix[rowIndex][columnIndex] == _emptySymbol) {
                this.matrix[rowIndex][columnIndex] = '|';
              } else if (
                this.matrix[rowIndex][columnIndex] != _centralPortSymbol
              ) {
                this.matrix[rowIndex][columnIndex] = _crossedWiresSymbol;
                this.crossedWiresLocations.push({
                  rowIndex: rowIndex,
                  columnIndex: columnIndex
                });
              }
            }
            break;
          case 'D': // Down.
            if (this.matrix.length < rowIndex + steps) {
              this._addRowsBelowCentralPort(
                rowIndex + steps - this.matrix.length + 1
              );
            }
            for (var i = 0; i < steps; i++) {
              rowIndex++;
              if (this.matrix[rowIndex][columnIndex] == _emptySymbol) {
                this.matrix[rowIndex][columnIndex] = '|';
              } else if (
                this.matrix[rowIndex][columnIndex] != _centralPortSymbol
              ) {
                this.matrix[rowIndex][columnIndex] = _crossedWiresSymbol;
                this.crossedWiresLocations.push({
                  rowIndex: rowIndex,
                  columnIndex: columnIndex
                });
              }
            }
            break;
          case 'L': // Left.
            if (columnIndex - steps < 0) {
              let columnCount = steps - columnIndex;
              this._addColumnsLeftOfCentralPort(columnCount);
              columnIndex += columnCount;
            }
            for (var i = 0; i < steps; i++) {
              columnIndex--;
              if (this.matrix[rowIndex][columnIndex] == _emptySymbol) {
                this.matrix[rowIndex][columnIndex] = '-';
              } else if (
                this.matrix[rowIndex][columnIndex] != _centralPortSymbol
              ) {
                this.matrix[rowIndex][columnIndex] = _crossedWiresSymbol;
                this.crossedWiresLocations.push({
                  rowIndex: rowIndex,
                  columnIndex: columnIndex
                });
              }
            }
            break;
          case 'R': // Right.
            if (this.matrix[0].length < columnIndex + steps) {
              this._addColumnsRightOfCentralPort(
                columnIndex + steps - this.matrix[0].length + 1
              );
            }
            for (var i = 0; i < steps; i++) {
              columnIndex++;
              if (this.matrix[rowIndex][columnIndex] == _emptySymbol) {
                this.matrix[rowIndex][columnIndex] = '-';
              } else if (
                this.matrix[rowIndex][columnIndex] != _centralPortSymbol
              ) {
                this.matrix[rowIndex][columnIndex] = _crossedWiresSymbol;
                this.crossedWiresLocations.push({
                  rowIndex: rowIndex,
                  columnIndex: columnIndex
                });
              }
            }
            break;
        }
      }
    }
  }

  draw() {
    for (var rowIndex = 0; rowIndex < this.matrix.length; rowIndex++) {
      console.log(this.matrix[rowIndex].join(''));
    }
  }

  get closestCrossedWiresDistance() {
    let smallestDistance = Infinity;
    for (let location of this.crossedWiresLocations) {
      let distance =
        Math.abs(location.rowIndex - this.centralPortLocation.rowIndex) +
        Math.abs(location.columnIndex - this.centralPortLocation.columnIndex);
      if (distance < smallestDistance) {
        smallestDistance = distance;
      }
    }
    return smallestDistance;
  }

  _addRowsAboveCentralPort(rowCount) {
    const columnCount = this.matrix[0].length;
    for (let i = 0; i < rowCount; i++) {
      let row = Array.from({ length: columnCount }, () => _emptySymbol);
      this.matrix.unshift(row);
    }
    this.centralPortLocation.rowIndex += rowCount;
  }

  _addRowsBelowCentralPort(rowCount) {
    const columnCount = this.matrix[0].length;
    for (let i = 0; i < rowCount; i++) {
      let row = Array.from({ length: columnCount }, () => _emptySymbol);
      this.matrix.push(row);
    }
  }

  _addColumnsLeftOfCentralPort(columnCount) {
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < columnCount; j++) {
        this.matrix[i].unshift(_emptySymbol);
      }
    }
    this.centralPortLocation.columnIndex += columnCount;
  }

  _addColumnsRightOfCentralPort(columnCount) {
    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < columnCount; j++) {
        this.matrix[i].push(_emptySymbol);
      }
    }
  }
}

class Instructions {
  constructor(instructionStr) {
    this.instructions = instructionStr.split(',').map(function(instruction) {
      return {
        direction: instruction.charAt(0),
        steps: parseInt(instruction.substr(1), 10)
      };
    });
  }
}

// let wires = new Wires(['R8,U5,L5,D3', 'U7,R6,D4,L4']);
// wires.draw();
// console.log(wires.closestCrossedWiresDistance);

// wires = new Wires([
//   'R75,D30,R83,U83,L12,D49,R71,U7,L72',
//   'U62,R66,U55,R34,D71,R55,D58,R83'
// ]);
// console.log(wires.closestCrossedWiresDistance);

let wires = new Wires([
  'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
  'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'
]);
console.log(wires.closestCrossedWiresDistance);

// let input = fs.readFileSync('input.txt', 'utf8');
// wires = new Wires(input.split('\n').filter(line => line.length > 0));
// console.log(wires.closestCrossedWiresDistance);
