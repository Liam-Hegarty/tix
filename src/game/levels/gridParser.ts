import { Level } from "./Level";

const traversableSymbols = ["+", "O", "X"];

export const parseGrid = (raw: string): Level => {
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
  };
};
