import { Level } from "../levels/Level";
import { EventResponse, TixEvent } from "./Events";
import { moveIsOnTempo } from "./moveIsOnTempo";
import { RobotListenerRegistry } from "./robotListenerRegistry";

const moveIsOnGrid =
  (level: Level) =>
  (e: TixEvent): Partial<EventResponse> | undefined => {
    try {
      if (!!level.grid[e.location.y][e.location.x]) {
        return undefined;
      } else {
        return {
          canMove: false,
        };
      }
    } catch (e: any) {
      return {
        canMove: false,
      };
    }
  };

const hasReachedTheEnd =
  (level: Level, nextLevel: () => void) =>
  (e: TixEvent): EventResponse | undefined => {
    if (e.location.x === level.end.x && e.location.y === level.end.y) {
      setTimeout(nextLevel, 500);
      return undefined;
    } else {
      return undefined;
    }
  };

export default function addEventListeners(
  registry: RobotListenerRegistry,
  timeRef: React.MutableRefObject<{
    audioTime: number;
    jsTime: number;
  }>,
  level: Level,
  nextLevel: () => void
) {
  registry.register("tempo", moveIsOnTempo(timeRef, level.music));
  registry.register("grid", moveIsOnGrid(level));
  registry.register("end", hasReachedTheEnd(level, nextLevel));
}
