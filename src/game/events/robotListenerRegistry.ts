import { EventResponse, TixEvent } from "./Events";

export type RobotListener = (e: TixEvent) => Partial<EventResponse> | undefined;

const defaultResponse: EventResponse = {
  canMove: true,
  crashed: false,
  frozen: false,
};

export class RobotListenerRegistry {
  registry: Map<String, RobotListener>;

  constructor(initialRegistry: Map<String, RobotListener> = new Map()) {
    this.registry = initialRegistry ?? {};
  }

  register(id: string, listener: RobotListener) {
    this.registry.set(id, listener);
  }

  deregister(id: string) {
    this.registry.delete(id);
  }

  tryMove(move: TixEvent): EventResponse {
    return [...this.registry.values()].reduce<EventResponse>(
      (result, listener) => {
        return {
          ...result,
          ...listener(move),
        };
      },
      defaultResponse
    );
  }
}
