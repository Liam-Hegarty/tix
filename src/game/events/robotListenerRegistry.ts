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
    for (let listener of this.registry) {
      const reponse = listener(move);
      if (reponse != undefined) {
        return reponse;
      }
    }
    return {
      response: "OK",
    };
  }
}
