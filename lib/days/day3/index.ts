import { eg, input } from './input';
import { cleanAndParse, sumOf } from '../../utils';
import { Day } from '..';

export const meta: Day['meta'] = {};

function _findMax(numArray: number[], earliestIndex: number, remainingCount: number, foundArray: number[]) {
    const d1 = Math.max(...numArray.slice(earliestIndex, -remainingCount));
    const i1 = numArray.indexOf(d1, earliestIndex);

    foundArray.push(d1);

    if (remainingCount === 1) {
        foundArray.push(Math.max(...numArray.slice(i1 + 1)));

        return Number(foundArray.join(""));
    }

    return _findMax(numArray, i1 + 1, remainingCount - 1, foundArray);
}

function findMax(nString: string, digitCount: number) {
    const arr = Array.from(nString).map(Number);
    return _findMax(arr, 0, digitCount - 1, []);
}

export function part1() {
  const data = cleanAndParse(input, line => findMax(line, 2));

  return sumOf(data);
}

export function part2() {
  const data = cleanAndParse(input, line => findMax(line, 12));

  return sumOf(data);
}

export const answers = [
  17535,
  173577199527257
];
