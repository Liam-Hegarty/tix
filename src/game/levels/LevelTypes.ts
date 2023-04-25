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

export type ZapTilesInfo = {
  tiles: Point[];
  rhythm: boolean[];
};

export type Beat = { tock: boolean; time: number };
export type Rhythm = Beat[];

export type MusicInfo = {
  rhythm: Rhythm;
  audioPath: string;
  rhythmOffset: number;
  tolerance: number;
};

export type Level = {
  grid: boolean[][];
  start: Point;
  end: Point;
  scannerDrones: ScannerDrone[];
  music: MusicInfo;
  zapTiles: ZapTilesInfo[];
  doors: Point[];
};
