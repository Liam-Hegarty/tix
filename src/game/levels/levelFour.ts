import { Level } from "./LevelTypes";
import { parseGrid } from "./gridParser";

const levelFourRaw = `
        .
 +++    .
 +O++X  .
 +++    .
        .
`;

export const levelFour: Level = {
  ...parseGrid(levelFourRaw),
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
  },
  zapTiles: [],
  doors: [],
};
