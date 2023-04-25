import { parseGrid } from "./gridParser";

const testLevelOne = `

   +++++     +++++
   ++O+++++++++X++
   +++++     +++++
`;

const levelTwoRaw = `
  +++
  +O+   X
  +++
`;

const doorLevel = `
   X
   D
  +++
  +O+ 
  +++
`;

describe("Grid Parser", () => {
  test("parses a grid", () => {
    const level = parseGrid(testLevelOne);
    expect(level.start).toMatchObject({ x: 5, y: 1 });
    expect(level.grid[0].filter((x) => x).length).toBe(10);
    expect(level.grid[1].filter((x) => x).length).toBe(15);
    expect(level.grid[2].filter((x) => x).length).toBe(10);
  });
  test("why is level two not working???", () => {
    const level = parseGrid(levelTwoRaw);
    expect(level.start).toMatchObject({ x: 3, y: 1 });
    expect(level.end).toMatchObject({ x: 8, y: 1 });
  });
  test("finds doors", () => {
    const level = parseGrid(doorLevel);
    console.log(level);
    expect(level.doors[0]).toMatchObject({ x: 3, y: 1 });
  });
});
