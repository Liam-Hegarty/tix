import { Sprite, Text, useTick } from "@pixi/react";
import React, { MutableRefObject, useEffect, useState } from "react";

const audio = new Audio(`${process.env.PUBLIC_URL}/audio/4-4.mp3`);

const sixthRotation = Math.PI / 3;

export const Ticker = ({
  rhythm,
  rhythmTime,
  tolerance,
}: {
  rhythm: Array<{ tock: boolean; time: number }>;
  rhythmTime: MutableRefObject<{ audioTime: number; jsTime: number }>;
  tolerance: number;
}) => {
  const [rotation, setRotation] = useState(0);

  useTick(() => {
    const audioTime = (audio.currentTime - 0.2) * 1000;

    rhythmTime.current = {
      audioTime,
      jsTime: performance.now(),
    };

    var beatRemainder = audioTime;
    var currentBeatLength = rhythm[0].time;
    var b = 0

    for (var beat of rhythm) {
      if (beatRemainder - beat.time <= 0) {
        break;
      } else {
        b++
        beatRemainder -= beat.time;
        currentBeatLength = beat.time;
      }
    }

    if (beatRemainder < tolerance) {
      setRotation(0);
    } else if (beatRemainder > (currentBeatLength - tolerance)) {
      setRotation(sixthRotation);
    } else {
      const crashLength = currentBeatLength - 2 * tolerance;
      setRotation(((beatRemainder - tolerance) / crashLength) * sixthRotation);
    }
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
    <>
      <Sprite
        image={`${process.env.PUBLIC_URL}/sprite/big-gear.png`}
        anchor={{ x: 0.5, y: 0.5 }}
        scale={{ x: 0.4, y: 0.4 }}
        x={window.innerWidth}
        y={window.innerHeight}
        rotation={rotation}
      />
    </>
  );
};
