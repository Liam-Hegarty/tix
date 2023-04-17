import { parseGrid } from "./gridParser";

const levelOneRaw = `
     +++  +++  +++       .
     +++  +++  +++       .
     +++  +++  +++       .
 +++               +++++  .
 +O+++++++++++++++++++++X .
 +++               +++++  .
     +++  +++  +++       .
     +++  +++  +++       .
     +++  +++  +++       .
`;

export const levelOne = parseGrid(levelOneRaw);
