import { Text } from "@pixi/react";
import React, { MutableRefObject, useEffect } from "react";

export const Ticker = ({
  rhythm,
  startTime,
}: {
  rhythm: Array<{ tock: boolean; time: number }>;
  startTime: MutableRefObject<number>;
}) => {
  useEffect(() => {
    const audio = new Audio(`${process.env.PUBLIC_URL}/audio/4-4.mp3`);

    try {
      audio.loop = true;

      var isPlaying = audio.currentTime > 0 && !audio.paused && !audio.ended 
        && audio.readyState > audio.HAVE_CURRENT_DATA;

      if (!isPlaying) {
        audio.play();
      }
      audio.play();
    }catch (e: any) {}

    startTime.current = performance.now();

    return () => {
      try{
        audio.pause();
      } catch (e: any) {}
    };
  }, [rhythm, startTime]);

  return (
    <Text
      text="ticker"
      anchor={1}
      x={window.innerWidth}
      y={window.innerHeight}
    />
  );
};
