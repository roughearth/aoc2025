import { eg, input } from './input';
import { cleanAndParse, Coordinate, coordinates, neighbours, SafetyNet, simpleRange } from '../../utils';
import { Day } from '..';

export const meta: Day['meta'] = {};

function parseInput(input: string) {
  const grid = cleanAndParse(input, l => Array.from(l));
  const width = grid[0].length;
  const height = grid.length;

  const range = simpleRange([height, width]);

  const rolls = new Set<Coordinate>();
  for (const [row, col] of coordinates(range)) {
    if (grid[row][col] === '@') {
      rolls.add([row, col]);
    }
  }

  return { grid, width, height, range, rolls };
}

function getAccessibleRolls(grid: string[][], rolls: Set<Coordinate>, range: [number, number][]) {
  const accessibleRolls = [];

  for (const roll of rolls) {
    const [pointRow, pointCol] = roll;
    const adjacentRolls = Array.from(neighbours([pointRow, pointCol], range))
      .filter(([nRow, nCol]) => grid[nRow][nCol] === '@').length;

    if (adjacentRolls < 4) {
      accessibleRolls.push(roll);
    }
  }

  return accessibleRolls;
}

export function part1() {
  const { grid, rolls, range } = parseInput(input);

  return getAccessibleRolls(grid, rolls, range).length;
}

export function part2(safetyNet: SafetyNet) {
  const { grid, rolls, range } = parseInput(input);
  let removableRolls = 0;

  while (safetyNet.isSafe()) {
    const accessibleRolls = getAccessibleRolls(grid, rolls, range);
    removableRolls += accessibleRolls.length;

    if (accessibleRolls.length === 0) {
      return removableRolls;
    }

    for (const roll of accessibleRolls) {
      const [row, col] = roll;
      grid[row][col] = '.';
      rolls.delete(roll);
    }
  }

  return -1;
}

export const answers = [
  1416,
  9086
];
