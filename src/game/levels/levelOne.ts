import { Level } from "./LevelTypes";
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

export const levelOne: Level = {
  ...parseGrid(levelOneRaw),
  scannerDrones: [
    {
      location: { x: 21, y: 2 },
      area: {
        topLeft: { x: 20, y: 3 },
        width: 3,
        height: 3,
      },
    },
  ],
  music: {
    rhythm: [
      { tock: true, time: 400 },
      { tock: false, time: 400 },
      { tock: false, time: 400 },
      { tock: false, time: 400 },
    ],
    rhythmOffset: 25,
    audioPath: "audio/music/level1.mp3",
    tolerance: 150,
    endTrim: 140,
  },
  dropTiles: [],
  doors: [],
};
