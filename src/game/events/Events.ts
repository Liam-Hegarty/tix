import { Point } from "../levels/LevelTypes";

export interface TixEvent {
  action: boolean;
  newLocation: Point;
  oldLocation: Point;
  ts: number;
}

export type EventResponse = {
  canMove: boolean;
  crashed: boolean;
  detected: boolean;
  frozen: boolean;
  win: boolean;
};
