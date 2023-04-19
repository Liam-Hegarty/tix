import { Container, useTick } from "@pixi/react";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { TixEvent } from "../Events";
import { CrashedRobot } from "./CrashedRobot";
import { HappyRobot } from "./HappyRobot";

const crashSound = new Audio(`${process.env.PUBLIC_URL}/audio/crash.mp3`);

export const Robot = ({
  moveIsAllowed,
  spacing,
  offset,
  setOffset,
  start,
  paused,
}: {
  moveIsAllowed: (e: TixEvent) => boolean;
  spacing: number;
  offset: { x: number; y: number };
  setOffset: Dispatch<SetStateAction<{ x: number; y: number }>>;
  start: { x: number; y: number };
  paused: boolean;
}) => {
  const [tix, setTix] = useState({ new: start, old: start });
  const setNewTix = (newTix: { x: number; y: number }) => {
    setTix({ old: tix.new, new: newTix });
  };
  const [anim, setAnim] = useState({
    x: offset.x + start.x * spacing,
    y: offset.y + start.y * spacing,
  });
  const crashPenalty = 1000;
  const [isCrashed, setIsCrashed] = useState(false);

  const lastMoveTs = useRef(-100000);
  const lastCrashTs = useRef(-100000);

  useTick((delta) => {
    const panSpeed = 5 * delta;
    const now = performance.now();

    if (isCrashed && now > lastCrashTs.current + crashPenalty) {
      setIsCrashed(false);
    }

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
      const animProgress = diff / animTime;
      const deltaX = tix.new.x - tix.old.x;
      const deltaY = tix.new.y - tix.old.y;
      setAnim({
        x: offset.x + spacing * (tix.old.x + deltaX * animProgress),
        y: offset.y + spacing * (tix.old.y + deltaY * animProgress),
      });
    } else {
      setAnim({
        x: offset.x + tix.new.x * spacing,
        y: offset.y + tix.new.y * spacing,
      });
    }
  });

  const handleMovement = (e: any) => {
    if (e.repeat || paused || isCrashed) {
      return;
    }

    var newTix;

    switch (e.key) {
      case "w":
      case "ArrowUp":
        newTix = { x: tix.new.x, y: tix.new.y - 1 };
        break;
      case "a":
      case "ArrowLeft":
        newTix = { x: tix.new.x - 1, y: tix.new.y };
        break;
      case "s":
      case "ArrowDown":
        newTix = { x: tix.new.x, y: tix.new.y + 1 };
        break;
      case "d":
      case "ArrowRight":
        newTix = { x: tix.new.x + 1, y: tix.new.y };
        break;
    }

    if (newTix) {
      const moveEvent: TixEvent = {
        action: false,
        location: newTix,
        ts: e.timeStamp,
      };

      if (moveIsAllowed(moveEvent)) {
        setNewTix(newTix);
        lastMoveTs.current = moveEvent.ts;
      } else {
        lastCrashTs.current = moveEvent.ts;
        crashSound.play();
        setIsCrashed(true);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleMovement);
    return () => document.removeEventListener("keydown", handleMovement);
  });

  return (
    <Container x={anim.x} y={anim.y}>
      {isCrashed ? <CrashedRobot {...{ spacing }} /> : <HappyRobot />}
    </Container>
  );
};
