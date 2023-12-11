import { readFileSync } from "fs";
import { join } from "path";

const data = readFileSync(join("./data/", "day1.1.txt"), { encoding: "utf8" });
const rows: string[] = data.split("\n");
const example2 = [
  "two1nine",
  "eightwothree",
  "abcone2threexyz",
  "xtwone3four",
  "4nineeightseven2",
  "zoneight234",
  "7pqrstsixteen",
];

const isCharCodeANumber = (char: number) => char >= 48 && char <= 57;
const validDigits = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};
const reverseString = (input: string) => input.split("").reverse().join("");

const getIndexOfLastDigit = (input: string) => {
  let i = input.length;
  for (; i >= 0; i--) {
    const charCode = input.charCodeAt(i);
    if (isCharCodeANumber(charCode)) {
      return i;
    }
  }
};

const getIndexOfFirstDigit = (input: string): number | undefined => {
  let i = 0;
  for (; i < input.length; i++) {
    const charCode = input.charCodeAt(i);
    if (isCharCodeANumber(charCode)) {
      return i;
    }
  }
};
const getFirstFakeOrRealDigit = (
  input: string,
  reversed = false,
): string | undefined => {
  const text = reversed ? reverseString(input) : input;
  const firstDigitIndex = getIndexOfFirstDigit(text);
  if (firstDigitIndex !== undefined && firstDigitIndex === 0) return text[0];

  let fakeDigitIndex: number | undefined;
  let fakeDigit: string | undefined;

  Object.entries(validDigits).map(([key, value]) => {
    const foundDigitIndex = text.indexOf(reversed ? reverseString(key) : key);
    if (foundDigitIndex > -1 && fakeDigitIndex === undefined) {
      fakeDigitIndex = foundDigitIndex;
      fakeDigit = value;
    }
    if (
      foundDigitIndex > -1 &&
      fakeDigitIndex !== undefined &&
      fakeDigitIndex > foundDigitIndex
    ) {
      fakeDigitIndex = foundDigitIndex;
      fakeDigit = value;
    }
  });

  if (fakeDigitIndex === undefined && firstDigitIndex !== undefined) {
    return text[firstDigitIndex];
  }

  if (firstDigitIndex === undefined) {
    return fakeDigit;
  }

  if (fakeDigitIndex !== undefined) {
    return fakeDigitIndex < firstDigitIndex ? fakeDigit : text[firstDigitIndex];
  }
};

const getFirstAndLastDigit = (input: string) => {
  const first = getIndexOfFirstDigit(input);
  const last = getIndexOfLastDigit(input);
  if (first !== undefined && last !== undefined) {
    return parseInt([input[first], input[last]].join(""));
  }
};

const getFirstAndLastDigitPart2 = (input: string) => {
  const first = getFirstFakeOrRealDigit(input);
  const last = getFirstFakeOrRealDigit(input, true);
  return parseInt([first, last].join(""));
};

const sumAll = (numbers: number[]) =>
  numbers.reduce((previousValue, currentValue) => previousValue + currentValue);

const part1 = sumAll(
  rows
    .filter((row) => row.length > 0)
    .map((row) => getFirstAndLastDigit(row) ?? 0),
);
console.log(part1);

const part2 = sumAll(
  rows
    .filter((row) => row.length > 0)
    .map((row) => getFirstAndLastDigitPart2(row) ?? 0),
);
console.log(part2);
