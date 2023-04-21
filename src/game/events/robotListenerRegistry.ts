import { EventResponse, TixEvent } from "./Events";

export type RobotListener = (e: TixEvent) => EventResponse | undefined;

export class RobotListenerRegistry {
  registry: RobotListener[];

  constructor(initialRegistry: RobotListener[] = []) {
    this.registry = initialRegistry ?? [];
  }

  register(listener: RobotListener) {
    this.registry.push(listener);
  }

  tryMove(move: TixEvent): EventResponse {
    return this.registry.reduce<EventResponse>(
      (result, listener) => {
        return {
          ...result,
          ...listener(move),
        };
      },
      { canMove: true }
    );
  }
}
