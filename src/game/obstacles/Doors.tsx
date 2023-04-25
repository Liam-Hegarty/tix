import { EventResponse, TixEvent } from "../events/Events";
import { RobotListenerRegistry } from "../events/robotListenerRegistry";
import { Point } from "../levels/LevelTypes";
import { AnimatedSprite } from "@pixi/react";
import React, { useCallback, useEffect, useState } from "react";

const areAdjacent = (p1: Point, p2: Point) =>
  (p1.x === p2.x || p1.y === p2.y) &&
  (Math.abs(p1.x - p2.x) === 1 || Math.abs(p1.y - p2.y) === 1);

const Door = ({
  x,
  y,
  spacing,
  offset,
  listenerRegistry,
}: {
  x: number;
  y: number;
  spacing: number;
  offset: Point;
  listenerRegistry: RobotListenerRegistry;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const cantMoveThroughWhenClosed = useCallback(
    (e: TixEvent): Partial<EventResponse> => {
      if (!isOpen && e.newLocation.x === x && e.newLocation.y === y) {
        return {
          canMove: false,
          crashed: true,
        };
      } else {
        return {};
      }
    },
    [x, y, isOpen]
  );

  const openDoor = useCallback(
    (e: TixEvent, r: EventResponse) => {
      if (!r.crashed && e.action && areAdjacent(e.newLocation, { x, y })) {
        setIsOpen(true);
      }
      return {};
    },
    [setIsOpen, x, y]
  );

  useEffect(() => {
    const doorId = `door-${x}-${y}`;
    listenerRegistry.register(`${doorId}-1`, cantMoveThroughWhenClosed);
    listenerRegistry.register(`${doorId}-2`, openDoor);
    return () => {
      listenerRegistry.deregister(`${doorId}-1`);
      listenerRegistry.deregister(`${doorId}-2`);
    };
  }, [listenerRegistry, setIsOpen, x, y, cantMoveThroughWhenClosed, openDoor]);

  return (
    <AnimatedSprite
      x={x * spacing + offset.x - spacing / 2}
      y={y * spacing + offset.y - spacing / 4}
      images={[
        `${process.env.PUBLIC_URL}/sprite/door/door-closed.png`,
        `${process.env.PUBLIC_URL}/sprite/door/door-half.png`,
        `${process.env.PUBLIC_URL}/sprite/door/door-open.png`,
      ]}
      isPlaying={isOpen}
      loop={false}
      scale={{ x: 0.078 * (spacing / 100), y: 0.078 * (spacing / 100) }}
    />
  );
};

export const Doors = ({
  coords,
  listenerRegistry,
  spacing,
  offset,
}: {
  coords: Point[];
  listenerRegistry: RobotListenerRegistry;
  spacing: number;
  offset: Point;
}) => {
  return (
    <>
      {coords.map((p) => (
        <Door
          key={`door-elemet-${p.x}-${p.y}`}
          {...{
            x: p.x,
            y: p.y,
            listenerRegistry,
            spacing,
            offset,
          }}
        />
      ))}
    </>
  );
};
