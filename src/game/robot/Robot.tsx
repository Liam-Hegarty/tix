import { Container, useTick } from "@pixi/react";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { TixEvent } from "../events/Events";
import { CrashedRobot } from "./CrashedRobot";
import { HappyRobot } from "./HappyRobot";
import { RobotListenerRegistry } from "../events/robotListenerRegistry";
import { DropShadowFilter } from "@pixi/filter-drop-shadow";
import { Graphics as GraphicsElement } from "@pixi/react";
import { Graphics } from "@pixi/graphics";
import { DetectedRobot } from "./DetectedRobot";
import { ElevatorRobot } from "./ElevatorRobot";

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
}: {
  listeners: RobotListenerRegistry;
  spacing: number;
  offset: { x: number; y: number };
  setOffset: Dispatch<SetStateAction<{ x: number; y: number }>>;
  start: { x: number; y: number };
  paused: boolean;
  restart: () => void;
  nextLevel: () => void;
}) => {
  const [tix, setTix] = useState({ new: start, old: start });
  const setNewTix = (newTix: { x: number; y: number }) => {
    setTix({ old: tix.new, new: newTix });
  };
  const [anim, setAnim] = useState({
    x: offset.x + start.x * spacing,
    y: offset.y + start.y * spacing,
  });
  const [crashedUntil, setCrashedUntil] = useState(-1000);
  const [detectedAt, setDetectedAt] = useState();
  const [hasWon, setHasWon] = useState(false);
  const animDone = useRef(true);
  const isFrozen = useRef(false);

  const isCrashed = performance.now() < crashedUntil;

  const lastMoveTs = useRef(-100000);

  useTick((delta) => {
    const panSpeed = 5 * delta;
    const now = performance.now();

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
  });

  const handleMovement = (e: any) => {
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
    }

    if (newerTix) {
      const moveEvent: TixEvent = {
        action: false,
        newLocation: newerTix,
        oldLocation: tix.new,
        ts: e.timeStamp,
      };

      const moveResponse = listeners.tryMove(moveEvent);

      if (moveResponse.canMove) {
        animDone.current = false;
        setNewTix(newerTix);
        lastMoveTs.current = moveEvent.ts;
      }
      if (moveResponse.crashed) {
        crashSound.play();
        setCrashedUntil(e.timeStamp + 1000);
      }
      if (moveResponse.detected) {
        detectedSound.play();
        setDetectedAt(e.timeStamp);
      }
      if (moveResponse.frozen) {
        isFrozen.current = true;
      }
      if (moveResponse.win) {
        setTimeout(nextLevel, 2000);
        setHasWon(true);
      }
    }
  };

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
