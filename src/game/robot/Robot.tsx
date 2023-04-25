import { Container, useTick } from "@pixi/react";
import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { EventResponse, TixEvent } from "../events/Events";
import { CrashedRobot } from "./CrashedRobot";
import { HappyRobot } from "./HappyRobot";
import { RobotListenerRegistry } from "../events/robotListenerRegistry";
import { DropShadowFilter } from "@pixi/filter-drop-shadow";
import { Graphics as GraphicsElement } from "@pixi/react";
import { Graphics } from "@pixi/graphics";
import { DetectedRobot } from "./DetectedRobot";
import { ElevatorRobot } from "./ElevatorRobot";
import { MusicInfo, Point } from "../levels/LevelTypes";
import {
  cumulativeRhythmTimes,
  currentBeatTime,
  sumRhythmTimes,
} from "../rhythmUtils";

const crashSound = new Audio(`${process.env.PUBLIC_URL}/audio/crash.mp3`);
const detectedSound = new Audio(`${process.env.PUBLIC_URL}/audio/alarm.mp3`);

export const Robot = ({
  listeners,
  spacing,
  offset,
  setOffset,
  start,
  paused,
  restart,
  nextLevel,
  rhythmTime,
  music,
}: {
  listeners: RobotListenerRegistry;
  spacing: number;
  offset: { x: number; y: number };
  setOffset: Dispatch<SetStateAction<{ x: number; y: number }>>;
  start: { x: number; y: number };
  paused: boolean;
  restart: () => void;
  nextLevel: () => void;
  rhythmTime: React.MutableRefObject<{
    audioTime: number;
    jsTime: number;
  }>;
  music: MusicInfo;
}) => {
  const [tix, setTix] = useState({ new: start, old: start });
  const setNewTix = useCallback(
    (newTix: { x: number; y: number }) => {
      setTix({ old: tix.new, new: newTix });
    },
    [setTix, tix]
  );
  const [anim, setAnim] = useState({
    x: offset.x + start.x * spacing,
    y: offset.y + start.y * spacing,
  });
  const [crashedUntil, setCrashedUntil] = useState(-1000);
  const [detectedAt, setDetectedAt] = useState<number>();
  const [hasWon, setHasWon] = useState(false);
  const animDone = useRef(true);
  const isFrozen = useRef(false);

  const isCrashed = performance.now() < crashedUntil;

  const lastMoveTs = useRef(-100000);

  const handleEventResponse = useCallback(
    (response: EventResponse, event: TixEvent) => {
      if (response.canMove) {
        animDone.current = false;
        setNewTix(event.newLocation);
        lastMoveTs.current = event.ts;
      }
      if (response.crashed) {
        crashSound.play();
        setCrashedUntil(event.ts + 1000);
      }
      if (response.detected) {
        if (!detectedAt) {
          detectedSound.play();
          setDetectedAt(event.ts);
        }
      }
      if (response.frozen) {
        isFrozen.current = true;
      }
      if (response.win) {
        setTimeout(nextLevel, 2000);
        setHasWon(true);
      }
    },
    [
      animDone,
      setHasWon,
      setDetectedAt,
      setCrashedUntil,
      setNewTix,
      detectedAt,
      nextLevel,
    ]
  );

  const handleMovement = useCallback(
    (e: any) => {
      if (e.repeat || paused || isCrashed || isFrozen.current) {
        return;
      }

      var newerTix;

      switch (e.key) {
        case "w":
        case "ArrowUp":
          newerTix = { x: tix.new.x, y: tix.new.y - 1 };
          break;
        case "a":
        case "ArrowLeft":
          newerTix = { x: tix.new.x - 1, y: tix.new.y };
          break;
        case "s":
        case "ArrowDown":
          newerTix = { x: tix.new.x, y: tix.new.y + 1 };
          break;
        case "d":
        case "ArrowRight":
          newerTix = { x: tix.new.x + 1, y: tix.new.y };
          break;
        case " ":
          const actionEvent = {
            action: true,
            move: false,
            newLocation: tix.new,
            oldLocation: tix.old,
            ts: e.timeStamp,
          };
          handleEventResponse(listeners.tryMove(actionEvent), actionEvent)
          break

      }

      if (newerTix) {
        const moveEvent: TixEvent = {
          action: false,
          move: true,
          newLocation: newerTix,
          oldLocation: tix.new,
          ts: e.timeStamp,
        };

        const moveResponse = listeners.tryMove(moveEvent);

        handleEventResponse(moveResponse, moveEvent);
      }
    },
    [tix, listeners, paused, isCrashed, handleEventResponse]
  );

  useTick((delta) => {
    const now = performance.now();
    updateScreenOffset(delta, anim, setOffset, offset, now);

    handleMovementAnim(
      now,
      lastMoveTs,
      animDone,
      tix,
      setAnim,
      offset,
      spacing
    );

    publishEventAtTheStartOfEachBeat(
      now,
      delta,
      rhythmTime,
      music,
      listeners,
      tix,
      handleEventResponse,
      animDone
    );
  });

  useEffect(() => {
    document.addEventListener("keydown", handleMovement);
    return () => document.removeEventListener("keydown", handleMovement);
  });

  var robotElement;

  if (!!detectedAt) {
    robotElement = <DetectedRobot {...{ spacing, detectedAt, restart }} />;
  } else if (hasWon && animDone.current) {
    robotElement = <ElevatorRobot spacing={spacing} />;
  } else {
    robotElement = isCrashed ? (
      <CrashedRobot spacing={spacing} />
    ) : (
      <HappyRobot spacing={spacing} />
    );
  }

  return (
    <Container x={anim.x} y={anim.y}>
      {robotElement}
      <Container
        filters={[
          new DropShadowFilter({
            pixelSize: 2,
            blur: 2,
            offset: {
              x: 0,
              y: spacing / 10,
            },
            shadowOnly: true,
          }),
        ]}
        anchor={{ x: 0.5, y: 0.5 }}
      >
        <GraphicsElement
          draw={(g: Graphics) => {
            g.clear();
            g.beginFill(0);
            g.drawCircle(0, -5, spacing / 10);
            g.endFill();
          }}
        />
      </Container>
    </Container>
  );
};

function handleMovementAnim(
  now: number,
  lastMoveTs: React.MutableRefObject<number>,
  animDone: React.MutableRefObject<boolean>,
  tix: { new: { x: number; y: number }; old: { x: number; y: number } },
  setAnim: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>,
  offset: { x: number; y: number },
  spacing: number
) {
  const animTime = 100;
  const diff = now - lastMoveTs.current;
  if (diff < animTime) {
    animDone.current = false;
    const animProgress = diff / animTime;
    const deltaX = tix.new.x - tix.old.x;
    const deltaY = tix.new.y - tix.old.y;
    setAnim({
      x: offset.x + spacing * (tix.old.x + deltaX * animProgress),
      y: offset.y + spacing * (tix.old.y + deltaY * animProgress),
    });
  } else {
    animDone.current = true;
    setAnim({
      x: offset.x + tix.new.x * spacing,
      y: offset.y + tix.new.y * spacing,
    });
  }
}

function updateScreenOffset(
  delta: number,
  anim: { x: number; y: number },
  setOffset: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>,
  offset: { x: number; y: number },
  now: number
) {
  const panSpeed = 5 * delta;

  if (anim.x > window.innerWidth * 0.7) {
    setOffset({ x: offset.x - panSpeed, y: offset.y });
  }
  if (anim.x < window.innerWidth * 0.3) {
    setOffset({ x: offset.x + panSpeed, y: offset.y });
  }
  if (anim.y > window.innerHeight * 0.7) {
    setOffset({ y: offset.y - panSpeed, x: offset.x });
  }
  if (anim.y < window.innerHeight * 0.3) {
    setOffset({ y: offset.y + panSpeed, x: offset.x });
  }
}

const publishEventAtTheStartOfEachBeat = (
  now: number,
  delta: number,
  rhythmTime: React.MutableRefObject<{ audioTime: number; jsTime: number }>,
  music: MusicInfo,
  listeners: RobotListenerRegistry,
  tix: { new: Point; old: Point },
  handleEventResponse: (
    moveResponse: EventResponse,
    moveEvent: TixEvent
  ) => void,
  animDone: MutableRefObject<boolean>
) => {
  const cumulativeBeatTimes = [
    ...cumulativeRhythmTimes(music.rhythm),
    { tock: music.rhythm[0].tock, time: sumRhythmTimes(music.rhythm) },
  ];
  const msProgressOfCurrentLoop = currentBeatTime(music, rhythmTime, now);

  const nextBeat = cumulativeBeatTimes.find(
    (b) => b.time > msProgressOfCurrentLoop
  ) ?? { time: 0 };

  if (nextBeat.time - msProgressOfCurrentLoop <= delta * 10) {
    const periodicEvent = {
      action: false,
      move: false,
      newLocation: tix.new,
      oldLocation: animDone.current ? tix.new : tix.old,
      ts: now,
    };

    const response = listeners.tryMove(periodicEvent);

    handleEventResponse(response, periodicEvent);
  }
};
