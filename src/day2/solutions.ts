import fs from "fs";
import path from "path";

const WIN = 6;
const DRAW = 3;
const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;

export function solution2A(): void {
  const games = fs
    .readFileSync(path.resolve(__dirname, "input.txt"))
    .toString()
    .split("\n");

  let you = 0;
  let elf = 0;

  games.forEach((game: string) => {
    // points for each player's chosen 'shape'
    game.includes("A") && (elf += ROCK);
    game.includes("B") && (elf += PAPER);
    game.includes("C") && (elf += SCISSORS);
    game.includes("X") && (you += ROCK);
    game.includes("Y") && (you += PAPER);
    game.includes("Z") && (you += SCISSORS);

    // draw conditions
    (game.includes("A X") || game.includes("B Y") || game.includes("C Z")) &&
      (elf += DRAW) &&
      (you += DRAW);

    // win conditions
    (game.includes("A Y") || game.includes("B Z") || game.includes("C X")) &&
      (you += WIN);

    // lose conditions
    (game.includes("A Z") || game.includes("B X") || game.includes("C Y")) &&
      (elf += WIN);
  });

  console.log({ you });
  console.log({ elf });
}

export function solution2B(): void {
  const games = fs
    .readFileSync(path.resolve(__dirname, "input.txt"))
    .toString()
    .split("\n");

  let you = 0;
  let elf = 0;

  games.forEach((game: string) => {
    // lose conditions
    if (game.includes("X")) {
      elf += WIN;
      game.includes("A") && (elf += ROCK) && (you += SCISSORS);
      game.includes("B") && (elf += PAPER) && (you += ROCK);
      game.includes("C") && (elf += SCISSORS) && (you += PAPER);
    }

    // draw conditions
    if (game.includes("Y")) {
      elf += DRAW;
      you += DRAW;
      game.includes("A") && (elf += ROCK) && (you += ROCK);
      game.includes("B") && (elf += PAPER) && (you += PAPER);
      game.includes("C") && (elf += SCISSORS) && (you += SCISSORS);
    }

    // win conditions
    if (game.includes("Z")) {
      you += WIN;
      game.includes("A") && (elf += ROCK) && (you += PAPER);
      game.includes("B") && (elf += PAPER) && (you += SCISSORS);
      game.includes("C") && (elf += SCISSORS) && (you += ROCK);
    }
  });

  console.log({ you });
  console.log({ elf });
}
