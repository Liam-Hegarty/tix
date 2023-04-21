import { Level } from "../levels/Level";
import { EventResponse, TixEvent } from "./Events";
import { moveIsOnTempo } from "./moveIsOnTempo";
import { RobotListenerRegistry } from "./robotListenerRegistry";

const moveIsOnGrid =
  (level: Level) =>
  (e: TixEvent): Partial<EventResponse> => {
    try {
      if (!!level.grid[e.newLocation.y][e.newLocation.x]) {
        return {};
      } else {
        return {
          canMove: false,
          crashed: true,
        };
      }
    } catch (e: any) {
      return {
        canMove: false,
        crashed: true,
      };
    }
  };

const hasReachedTheEnd =
  (level: Level, nextLevel: () => void) =>
  (e: TixEvent): Partial<EventResponse> => {
    if (e.newLocation.x === level.end.x && e.newLocation.y === level.end.y) {
      setTimeout(nextLevel, 500);
      return { frozen: true };
    } else {
      return {};
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
