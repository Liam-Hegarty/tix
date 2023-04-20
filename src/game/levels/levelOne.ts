import { Level } from "./Level";
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
      { tock: false, time: 400 },
      { tock: false, time: 400 },
      { tock: false, time: 400 },
      { tock: true, time: 400 },
    ],
    rhythmOffset: 180,
    audioPath: "audio/4-4.mp3",
    tolerance: 100,
  },
};
