import { Graphics } from "@pixi/graphics";
import {
  Sprite,
  useTick,
  Graphics as GraphicsElement,
} from "@pixi/react";
import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import palette from "../palette";

const sixthRotation = Math.PI / 3;

export const Ticker = ({
  rhythm,
  rhythmTime,
  tolerance,
  offset,
  audioTrack,
}: {
  rhythm: Array<{ tock: boolean; time: number }>;
  rhythmTime: MutableRefObject<{ audioTime: number; jsTime: number }>;
  tolerance: number;
  offset: number;
  audioTrack: string;
}) => {
  const audio = useMemo(
    () => new Audio(`${process.env.PUBLIC_URL}/${audioTrack}`),
    [audioTrack]
  );

  const [rotation, setRotation] = useState(0);
  const [beatTypes, setBeatTypes] = useState([
    rhythm[0].tock,
    rhythm[1].tock,
    rhythm[2].tock,
  ]);

  useTick(() => {
    if (audio.paused) {
      audio.play();
    }
    const audioTime = audio.currentTime * 1000 - offset;

    rhythmTime.current = {
      audioTime,
      jsTime: performance.now(),
    };

    var beatRemainder = audioTime;
    var currentBeatLength = rhythm[0].time;

    var currentBeatIndex = 3;

    for (var beatNum in rhythm) {
      const beat = rhythm[beatNum];
      if (beatRemainder - beat.time <= 0) {
        break;
      } else {
        beatRemainder -= beat.time;
        currentBeatLength = beat.time;
        currentBeatIndex = Number.parseInt(beatNum);
      }
    }

    setBeatTypes([
      rhythm[(currentBeatIndex + 1) % rhythm.length].tock,
      rhythm[(currentBeatIndex + 2) % rhythm.length].tock,
      rhythm[(currentBeatIndex + 3) % rhythm.length].tock,
    ]);

    if (beatRemainder < tolerance) {
      setRotation(0);
    } else if (beatRemainder > currentBeatLength - tolerance) {
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
  }, [rhythm, audio]);

  const drawTickMark = useCallback((g: Graphics) => {
    g.clear();
    g.lineStyle(2, palette.black, 1)
    g.beginFill(palette.darkBlue);
    g.drawCircle(5, 5, 10);
    g.endFill();
  }, []);

  const drawTockMark = useCallback((g: Graphics) => {
    g.clear();
    g.lineStyle(2, palette.black, 1)
    g.beginFill(palette.orange);
    g.drawCircle(5, 5, 10);
    g.endFill();
  }, []);

  const rotationConnection = sixthRotation / 4;

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
      <GraphicsElement
        draw={beatTypes[0] ? drawTockMark : drawTickMark}
        x={
          window.innerWidth -
          Math.cos(rotation + sixthRotation + rotationConnection) * 120
        }
        y={
          window.innerHeight -
          Math.sin(rotation + sixthRotation + rotationConnection) * 120
        }
      />
      <GraphicsElement
        draw={beatTypes[1] ? drawTockMark : drawTickMark}
        x={window.innerWidth - Math.cos(rotation + rotationConnection) * 120}
        y={window.innerHeight - Math.sin(rotation + rotationConnection) * 120}
      />
      <GraphicsElement
        draw={beatTypes[2] ? drawTockMark : drawTickMark}
        x={
          window.innerWidth -
          Math.cos(rotation - sixthRotation + rotationConnection) * 120
        }
        y={
          window.innerHeight -
          Math.sin(rotation - sixthRotation + rotationConnection) * 120
        }
      />
    </>
  );
};
