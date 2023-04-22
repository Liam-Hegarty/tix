import { Level } from "./Level";
import { parseGrid } from "./gridParser";

const levelTwoRaw = `
  +++        .
  +O++X      .
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
  scannerDrones: [],
};
