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
      listener({ action: false, ts: 500, location: { x: 0, y: 0 } })
    ).toBeUndefined();
  });
  test("returns false for a terrible key press", () => {
    const listener = moveIsOnTempo(fakeRef({ jsTime: 500, audioTime: 500 }), {
      rhythm: [{ time: 500, tock: true }],
      audioPath: "",
      rhythmOffset: 0,
      tolerance: 1,
    });
    expect(
      listener({ action: false, ts: 250, location: { x: 0, y: 0 } })?.response
    ).toBe("CRASH");
  });
  test("returns false for an action on a tick", () => {
    const listener = moveIsOnTempo(fakeRef({ jsTime: 500, audioTime: 500 }), {
      rhythm: [{ time: 500, tock: false }],
      audioPath: "",
      rhythmOffset: 0,
      tolerance: 1,
    });
    expect(
      listener({ action: true, ts: 250, location: { x: 0, y: 0 } })?.response
    ).toBe("CRASH");
  });
  test("returns false for a perfect move on a tock", () => {
    const listener = moveIsOnTempo(fakeRef({ jsTime: 500, audioTime: 500 }), {
      rhythm: [{ time: 500, tock: true }],
      audioPath: "",
      rhythmOffset: 0,
      tolerance: 1,
    });
    expect(
      listener({ action: false, ts: 500, location: { x: 0, y: 0 } })?.response
    ).toBe("CRASH");
  });
  test("returns true for a perfect action on a tock", () => {
    const listener = moveIsOnTempo(fakeRef({ jsTime: 500, audioTime: 500 }), {
      rhythm: [{ time: 500, tock: true }],
      audioPath: "",
      rhythmOffset: 0,
      tolerance: 1,
    });
    expect(
      listener({ action: true, ts: 500, location: { x: 0, y: 0 } })
    ).toBeUndefined();
  });
  test("returns true for an action within tolerance", () => {
    const listener = moveIsOnTempo(fakeRef({ jsTime: 500, audioTime: 500 }), {
      rhythm: [{ time: 500, tock: true }],
      audioPath: "",
      rhythmOffset: 0,
      tolerance: 100,
    });
    expect(
      listener({ action: true, ts: 401, location: { x: 0, y: 0 } })
    ).toBeUndefined();
  });
  test("returns true for an action outside of tolerance", () => {
    const listener = moveIsOnTempo(fakeRef({ jsTime: 500, audioTime: 500 }), {
      rhythm: [{ time: 500, tock: true }],
      audioPath: "",
      rhythmOffset: 0,
      tolerance: 100,
    });
    expect(
      listener({ action: true, ts: 399, location: { x: 0, y: 0 } })
    ).toBeUndefined();
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
      listener({ action: false, ts: 50, location: { x: 0, y: 0 } })
    ).toBeUndefined();
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
      listener({ action: true, ts: 550, location: { x: 0, y: 0 } })
    ).toBeUndefined();
  });
});
