import { EventResponse, TixEvent } from "./Events";

export type RobotListener = (
  e: TixEvent,
  r: EventResponse
) => Partial<EventResponse>;

type PrioritisedListener = {
  priority: number;
  func: RobotListener;
};

const defaultResponse: EventResponse = {
  canMove: true,
  crashed: false,
  frozen: false,
};

export class RobotListenerRegistry {
  registry: Map<String, PrioritisedListener>;

  constructor(initialRegistry: Map<String, PrioritisedListener> = new Map()) {
    this.registry = initialRegistry ?? {};
  }

  register(id: string, listener: RobotListener, priority: number = 0) {
    this.registry.set(id, { priority, func: listener });
  }

  deregister(id: string) {
    this.registry.delete(id);
  }

  tryMove(move: TixEvent): EventResponse {
    return [...this.registry.values()]
      .sort((l1, l2) => l2.priority - l1.priority)
      .reduce<EventResponse>((result, listener) => {
        return {
          ...result,
          ...listener.func(move, result),
        };
      }, defaultResponse);
  }
}
