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
      { tock: true, time: 200 },
      { tock: false, time: 200 },
      { tock: false, time: 200 },
      { tock: true, time: 200 },
      { tock: false, time: 200 },
      { tock: false, time: 200 },
      { tock: true, time: 400 },
      { tock: false, time: 400 },
    ],
    rhythmOffset: 25,
    audioPath: "audio/music/level3.mp3",
    tolerance: 100,
  },
  scannerDrones: [],
  zapTiles: [],
};
