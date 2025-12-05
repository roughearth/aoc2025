import { eg, input } from './input';
import { cleanAndParse } from '../../utils';
import { Day } from '..';

export const meta: Day['meta'] = {};


function parseData(input: string) {
  const ranges: number[][] = [];
  const ids: number[] = [];

  cleanAndParse(input)
    .map((line) => {
      const numbers = line.split("-").map(Number);

      if (numbers.length === 2) {
        ranges.push(numbers);
      } else if (numbers.length === 1) {
        ids.push(numbers[0]);
      }
    });

  return { ranges, ids };
}

export function part1() {
  const { ranges, ids } = parseData(input);

  const { length } = ids.filter((id) => {
    for (const [min, max] of ranges) {
      if (id >= min && id <= max) {
        return true;
      }
    }

    return false;
  });

  return length;
}

export function part2() {
  const { ranges } = parseData(input);

  const combined = ranges
    .sort(([aMin], [bMin]) => {
      return aMin - bMin;
    })
    .reduce((acc, [rangeMin, rangeMax]) => {
      const overlapsOrJoins = acc.find(([accMin, accMax]) => {
        return accMin <= rangeMax + 1 && accMax >= rangeMin - 1;
      });

      if (overlapsOrJoins) {
        overlapsOrJoins[0] = Math.min(overlapsOrJoins[0], rangeMin);
        overlapsOrJoins[1] = Math.max(overlapsOrJoins[1], rangeMax);
      } else {
        acc.push([rangeMin, rangeMax]);
      }

      return acc;
    }, [] as number[][]);

  const total = combined.reduce(
    (total, [min, max]) => total + (max - min + 1),
    0
  );

  return total
};

export const answers = [
  888,
  344378119285354
];
