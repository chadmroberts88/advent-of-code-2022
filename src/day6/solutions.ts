import fs from "fs";
import path from "path";

const data = fs.readFileSync(path.resolve(__dirname, "input.txt")).toString();

// A: MARKER_LENGTH = 4; B: MARKER_LENGTH = 14
const MARKER_LENGTH = 4;

export function solution6AB(): void {
  for (let i = MARKER_LENGTH; i < data.length; i++) {
    if (!/(.).*\1/.test(data.substring(i, i - MARKER_LENGTH))) {
      console.log(i);
      break;
    }
  }
}
