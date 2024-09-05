import { Level } from "./LevelTypes";
import { parseGrid } from "./gridParser";

const levelFiveRaw = `
  O+++++X
`;

export const levelFive: Level = {
  ...parseGrid(levelFiveRaw),
  dropTiles: [
    {
      tiles: [{ x: 6, y: 0 }],
      pattern: [true, false],
    },
  ],
  scannerDrones: [],
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
};
