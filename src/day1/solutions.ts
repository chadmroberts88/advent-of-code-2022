import fs from "fs";
import path from "path";

export function solution1A(): number[] {
  const snackz = fs
    .readFileSync(path.resolve(__dirname, "input.txt"))
    .toString()
    .split("\n");

  const elfTotals: number[] = [];
  let counter = 0;

  for (let i = 0; i < snackz.length; i++) {
    if (!isNaN(parseInt(snackz[i]))) {
      if (elfTotals[counter] === undefined) elfTotals[counter] = 0;
      elfTotals[counter] += parseInt(snackz[i]);
    } else {
      counter++;
    }
  }

  console.log(Math.max(...elfTotals));
  return elfTotals;
}

export function solution1B(): void {
  const sortedSnackz: number[] = solution1A().sort((a, b) => {
    return b - a;
  });

  console.log(sortedSnackz[0] + sortedSnackz[1] + sortedSnackz[2]);
}
