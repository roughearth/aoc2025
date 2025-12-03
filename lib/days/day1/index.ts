import { eg, input } from './input';
import { cleanAndParse } from '../../utils';
import { Day } from '..';

export const meta: Day['meta'] = {};

export function part1() {
  const data = cleanAndParse(input, line => {
    const dir = line[0] === "L" ? -1 : 1;
    const dist = Number(line.slice(1));
    return dir * dist;
  });

  let ct = 0;
  let pos = 50;

  for (const d of data) {
    pos = (pos + 100 + (d % 100)) % 100;

    if (pos === 0) {
      ct++;
    }
  }

  return ct;
}

export function part2() {
    const data = cleanAndParse(input, line => {
    const dir = line[0] === "L" ? -1 : 1;
    const dist = Number(line.slice(1));
    return dir * dist;
  });

  let ct = 0;
  let pos = 50;

  for (const d of data) {
    const fullRevolutions = Math.floor(Math.abs(d) / 100);
    const finalMove = d % 100; // yes it can be negative
    const nextPos = pos + finalMove;
    ct += fullRevolutions;

    if (
      d < 0 // moving left
      && pos !== 0 // but not already at 0
      && nextPos < 0 // crossed 0
    ) {
      ct++;
    }

    if (
      d > 0 // moving right
      && pos !== 0 // but not already at 0
      && nextPos > 100 // crossed 0
    ) {
      ct++;
    }

    pos = (nextPos + 100) % 100;

    if (pos === 0) {
      ct++;
    }
  }

  return ct;
}

export const answers = [
  1147,
  6789,
];
