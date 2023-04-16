import { Sprite, useTick } from "@pixi/react";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { TixEvent } from "./Events";

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

  const lastKeyPressTs = useRef(0);

  useTick((delta) => {
    const panSpeed = 3 * delta;

    if (anim.x > window.innerWidth * 0.75) {
      setOffset({ x: offset.x - panSpeed, y: offset.y });
    }
    if (anim.x < window.innerWidth * 0.25) {
      setOffset({ x: offset.x + panSpeed, y: offset.y });
    }
    if (anim.y > window.innerHeight * 0.75) {
      setOffset({ y: offset.y - panSpeed, x: offset.x });
    }
    if (anim.y < window.innerHeight * 0.25) {
      setOffset({ y: offset.y + panSpeed, x: offset.x });
    }

    const animTime = 100;
    const diff = performance.now() - lastKeyPressTs.current;
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
    if (e.repeat || paused) {
      return;
    }

    const moveEvent = {
      action: false,
      location: tix.new,
      ts: performance.now(),
    };

    if (!moveIsAllowed(moveEvent)) {
      return;
    }

    switch (e.key) {
      case "w":
      case "ArrowUp":
        setNewTix({ x: tix.new.x, y: tix.new.y - 1 });
        lastKeyPressTs.current = e.timeStamp;
        break;
      case "a":
      case "ArrowLeft":
        setNewTix({ x: tix.new.x - 1, y: tix.new.y });
        lastKeyPressTs.current = e.timeStamp;
        break;
      case "s":
      case "ArrowDown":
        setNewTix({ x: tix.new.x, y: tix.new.y + 1 });
        lastKeyPressTs.current = e.timeStamp;
        break;
      case "d":
      case "ArrowRight":
        setNewTix({ x: tix.new.x + 1, y: tix.new.y });
        lastKeyPressTs.current = e.timeStamp;
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleMovement);
    return () => document.removeEventListener("keydown", handleMovement);
  });

  return (
    <Sprite
      image={`${process.env.PUBLIC_URL}/sprite/robot.jpeg`}
      x={anim.x}
      y={anim.y}
      anchor={{ x: 0.5, y: 1 }}
      scale={{ x: 0.1, y: 0.1 }}
    />
  );
};
