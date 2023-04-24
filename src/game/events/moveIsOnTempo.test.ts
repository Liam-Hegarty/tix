import { MutableRefObject, createRef } from "react";
import { moveIsOnTempo } from "./moveIsOnTempo";

type timeRefType = {
  jsTime: number;
  audioTime: number;
};

const fakeRef = (value: timeRefType): MutableRefObject<timeRefType> => {
  return {
    current: value,
  } as unknown as MutableRefObject<timeRefType>;
};

describe("moveIsOnTempo", () => {
  test("returns true for a perfect key press", () => {
    const listener = moveIsOnTempo(fakeRef({ jsTime: 500, audioTime: 500 }), {
      rhythm: [{ time: 500, tock: false }],
      audioPath: "",
      rhythmOffset: 0,
      tolerance: 1,
    });
    expect(
      listener({
        action: false,
        ts: 500,
        newLocation: { x: 0, y: 0 },
        oldLocation: { x: 0, y: 0 },
      })
    ).toMatchObject({});
  });
  test("returns false for a terrible key press", () => {
    const listener = moveIsOnTempo(fakeRef({ jsTime: 500, audioTime: 500 }), {
      rhythm: [{ time: 500, tock: true }],
      audioPath: "",
      rhythmOffset: 0,
      tolerance: 1,
    });
    expect(
      listener({
        action: false,
        ts: 250,
        newLocation: { x: 0, y: 0 },
        oldLocation: { x: 0, y: 0 },
      })?.canMove
    ).toBeFalsy();
  });
  test("returns false for an action on a tick", () => {
    const listener = moveIsOnTempo(fakeRef({ jsTime: 500, audioTime: 500 }), {
      rhythm: [{ time: 500, tock: false }],
      audioPath: "",
      rhythmOffset: 0,
      tolerance: 1,
    });
    expect(
      listener({
        action: true,
        ts: 250,
        newLocation: { x: 0, y: 0 },
        oldLocation: { x: 0, y: 0 },
      })?.canMove
    ).toBeFalsy();
  });
  test("returns false for a perfect move on a tock", () => {
    const listener = moveIsOnTempo(fakeRef({ jsTime: 500, audioTime: 500 }), {
      rhythm: [{ time: 500, tock: true }],
      audioPath: "",
      rhythmOffset: 0,
      tolerance: 1,
    });
    expect(
      listener({
        action: false,
        ts: 500,
        newLocation: { x: 0, y: 0 },
        oldLocation: { x: 0, y: 0 },
      })?.canMove
    ).toBeFalsy();
  });
  test("returns true for a perfect action on a tock", () => {
    const listener = moveIsOnTempo(fakeRef({ jsTime: 500, audioTime: 500 }), {
      rhythm: [{ time: 500, tock: true }],
      audioPath: "",
      rhythmOffset: 0,
      tolerance: 1,
    });
    expect(
      listener({
        action: true,
        ts: 500,
        newLocation: { x: 0, y: 0 },
        oldLocation: { x: 0, y: 0 },
      })
    ).toMatchObject({});
  });
  test("returns true for an action within tolerance", () => {
    const listener = moveIsOnTempo(fakeRef({ jsTime: 500, audioTime: 500 }), {
      rhythm: [{ time: 500, tock: true }],
      audioPath: "",
      rhythmOffset: 0,
      tolerance: 100,
    });
    expect(
      listener({
        action: true,
        ts: 401,
        newLocation: { x: 0, y: 0 },
        oldLocation: { x: 0, y: 0 },
      })
    ).toMatchObject({});
  });
  test("returns false for an action outside of tolerance", () => {
    const listener = moveIsOnTempo(fakeRef({ jsTime: 500, audioTime: 500 }), {
      rhythm: [{ time: 500, tock: true }],
      audioPath: "",
      rhythmOffset: 0,
      tolerance: 100,
    });
    expect(
      listener({
        action: true,
        ts: 399,
        newLocation: { x: 0, y: 0 },
        oldLocation: { x: 0, y: 0 },
      })?.canMove
    ).toBeFalsy();
  });
  test("listens to value of nearest beat", () => {
    const listener = moveIsOnTempo(fakeRef({ jsTime: 0, audioTime: 0 }), {
      rhythm: [
        { time: 500, tock: false },
        { time: 500, tock: true },
      ],
      audioPath: "",
      rhythmOffset: 0,
      tolerance: 100,
    });
    expect(
      listener({
        action: false,
        ts: 50,
        newLocation: { x: 0, y: 0 },
        oldLocation: { x: 0, y: 0 },
      })
    ).toMatchObject({});
  });
  test("listens to value of nearest beat wraps around", () => {
    const listener = moveIsOnTempo(fakeRef({ jsTime: 0, audioTime: 0 }), {
      rhythm: [
        { time: 500, tock: false },
        { time: 500, tock: true },
      ],
      audioPath: "",
      rhythmOffset: 0,
      tolerance: 100,
    });
    expect(
      listener({
        action: true,
        ts: 550,
        newLocation: { x: 0, y: 0 },
        oldLocation: { x: 0, y: 0 },
      })
    ).toMatchObject({});
  });
  test("cannot double tap a beat", () => {
    const listener = moveIsOnTempo(fakeRef({ jsTime: 500, audioTime: 500 }), {
      rhythm: [{ time: 500, tock: false }, { time: 500, tock: false }],
      audioPath: "",
      rhythmOffset: 0,
      tolerance: 100,
    });
    expect(
      listener({
        action: false,
        ts: 490,
        newLocation: { x: 0, y: 0 },
        oldLocation: { x: 0, y: 0 },
      })
    ).toMatchObject({});
    expect(
      listener({
        action: false,
        ts: 510,
        newLocation: { x: 0, y: 0 },
        oldLocation: { x: 0, y: 0 },
      })
    ).toMatchObject({
      canMove: false,
      crashed: true,
    });
  });
});
