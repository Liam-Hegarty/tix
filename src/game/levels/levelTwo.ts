import { Level } from "./Level";
import { parseGrid } from "./gridParser";

const levelTwoRaw = `
       ++++++++++++         .
  +++++++++++++++++++++     .
  ++++            +++++X    .
  +++++++++++++++++++++     .
    +  ++++++++++++         .
   +++        .
   +O+        .
   +++        .
              .
`;

export const levelTwo: Level = {
  ...parseGrid(levelTwoRaw),
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
  scannerDrones: [
    {
      location: { x: 16.5, y: -0.5 },
      area: {
        topLeft: { x: 15, y: 0 },
        width: 4,
        height: 2,
      },
    },
    {
      location: { x: 16.5, y: 2.5 },
      area: {
        topLeft: { x: 15, y: 3 },
        width: 4,
        height: 2,
      },
    },
  ],
  zapTiles: [
    {
      tiles: [
        { x: 17, y: 0 },
        { x: 15, y: 3 },
        { x: 13, y: 0 },
        { x: 11, y: 3 },
        { x: 9, y: 0 },
      ],
      rhythm: [false, true],
    },
    {
      tiles: [
        { x: 17, y: 3 },
        { x: 15, y: 0 },
        { x: 13, y: 3 },
        { x: 11, y: 0 },
        { x: 9, y: 3 },
      ],
      rhythm: [true, false],
    },
  ],
};
