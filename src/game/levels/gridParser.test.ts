import { parseGrid } from "./gridParser";

const testLevelOne = `

   +++++     +++++
   ++O++++++++++++
   +++++     +++++
`;

describe("Grid Parser", () => {
  test("parses a grid", () => {
    const level = parseGrid(testLevelOne);
    expect(level.start).toMatchObject({ x: 5, y: 1 });
    expect(level.grid[0].filter((x) => x).length).toBe(10);
    expect(level.grid[1].filter((x) => x).length).toBe(15);
    expect(level.grid[2].filter((x) => x).length).toBe(10);
  });
});
