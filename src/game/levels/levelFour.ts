import { Level } from "./LevelTypes";
import { parseGrid } from "./gridParser";

const levelFourRaw = `
  O++   .
    D   .
    +++ .
      D .
    +++ .
     D  .
    +++ .
      D .
    +++ .
    D   .
    +++ .
      D .
    +++ .
     D   .
  X+++  .
`;

export const levelFour: Level = {
  ...parseGrid(levelFourRaw),
  music: {
    rhythm: [
      { tock: true, time: 400 },
      { tock: false, time: 400 },
      { tock: false, time: 400 },
      { tock: false, time: 400 },
    ],
    rhythmOffset: 25,
    audioPath: "audio/music/future-chase-level.mp3",
    tolerance: 160,
    endTrim: 0,
  },
  scannerDrones: [
    {
      location: { x: 5, y: 1 },
      area: {
        topLeft: { x: 4, y: 2 },
        width: 3,
        height: 1,
      },
    },
    {
      location: { x: 5, y: 3 },
      area: {
        topLeft: { x: 4, y: 4 },
        width: 3,
        height: 1,
      },
    },
    {
      location: { x: 5, y: 5 },
      area: {
        topLeft: { x: 4, y: 6 },
        width: 3,
        height: 1,
      },
    },
    {
      location: { x: 5, y: 7 },
      area: {
        topLeft: { x: 4, y: 8 },
        width: 3,
        height: 1,
      },
    },
    {
      location: { x: 5, y: 9 },
      area: {
        topLeft: { x: 4, y: 10 },
        width: 3,
        height: 1,
      },
    },
    {
      location: { x: 5, y: 11 },
      area: {
        topLeft: { x: 4, y: 12 },
        width: 3,
        height: 1,
      },
    },
  ],
  zapTiles: [],
};
