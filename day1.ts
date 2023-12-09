import { readFileSync } from "fs";
import { join } from "path";

const data = readFileSync(join("./data/", "day1.1.txt"), { encoding: "utf8" });
const rows: string[] = data.split("\n");
const isCharCodeANumber = (char: number) => char >= 48 && char <= 57;

const getLastDigit = (input: string) => {
  let result: string | undefined;
  let i = 0;
  const reversed = input.split("").reverse().join("");
  for (; i < reversed.length; i++) {
    const charCode = reversed.charCodeAt(i);
    if (isCharCodeANumber(charCode)) {
      result = reversed[i];
      break;
    }
  }
  return result;
};

const getFirstDigit = (input: string) => {
  let result: string | undefined;
  let i = 0;
  for (; i < input.length; i++) {
    const charCode = input.charCodeAt(i);
    if (isCharCodeANumber(charCode)) {
      result = input[i];
      break;
    }
  }
  return result;
};

const getFirstAndLastDigit = (input: string) => {
  const first = getFirstDigit(input);
  const last = getLastDigit(input);
  return parseInt([first, last].join(""));
};

const sumAll = (numbers: number[]) =>
  numbers.reduce((previousValue, currentValue) => previousValue + currentValue);

console.log(
  sumAll(rows.filter((row) => row.length > 0).map((row) => getFirstAndLastDigit(row))),
);
