export interface TixEvent {
  action: boolean;
  location: { x: number; y: number };
  ts: number;
}

export type EventResponse = {
  response: string;
};
