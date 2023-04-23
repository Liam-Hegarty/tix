import { MusicInfo } from "../levels/Level";
import { cumulativeRhythmTimes, currentBeatTime } from "../rhythmUtils";
import { EventResponse, TixEvent } from "./Events";

export const moveIsOnTempo = (
  rhythmTime: React.MutableRefObject<{
    audioTime: number;
    jsTime: number;
  }>,
  music: MusicInfo
) => {
  const cumulativeBeatTimes = cumulativeRhythmTimes(music.rhythm);

  return (e: TixEvent): Partial<EventResponse> => {
    const msProgressOfCurrentLoop = currentBeatTime(music, rhythmTime, e.ts);

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
      return {};
    } else {
      return {
        canMove: false,
        crashed: true,
      };
    }
  };
};
