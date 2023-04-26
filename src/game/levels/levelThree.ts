import { Level } from "./LevelTypes";
import { parseGrid } from "./gridParser";

const levelThreeRaw = `
        +++  .
        +X+  .
        +++  .
         D   .
       +++++ .
       +++++ .
       +++++ .
  ++++++++++ .
  ++ ++++ ++ .
  ++++++++++ .
    D        .
  +++++      .
  +++++      .
  +++++      .
  +++++      .
    D        .
   +++       .
   +O+       .
   +++       .
             .
`;

export const levelThree: Level = {
  ...parseGrid(levelThreeRaw),
  music: {
    rhythm: [
      { tock: true, time: 400 },
      { tock: false, time: 400 },
      { tock: false, time: 400 },
      { tock: false, time: 400 },
      { tock: false, time: 400 },
      { tock: false, time: 400 },
      { tock: false, time: 400 },
    ],
    rhythmOffset: 25,
    audioPath: "audio/music/level2.mp3",
    tolerance: 150,
    endTrim: 0,
  },
  scannerDrones: [
    {
      location: { x: 4, y: 10 },
      area: {
        topLeft: { x: 3, y: 11 },
        width: 3,
        height: 3,
      },
    },
    {
      location: { x: 9, y: 3 },
      area: {
        topLeft: { x: 8, y: 4 },
        width: 3,
        height: 3,
      },
    },
  ],
  zapTiles: [],
};
