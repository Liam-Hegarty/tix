import { Point } from "./LevelTypes";

const traversableSymbols = ["+", "O", "X", "D"];

const getDoorsFromLine = (line: string, y: number): Point[] =>
  line
    .split("")
    .map((c, x) => c === "D" && { x, y })
    .filter((d) => !!d) as Point[];

const getDoors = (lines: string[]) =>
  lines.map((l, y) => getDoorsFromLine(l, y)).flat();

export const parseGrid = (raw: string) => {
  const lines = raw.split("\n").filter((l) => l && !l.includes("//"));
  return {
    grid: lines.map((line) =>
      line.split("").map((c) => traversableSymbols.includes(c))
    ),
    start: {
      x: lines.find((l) => l.includes("O"))!!.indexOf("O"),
      y: lines.findIndex((l) => l.includes("O")),
    },
    end: {
      x: lines.find((l) => l.includes("X"))!!.indexOf("X"),
      y: lines.findIndex((l) => l.includes("X")),
    },
    doors: getDoors(lines),
  };
};
