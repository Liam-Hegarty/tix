import { Level } from "./LevelTypes";
import { parseGrid } from "./gridParser";

const levelTwoRaw = `
+++++++  .
+     D  .
+ +++ +  .
+ +O+++  .
+ +++    .
D        .
++++++X  .
`;

export const levelTwo: Level = {
  ...parseGrid(levelTwoRaw),
  scannerDrones: [],
  music: {
    rhythm: [
      { tock: true, time: 400 },
      { tock: false, time: 400 },
      { tock: false, time: 400 },
      { tock: false, time: 400 },
    ],
    rhythmOffset: 25,
    audioPath: "audio/music/main-theme.mp3",
    tolerance: 150,
    endTrim: 825,
  },
  dropTiles: [],
};
