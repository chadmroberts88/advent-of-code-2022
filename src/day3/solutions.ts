import fs from "fs";
import path from "path";

const sacks = fs
  .readFileSync(path.resolve(__dirname, "input.txt"))
  .toString()
  .split("\n");

const computePriority = (shared: string): number => {
  return shared.charCodeAt(0) - (shared === shared.toUpperCase() ? 38 : 96);
};

export function solution3A(): void {
  let sum = 0;

  sacks.forEach((sack: string) => {
    const compA = sack.slice(0, sack.length / 2);
    const compB = sack.slice(sack.length / 2);
    let shared = "";

    [...compA].forEach((item: string) => {
      compB.includes(item) && (shared = item);
    });

    sum += computePriority(shared);
  });

  console.log(sum);
}

export function solution3B(): void {
  const groups: string[][] = [];
  const GROUP_SIZE = 3;
  let x = 0;
  let sum = 0;

  sacks.forEach((sack: string, i: number) => {
    groups[x] === undefined && (groups[x] = []);
    groups[x].push(sack);
    if ((i + 1) % GROUP_SIZE === 0) x++;
  });

  groups.forEach((group: string[]) => {
    let shared = "";

    [...group[0]].forEach((item: string) => {
      let allHaveItem = true;
      for (let i = 1; i < GROUP_SIZE; i++) {
        if (!group[i].includes(item)) {
          allHaveItem = false;
          break;
        }
      }
      allHaveItem && (shared = item);
    });

    sum += computePriority(shared);
  });

  console.log(sum);
}
