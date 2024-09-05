import { Level, Point } from "./LevelTypes";

enum Squares {
  SPACE = "+",
  TIX = "O",
  DOOR = "D",
  EXIT = "X",
}

const parseChar = (char: string) => {
  switch (char) {
    case "+":
      return Squares.SPACE;
    case "O":
      return Squares.TIX;
    case "D":
      return Squares.DOOR;
    case "X":
      return Squares.EXIT;
    default:
      return null;
  }
};

const getCoordsFromLine = (line: string, y: number, type: Squares): Point[] =>
  line
    .split("")
    .map((c, x) => c === type.toString() && { x, y })
    .filter((d) => !!d) as Point[];

const getCoordinates = (lines: string[], type: Squares) =>
  lines.map((l, y) => getCoordsFromLine(l, y, type)).flat();

export const parseGrid = (
  raw: string
): Omit<Level, "scannerDrones" | "music" | "dropTiles"> => {
  const lines = raw.split("\n").filter((l) => l && !l.includes("//"));
  return {
    grid: lines.map((line) => line.split("").map((c) => parseChar(c) != null)),
    start: {
      x: lines.find((l) => l.includes("O"))!!.indexOf("O"),
      y: lines.findIndex((l) => l.includes("O")),
    },
    end: {
      x: lines.find((l) => l.includes("X"))!!.indexOf("X"),
      y: lines.findIndex((l) => l.includes("X")),
    },
    doors: getCoordinates(lines, Squares.DOOR),
  };
};
