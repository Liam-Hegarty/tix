import { Level } from "./LevelTypes";
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
        { x: 17, y: 1 },
        { x: 15, y: 3 },
        { x: 15, y: 4 },
        { x: 13, y: 0 },
        { x: 13, y: 1 },
        { x: 11, y: 3 },
        { x: 11, y: 4 },
        { x: 9, y: 0 },
        { x: 9, y: 1 },
      ],
      rhythm: [false, false, true, true],
    },
    {
      tiles: [
        { x: 17, y: 3 },
        { x: 17, y: 4 },
        { x: 15, y: 0 },
        { x: 15, y: 1 },
        { x: 13, y: 3 },
        { x: 13, y: 4 },
        { x: 11, y: 0 },
        { x: 11, y: 1 },
        { x: 9, y: 3 },
        { x: 9, y: 4 },
      ],
      rhythm: [true, true, false, false],
    },
  ],
};
