import { MutableRefObject } from "react";
import { MusicInfo, Rhythm } from "./levels/Level";

export const sumRhythmTimes = (rhythm: Rhythm) =>
  rhythm.map((b) => b.time).reduce((x, y) => x + y, 0);

export const currentBeatTime = (
  musicInfo: MusicInfo,
  ref: MutableRefObject<{
    audioTime: number;
    jsTime: number;
  }>,
  now: number
) => {
  const { audioTime, jsTime } = ref.current;
  return Math.abs(
    (audioTime + (now - jsTime)) % sumRhythmTimes(musicInfo.rhythm)
  );
};

export const cumulativeRhythmTimes = (rhythm: Rhythm) =>
  rhythm.map((b, i) => {
    return {
      tock: b.tock,
      time: sumRhythmTimes(rhythm.slice(0, i)),
    };
  });
