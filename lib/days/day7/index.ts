import { eg, input } from './input';
import { cleanAndParse, sumOf } from '../../utils';
import { Day } from '..';

export const meta: Day['meta'] = {};

function parseBeams(input: string) {
  const splitter = input.split('\n');
  const finalRowIndex = splitter.length - 1;

  const beams = new Map([[splitter[0].indexOf('S'), 1]]);
  let splitCount = 0;


  for (let currentRow = 1; currentRow < finalRowIndex; currentRow++) {
    for (const [col, count] of beams) {
      const row = splitter[currentRow];
      if (row[col] === '^') {
        beams.delete(col);
        beams.set(col - 1, count + (beams.get(col - 1) || 0));
        beams.set(col + 1, count + (beams.get(col + 1) || 0));
        splitCount++;
      }
    }
  }

  return { beams, splitCount };
}

export function part1() {
  const { splitCount } = parseBeams(input);

  return splitCount;
}

export function part2() {
  const { beams } = parseBeams(input);

  return sumOf(Array.from(beams.values()));
}

export const answers = [
  1656,
  76624086587804
];
