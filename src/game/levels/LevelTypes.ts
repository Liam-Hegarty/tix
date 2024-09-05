export type Point = {
  x: number;
  y: number;
};

export type ScannerDrone = {
  location: Point;
  area: {
    topLeft: Point;
    width: number;
    height: number;
  };
};

export type DropTilesInfo = {
  tiles: Point[];
  pattern: boolean[];
};

export type Beat = { tock: boolean; time: number };
export type Rhythm = Beat[];

export type MusicInfo = {
  rhythm: Rhythm;
  audioPath: string;
  rhythmOffset: number;
  tolerance: number;
  endTrim: number;
};

export type Level = {
  grid: boolean[][];
  start: Point;
  end: Point;
  scannerDrones: ScannerDrone[];
  music: MusicInfo;
  dropTiles: DropTilesInfo[];
  doors: Point[];
};
