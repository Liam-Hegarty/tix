import { sumRhythmTimes, cumulativeRhythmTimes } from "./rhythmUtils";

describe("rhythmUtils", () => {
  test("sumRhythmTimes works", () => {
    expect(
      sumRhythmTimes([
        { tock: false, time: 2 },
        { tock: false, time: 2 },
      ])
    ).toEqual(4);
  });
  test("cumulativeBetTimes assembles timeline", () => {
    expect(
      cumulativeRhythmTimes([
        { tock: false, time: 1 },
        { tock: false, time: 2 },
        { tock: true, time: 3 },
        { tock: false, time: 4 },
      ])
    ).toMatchObject([
      { tock: false, time: 0 },
      { tock: false, time: 1 },
      { tock: true, time: 3 },
      { tock: false, time: 6 },
    ]);
  });
});
