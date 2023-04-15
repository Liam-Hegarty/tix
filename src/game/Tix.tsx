import { Sprite, useTick } from "@pixi/react";
import React, { useEffect, useRef, useState } from "react";
import { TixEvent } from "./Events";

export const Tix = ({
  moveIsAllowed,
  spacing,
}: {
  moveIsAllowed: (e: TixEvent) => boolean;
  spacing: number;
}) => {
  const [tix, setTix] = useState({ new: { x: 0, y: 0 }, old: { x: 0, y: 0 } });
  const setNewTix = (newTix: { x: number; y: number }) => {
    setTix({ old: tix.new, new: newTix });
  };
  const [anim, setAnim] = useState({ x: 0, y: 0 });

  const lastKeyPressTs = useRef(0);

  useTick(() => {
    const animTime = 100;
    const diff = performance.now() - lastKeyPressTs.current;
    if (diff < animTime) {
      setAnim({
        x: tix.old.x + (tix.new.x - tix.old.x) * (diff / animTime),
        y: tix.old.y + (tix.new.y - tix.old.y) * (diff / animTime),
      });
    }
  });

  const handleMovement = (e: any) => {
    console.log(e.timeStamp);

    if (e.repeat) {
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
        setNewTix({ x: tix.new.x, y: tix.new.y - spacing });
        lastKeyPressTs.current = e.timeStamp;
        break;
      case "a":
      case "ArrowLeft":
        setNewTix({ x: tix.new.x - spacing, y: tix.new.y });
        lastKeyPressTs.current = e.timeStamp;
        break;
      case "s":
      case "ArrowDown":
        setNewTix({ x: tix.new.x, y: tix.new.y + spacing });
        lastKeyPressTs.current = e.timeStamp;
        break;
      case "d":
      case "ArrowRight":
        setNewTix({ x: tix.new.x + spacing, y: tix.new.y });
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
      anchor={{ x: 0.5, y: 0.5 }}
      scale={{ x: 0.1, y: 0.1 }}
    />
  );
};
