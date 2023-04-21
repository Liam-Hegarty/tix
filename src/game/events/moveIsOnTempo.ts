import { MusicInfo, Rhythm } from "../levels/Level";
import { EventResponse, TixEvent } from "./Events";

const sumRhythmTimes = (rhythm: Rhythm) =>
  rhythm.map((b) => b.time).reduce((x, y) => x + y, 0);

export const moveIsOnTempo = (
  rhythmTime: React.MutableRefObject<{
    audioTime: number;
    jsTime: number;
  }>,
  music: MusicInfo
) => {
  const cumulativeBeatTimes = music.rhythm.map((b, i) => {
    return {
      tock: b.tock,
      time: sumRhythmTimes(music.rhythm.slice(0, i)),
    };
  });

  return (e: TixEvent): EventResponse | undefined => {
    const { audioTime, jsTime } = rhythmTime.current;
    const msProgressOfCurrentLoop =
      (audioTime + (e.ts - jsTime)) % sumRhythmTimes(music.rhythm);

    const nextBeatIndex = Math.max(
      cumulativeBeatTimes.findIndex((b) => b.time > msProgressOfCurrentLoop),
      0
    );
    var nextBeat = cumulativeBeatTimes[nextBeatIndex];
    const previousBeat =
      nextBeatIndex === 0
        ? cumulativeBeatTimes[cumulativeBeatTimes.length - 1]
        : cumulativeBeatTimes[nextBeatIndex - 1];

    if (nextBeatIndex === 0) {
      nextBeat = {
        ...nextBeat,
        time: previousBeat.time + music.rhythm[music.rhythm.length - 1].time,
      };
    }

    const distanceFromBeat = Math.min(
      msProgressOfCurrentLoop - previousBeat.time,
      nextBeat.time - msProgressOfCurrentLoop
    );

    const nearestBeat =
      msProgressOfCurrentLoop - previousBeat.time >
      nextBeat.time - msProgressOfCurrentLoop
        ? nextBeat
        : previousBeat;

    if (distanceFromBeat < music.tolerance && nearestBeat.tock === e.action) {
      return undefined;
    } else {
      return {
        response: "CRASH",
      };
    }
  };
};
