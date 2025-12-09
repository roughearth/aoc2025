import { eg, input } from './input';
import { cleanAndParse, Coordinate, pairs } from '../../utils';
import { Day } from '..';

export const meta: Day['meta'] = {
  manualStart: false
};

function distance(a: Coordinate, b: Coordinate) {
  return Math.sqrt(
    Math.pow(a[0] - b[0], 2) +
    Math.pow(a[1] - b[1], 2) +
    Math.pow(a[2] - b[2], 2)
  );
}

function parseInput(rawInput: string) {
  const points = rawInput
    .split("\n")
    .map((line) => line.split(",").map(Number));

  const remainingPoints = new Set<string>(points.map((p) => p.join()));

  const distanceMap = Array.from(pairs(points.length))
    .map(([i, j]) => [
      distance(points[i], points[j]),
      points[i].join(),
      points[j].join(),
    ] as [number, string, string])
    .sort(([a], [b]) => a - b);

  const t2 = performance.now();

  const circuitMap = new Map<string, Set<string>>();


  return {
    // points,
    distanceMap,
    remainingPoints,
    circuitMap,
  };
}
type ParsedInput = ReturnType<typeof parseInput>;
type DistanceMap = ParsedInput['distanceMap'];
type RemainingPoints = ParsedInput['remainingPoints'];
type CircuitMap = ParsedInput['circuitMap'];

function processLoop(distanceMap: DistanceMap, remainingPoints: RemainingPoints, circuitMap: CircuitMap) {
  const [, a, b] = distanceMap.shift()!;

  let foundCircuitA = circuitMap.get(a);
  let foundCircuitB = circuitMap.get(b);

  if (foundCircuitA && foundCircuitB) {
    if (foundCircuitA !== foundCircuitB) {
      for (const fb of foundCircuitB) {
        foundCircuitA.add(fb);
      }
      for (const fa of foundCircuitA) {
        circuitMap.set(fa, foundCircuitA);
      }
    }
  } else if (foundCircuitA) {
    foundCircuitA.add(b);
    circuitMap.set(b, foundCircuitA);
  } else if (foundCircuitB) {
    foundCircuitB.add(a);
    circuitMap.set(a, foundCircuitB);
  } else {
    const foundCircuit = new Set([a, b]);
    circuitMap.set(a, foundCircuit);
    circuitMap.set(b, foundCircuit);
  }

  remainingPoints.delete(a);
  remainingPoints.delete(b);

  return { a, b };
}

export function part1() {
  const { distanceMap, remainingPoints, circuitMap } = parseInput(input);

  for (const [dist, a, b] of distanceMap.slice(0, 1000)) {
    processLoop(distanceMap, remainingPoints, circuitMap);
  }

  const circuits = Array.from(new Set(circuitMap.values()))
    .sort((a, b) => b.size - a.size)
    .slice(0, 3)
    .map((s) => s.size);


  return circuits[0] * circuits[1] * circuits[2];
}

export function part2() {
  const { distanceMap, remainingPoints, circuitMap } = parseInput(input);

  let result: ReturnType<typeof processLoop>;

  while (remainingPoints.size) {
    result = processLoop(distanceMap, remainingPoints, circuitMap);
  }

  return parseInt(result!.a, 10) * parseInt(result!.b, 10);
}

export const answers = [
  26400,
  8199963486
];
