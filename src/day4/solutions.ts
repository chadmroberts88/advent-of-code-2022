import fs from "fs";
import path from "path";

const pairs = fs
  .readFileSync(path.resolve(__dirname, "input.txt"))
  .toString()
  .split("\n");

interface Range {
  min: number;
  max: number;
}

const convertPairs = (pair: string): { A: Range; B: Range } => {
  const splitPairs = pair.split(",");
  const A = splitPairs[0].split("-").map((item) => Number(item));
  const B = splitPairs[1].split("-").map((item) => Number(item));
  return { A: { min: A[0], max: A[1] }, B: { min: B[0], max: B[1] } };
};

export function solution4A(): void {
  let count = 0;
  pairs.forEach((pair: string) => {
    const { A, B } = convertPairs(pair);
    ((A.min >= B.min && A.max <= B.max) ||
      (B.min >= A.min && B.max <= A.max)) &&
      count++;
  });
  console.log({ count });
}

export function solution4B(): void {
  let count = 0;
  pairs.forEach((pair: string) => {
    const { A, B } = convertPairs(pair);
    ((A.min >= B.min && A.min <= B.max) ||
      (A.max <= B.max && A.max >= B.min) ||
      (B.min >= A.min && B.min <= A.max) ||
      (B.max <= A.max && B.max >= A.min)) &&
      count++;
  });
  console.log({ count });
}
