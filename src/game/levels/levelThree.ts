import { Level } from "./LevelTypes";
import { parseGrid } from "./gridParser";

const levelThreeRaw = `
  +++        .
  +O++X      .
  +++        .
             .
`;

export const levelThree: Level = {
  ...parseGrid(levelThreeRaw),
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
  scannerDrones: [],
  zapTiles: [],
};
