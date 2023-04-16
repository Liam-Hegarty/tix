import { parseGrid } from "./gridParser";

const levelOneRaw = `
                    .
   +++++     +++++  .
   ++O++++++++++++  .
   +++++     +++++  .
                    .
`;

export const levelOne = parseGrid(levelOneRaw);
