import { eg, input } from './input';
import { cleanAndParse, combinationsOf, sumOf } from '../../utils';
import { Day } from '..';

export const meta: Day['meta'] = {};

function parseLine(line: string) {
  const i1 = line.indexOf("]");
  const i2 = line.indexOf("{");

  const targetStateMask = Array.from(line.slice(1, i1)).reduce((mask, c, i) => {
    return mask + (c === "#" ? 2 ** i : 0);
  }, 0);

  const buttonMasks = line
    .slice(i1 + 2, i2 - 1)
    .split(" ")
    .map((c) =>
      c
        .slice(1, -1)
        .split(",")
        .reduce((acc, c) => acc + 2 ** Number(c), 0)
    );
  const joltages = line
    .slice(i2 + 1, -1)
    .split(",")
    .map(Number);

  return { line, targetStateMask, buttonMasks, joltages };
}
type Line = ReturnType<typeof parseLine>;

function fewestPresses({ buttonMasks, targetStateMask }: Line) {
  const buttonCount = buttonMasks.length;

  for (let presses = 1; presses <= buttonCount; presses++) {
    const combinations = combinationsOf(buttonMasks, presses);

    for (const combo of combinations) {
      const comboMask = combo.reduce((acc, c) => acc ^ c);
      if (comboMask === targetStateMask) {
        return presses;
      }
    }
  }
  return -1;
}

export function part1() {
  const data = cleanAndParse(input, parseLine);

  const perMachine = data.map(fewestPresses);

  return sumOf(perMachine);
}

export function part2() {
  return 0;
}

// export const answers = [
// ];
