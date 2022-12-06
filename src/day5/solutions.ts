import fs from "fs";
import path from "path";

const data = fs
  .readFileSync(path.resolve(__dirname, "input.txt"))
  .toString()
  .split("\n\n");

const reversedStackRows = data[0].split("\n").reverse();
const numbersRow = reversedStackRows[0];
const stackRows = reversedStackRows.slice(1);
const instructions = data[1].split("\n");
const NUM_STACKS = numbersRow.trim().split("   ").length;

interface Instruction {
  move: number;
  from: number;
  to: number;
}

const parseStacks = (): string[][] => {
  const parsedStacks: string[][] = [];

  for (let i = 0; i < NUM_STACKS; i++) {
    parsedStacks[i] = [];
    for (let j = 0; j < stackRows.length; j++) {
      const char = stackRows[j].charAt(i * 4 + 1);
      char !== " " && (parsedStacks[i][j] = char);
    }
  }

  return parsedStacks;
};

const parseInstructions = (): Instruction[] => {
  const parsedInstructions: Instruction[] = [];
  instructions.forEach((instruction) => {
    const splitInstruction = instruction
      .split(" ")
      .filter((item) => !["move", "from", "to"].includes(item));

    parsedInstructions.push({
      move: Number(splitInstruction[0]),
      from: Number(splitInstruction[1]) - 1,
      to: Number(splitInstruction[2]) - 1,
    });
  });

  return parsedInstructions;
};

const getTopCrates = (parsedStacks: string[][]): string => {
  let topCrates = "";
  parsedStacks.forEach((stack) => (topCrates += stack[stack.length - 1]));
  return topCrates;
};

export function solution5A(): void {
  const stacks: string[][] = parseStacks();

  parseInstructions().forEach((instruction: Instruction) => {
    const { move, from, to } = instruction;
    for (let i = 0; i < move; i++) {
      const topCrate = stacks[from].pop();
      topCrate !== undefined && stacks[to].push(topCrate);
    }
  });

  console.log({ topCrates: getTopCrates(stacks) });
}

export function solution5B(): void {
  const stacks: string[][] = parseStacks();

  parseInstructions().forEach((instruction: Instruction) => {
    const { move, from, to } = instruction;
    const index = stacks[from].length - move;
    const top = stacks[from].slice(index);
    const bottom = stacks[from].slice(0, index);
    stacks[to] = stacks[to].concat(top);
    stacks[from] = bottom;
  });

  console.log({ topCrates: getTopCrates(stacks) });
}
