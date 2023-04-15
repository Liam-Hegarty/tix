import { Level } from "./Level";

export const parseGrid = (raw: string): Level => {
  const lines = raw.split("\n").filter((l) => l && !l.includes("//"));
  return {
    grid: lines.map((line) =>
      line.split("").map((c) => c === "+" || c === "O")
    ),
    start: {
      x: lines.find((l) => l.includes("O"))!!.indexOf("O"),
      y: lines.findIndex((l) => l.includes("O")),
    },
  };
};
