import { Point } from "../levels/Level";

export interface TixEvent {
  action: boolean;
  newLocation: Point;
  oldLocation: Point;
  ts: number;
}

export type EventResponse = {
  canMove: boolean;
  crashed: boolean;
  frozen: boolean;
};
