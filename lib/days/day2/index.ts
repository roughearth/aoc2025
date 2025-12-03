import { eg, input } from './input';
import { cleanAndParse } from '../../utils';
import { Day } from '..';

export const meta: Day['meta'] = {};

function parse(raw: string) {
  return raw.split(',').map((part) => {
      const [start, end] = part.split('-').map(Number);
      return { start, end };
    });
}

function testPt1(num: number) {
  const s = `${num}`;

  return /^(\d+)\1$/.test(s);
}

function testPt2(num: number) {
  const s = `${num}`;

  return /^(\d+)\1+$/.test(s);
}

export function part1() {
  const data = parse(input);
  return data.reduce((sum, { start, end }) => {
    for (let i = start; i <= end; i++) {
      if (testPt1(i)) {
        sum += i;
      }
    }

    return sum;
  }, 0);
}

export function part2() {
  const data = parse(input);
  return data.reduce((sum, { start, end }) => {
    for (let i = start; i <= end; i++) {
      if (testPt2(i)) {
        sum += i;
      }
    }

    return sum;
  }, 0);
}

export const answers = [
  52316131093,
  69564213293
];
