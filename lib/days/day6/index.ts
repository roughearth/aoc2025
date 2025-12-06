import { eg, input } from './input';
import { cleanAndParse, sumOf } from '../../utils';
import { Day } from '..';

export const meta: Day['meta'] = {};

type Problem = {
  numbers: number[];
  operator: string;
};

function processProblems(problems: Problem[]) {
  const results = problems.map(({ numbers, operator }) => {
    if (operator === "*") {
      return numbers.reduce((a, b) => a * b, 1);
    }
    else {
      return numbers.reduce((a, b) => a + b, 0);
    }
  });
  return results;
}

export function part1() {
  const numbers: number[][] = [];
  let operators: string[] = [];
  const problems: Problem[] = [];

  cleanAndParse(input, (line) => {
    //amount of whitespace is irrelevant here
    const src = line.trim().split(/\s+/);

    if (src[0] === "*") { // true for my input and the example
      operators = src;
    }
    else {
      numbers.push(src.map(Number));
    }
  });

  const l = operators.length;

  for (let i = 0; i < l; i++) {
    problems.push({
      numbers: numbers.map((n) => n[i]),
      operator: operators[i]
    });
  }

  return sumOf(processProblems(problems));
}

export function part2() {
  const problems: Problem[] = [];

  const lines = input.split("\n");
  const numberLines = lines.slice(0, -1);

  // amount of whitespace is still irrelevant on the operator line
  const operators = lines.at(-1)!.trim().split(/\s+/)

  // this gets replaced when the problem changes
  let currentNumbers: number[] = [];

  // number of character columns to loop over
  const len = Math.max(...lines.map((l) => l.length));

  for (let i = 0; i < len; i++) {
    const number = numberLines.map(line => line[i] ?? "").join("").trim();

    if (number === "") {
      // a blank column indicates a new problem, so push and reset
      problems.push({
        numbers: currentNumbers,
        operator: operators[problems.length]
      });

      currentNumbers = [];
    }
    else {
      currentNumbers.push(Number(number));
    }
  }

  // don't forget to push the last problem
  problems.push({
    numbers: currentNumbers,
    operator: operators[problems.length]
  });

  return sumOf(processProblems(problems));
}

export const answers = [
  5227286044585,
  10227753257799
];
