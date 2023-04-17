import { Text, useTick } from "@pixi/react";
import React, { MutableRefObject, useEffect } from "react";

const audio = new Audio(`${process.env.PUBLIC_URL}/audio/4-4.mp3`);

export const Ticker = ({
  rhythm,
  rhythmTime,
}: {
  rhythm: Array<{ tock: boolean; time: number }>;
  rhythmTime: MutableRefObject<{ audioTime: number; jsTime: number }>;
}) => {
  useTick(() => {
    rhythmTime.current = {
      audioTime: audio.currentTime * 1000,
      jsTime: performance.now(),
    };
  });

  useEffect(() => {
    try {
      audio.loop = true;

      var isPlaying =
        audio.currentTime > 0 &&
        !audio.paused &&
        !audio.ended &&
        audio.readyState > audio.HAVE_CURRENT_DATA;

      if (!isPlaying) {
        audio.play();
      }
      audio.play();
    } catch (e: any) {}

    return () => {
      try {
        audio.pause();
      } catch (e: any) {}
    };
  }, [rhythm]);

  return (
    <Text
      text="ticker"
      anchor={1}
      x={window.innerWidth}
      y={window.innerHeight}
    />
  );
};
