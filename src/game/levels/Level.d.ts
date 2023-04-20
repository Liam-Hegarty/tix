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

export type Beat = { tock: boolean; time: number };
export type Rhythm = Beat[];


export type Level = {
  grid: boolean[][];
  start: Point;
  end: Point;
  scannerDrones: ScannerDrone[];
  music: {
    rhythm: Rhythm,
    audioPath: string,
    rhythmOffset: number 
  }
};
