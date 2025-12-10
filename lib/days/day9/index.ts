import { eg, input } from './input';
import { cleanAndParse, combinationsOf, Coordinate, neighbours, orthogonalNeighbours } from '../../utils';
import { Day } from '..';

export const meta: Day['meta'] = {};


function parsePoints(src: string) {
  return cleanAndParse(src, (line) => {
    const [x, y] = line.split(",");
    return [parseInt(x, 10), parseInt(y, 10)];
  });
}

function getArea(a: Coordinate, b: Coordinate) {
  return (Math.abs(a[0] - b[0]) + 1) *
    (Math.abs(a[1] - b[1]) + 1);
}

function* pathSegments(points: Coordinate[]) {
  const { length } = points;
  for (let i = 0; i < length; i++) {
    yield [points[i], points[(i + 1) % length]];
  }
}

function checkFit(from: Coordinate, to: Coordinate, viz: string[][]) {
  // brute force check all cells in rectangle
  // acceptable because coordinate compression has made this small enough
  const [x1, y1] = from;
  const [x2, y2] = to;

  for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
    for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
      if (viz[y][x] === '.') {
        return false;
      }
    }
  }
  return true;
}


export function part1() {
  const points = parsePoints(input);
  let max = 0;

  for (const [a, b] of combinationsOf(points, 2)) {
    const area = getArea(a, b);
    max = Math.max(max, area);
  }

  return max;
}

export function part2() {
  const points = parsePoints(input);

  // Coordinate compression
  const uniqueXs = Array.from(new Set(points.map((p) => p[0]))).sort((a, b) => a - b);
  const uniqueYs = Array.from(new Set(points.map((p) => p[1]))).sort((a, b) => a - b);

  const pointToCompressedX = new Map(uniqueXs.map((x, i) => [x, i]));
  const pointToCompressedY = new Map(uniqueYs.map((y, i) => [y, i]));

  // dual purpose visualisation / occupancy grid
  const viz = Array(uniqueYs.length).fill(0).map(() => Array(uniqueXs.length).fill('.'));

  // draw the path
  for (const [from, to] of pathSegments(points)) {
    const x1 = pointToCompressedX.get(from[0])!;
    const y1 = pointToCompressedY.get(from[1])!;
    const x2 = pointToCompressedX.get(to[0])!;
    const y2 = pointToCompressedY.get(to[1])!;

    if (x1 === x2) {
      // vertical line
      const x = x1;
      const startY = Math.min(y1, y2);
      const endY = Math.max(y1, y2);

      for (let y = startY; y <= endY; y++) {
        viz[y][x] = '#';
      }
    }
    else {
      //horizontal line
      const y = y1;
      const startX = Math.min(x1, x2);
      const endX = Math.max(x1, x2);

      for (let x = startX; x <= endX; x++) {
        viz[y][x] = '#';
      }
    }
  }

  // flood fill the inside
  const floodQueue = new Set(["62,125"]); // visually chosen, the path is roughly a large diamond

  while (floodQueue.size > 0) {
    let next = "";

    for (next of floodQueue) {
      floodQueue.delete(next);
      break; // just get one.
    }

    const [x, y] = next.split(',').map(Number);
    viz[y][x] = '#'; // remember y is row

    for (const [nx, ny] of neighbours([x, y])) {
      if (viz[ny] && viz[ny][nx] === '.') {
        floodQueue.add([nx, ny].join(','));
      }
    }
  }

  // list all the candidate rectangles using part 1s logic...
  const candidateRectangles: [number, Coordinate, Coordinate][] = [];
  for (const [a, b] of combinationsOf(points, 2)) {
    const area = getArea(a, b);
    candidateRectangles.push([area,
      [pointToCompressedX.get(a[0])!, pointToCompressedY.get(a[1])!],
      [pointToCompressedX.get(b[0])!, pointToCompressedY.get(b[1])!]
    ]);
  }
  //...in descending order of area
  candidateRectangles.sort((a, b) => b[0] - a[0]);

  // check each one to see if it fits entirely within the filled area...
  for (const [area, from, to] of candidateRectangles) {
    let fits = checkFit(from, to, viz);

    if (fits) {
      // ...and return the area of the first that does.
      return area;
    }
  }

  // ...show the visualisation for debugging if no result found.
  return viz.map(r => r.join('')).join('\n');
}

export const answers = [
  4743645488,
  1529011204
];
