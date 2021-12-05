const utils = require('../utils/utils');

class Entry {
  onlyHorzVert;
  x1;
  y1;
  x2;
  y2;

  constructor(line, onlyHorzVert) {
    this.onlyHorzVert = onlyHorzVert;
    const coordinates = line
      .split(' -> ')
      .map(coords => coords.split(',').map(number => parseInt(number)));
    this.x1 = coordinates[0][0];
    this.y1 = coordinates[0][1];
    this.x2 = coordinates[1][0];
    this.y2 = coordinates[1][1];
  }

  get maxX() {
    return Math.max(this.x1, this.x2);
  }

  get maxY() {
    return Math.max(this.y1, this.y2);
  }

  get coveredPoints() {
    if (this.x1 === this.x2) {
      // Horizontal
      const points = [];
      for (let y = Math.min(this.y1, this.y2); y <= this.maxY; y++) {
        points.push({ x: this.x1, y: y });
      }
      return points;
    }
    if (this.y1 === this.y2) {
      // Vertical
      const points = [];
      for (let x = Math.min(this.x1, this.x2); x <= this.maxX; x++) {
        points.push({ x: x, y: this.y1 });
      }
      return points;
    }
    if (this.onlyHorzVert) {
      return [];
    }

    // Consider 45deg angles
    const xDiff = this.x2 - this.x1;
    const yDiff = this.y2 - this.y1;
    if (Math.abs(xDiff) === Math.abs(yDiff)) {
      const diff = { x: xDiff / Math.abs(xDiff), y: yDiff / Math.abs(yDiff) };
      const points = [];
      for (let i = 0; i <= Math.abs(xDiff); i++) {
        points.push({ x: this.x1 + diff.x * i, y: this.y1 + diff.y * i });
      }
      return points;
    }
    return [];
  }

  toString() {
    return `(${this.x1},${this.y1} -> ${this.x2},${this.y2})`;
  }
}

class Graph {
  matrix;

  constructor(entries) {
    const maxX = Math.max(...entries.map(entry => entry.maxX));
    const maxY = Math.max(...entries.map(entry => entry.maxY));

    this.matrix = Array.from(Array(maxY + 1), _ =>
      Array.from(Array(maxX + 1), _ => 0)
    );

    for (const entry of entries) {
      const points = entry.coveredPoints;
      for (const point of points) {
        this.matrix[point.y][point.x]++;
      }
    }
  }

  get dangerousAreaCount() {
    let dangerousAreaCount = 0;
    for (let y = 0; y < this.matrix.length; y++) {
      for (let x = 0; x < this.matrix[y].length; x++) {
        if (this.matrix[y][x] > 1) dangerousAreaCount++;
      }
    }
    return dangerousAreaCount;
  }

  toString() {
    return this.matrix
      .map(line => line.map(num => (num === 0 ? '.' : num)).join(''))
      .join('\n');
  }
}

let entries = utils.readLines().map(line => new Entry(line, true));
let graph = new Graph(entries);
utils.printPart1(graph.dangerousAreaCount);

entries = utils.readLines().map(line => new Entry(line, false));
graph = new Graph(entries);
utils.printPart2(graph.dangerousAreaCount);
