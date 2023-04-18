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

export type Level = {
  grid: boolean[][];
  start: Point;
  end: Point;
  scannerDrones: ScannerDrone[];
};
