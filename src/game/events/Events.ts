import { Point } from "../levels/Level";

export interface TixEvent {
  action: boolean;
  location: Point;
  ts: number;
}

export type EventResponse = {
  canMove: boolean;
};
