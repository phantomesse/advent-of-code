'use strict';

const assert = require('assert');
const solution = require('./solution');

let wire1 = new solution.Wire('R8,U5,L5,D3');
wire1.draw();
console.log(wire1.centralPortLocation);
console.log();

let wire2 = new solution.Wire('U7,R6,D4,L4');
wire2.draw();
console.log(wire2.centralPortLocation);
console.log();
