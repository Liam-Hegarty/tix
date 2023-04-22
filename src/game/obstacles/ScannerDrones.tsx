import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Point, ScannerDrone } from "../levels/Level";
import { Container, Sprite, useTick } from "@pixi/react";
import { Graphics as GraphicsElement } from "@pixi/react";
import { Graphics } from "@pixi/graphics";
import { DropShadowFilter } from "@pixi/filter-drop-shadow";
import {
  RobotListener,
  RobotListenerRegistry,
} from "../events/robotListenerRegistry";
import { EventResponse, TixEvent } from "../events/Events";

type RobotFound = {
  where: Point;
  when: number;
};

const droneListener =
  ({
    topLeft,
    width,
    height,
    setRobotFound,
  }: {
    topLeft: Point;
    width: number;
    height: number;
    setRobotFound: Dispatch<SetStateAction<RobotFound | undefined>>;
  }): RobotListener =>
  (e: TixEvent, r: EventResponse) => {
    if (
      e.oldLocation.x >= topLeft.x &&
      e.oldLocation.y >= topLeft.y &&
      e.oldLocation.x < topLeft.x + width &&
      e.oldLocation.y < topLeft.y + height
    ) {
      if (r.crashed) {
        setRobotFound({ where: e.oldLocation, when: e.ts });
        return {
          detected: true,
          frozen: true,
        };
      } else {
        return {};
      }
    } else {
      return {};
    }
  };

const Drone = ({
  drone,
  spacing,
  offset,
  listenerRegistry,
}: {
  drone: ScannerDrone;
  spacing: number;
  offset: Point;
  listenerRegistry: RobotListenerRegistry;
}) => {
  const [wobble, setWobble] = useState({ x: 0, y: 0 });
  const [robotFound, setRobotFound] = useState<RobotFound>();
  const droneStartLocation = {
    x: drone.location.x * spacing + offset.x,
    y: drone.location.y * spacing + offset.y,
  };

  useEffect(() => {
    const droneId = `drone-${JSON.stringify(drone.area)}`;
    listenerRegistry.register(
      droneId,
      droneListener({ ...drone.area, setRobotFound }),
      -10
    );
    return () => listenerRegistry.deregister(droneId);
  }, [drone, listenerRegistry]);

  useTick((delta) => {
    if (robotFound) {
      const robotLocation = {
        x: (robotFound.where.x * spacing) + offset.x,
        y: (robotFound.where.y * (spacing - 0.5)) + offset.y,
      };
      const movementVector = {
        x: robotLocation.x - droneStartLocation.x,
        y: robotLocation.y - droneStartLocation.y,
      };
      const animDelta = delta / 75;
      setWobble({
        x: wobble.x + movementVector.x * animDelta,
        y: wobble.y + movementVector.y * animDelta,
      });
    } else {
      const now = performance.now() / 250;
      setWobble({
        x: Math.sin(now) * 5,
        y: Math.cos(now) * 2.5,
      });
    }
  });

  const scanArea = useCallback(
    (g: Graphics) => {
      g.clear();
      g.beginFill(0xff0000, 0.3);
      g.drawRoundedRect(
        (drone.area.topLeft.x - 0.5) * spacing + offset.x,
        (drone.area.topLeft.y - 0.5) * spacing + offset.y,
        drone.area.width * spacing,
        drone.area.height * spacing,
        spacing
      );
      g.endFill();
    },
    [drone, spacing, offset]
  );

  const spotlight = useCallback(
    ({ x, y }: Point) =>
      (g: Graphics) => {
        g.clear();
        g.beginFill(0xff0000, 0.5);
        g.drawCircle(
          x * spacing + offset.x,
          y * spacing + offset.y,
          spacing / 3
        );
        g.endFill();
      },
    [offset, spacing]
  );

  const shadowY =
    (drone.area.topLeft.y + drone.area.height / 2 - drone.location.y - 0.5) *
    spacing;

  return (
    <>
      <GraphicsElement
        draw={!!robotFound ? spotlight(robotFound.where) : scanArea}
      />
      <Container
        filters={[
          new DropShadowFilter({
            pixelSize: 2,
            offset: {
              x: 0,
              y: shadowY,
            },
          }),
        ]}
      >
        <Sprite
          image={`${process.env.PUBLIC_URL}/sprite/drone.png`}
          x={droneStartLocation.x + wobble.x}
          y={droneStartLocation.y + wobble.y}
          anchor={{ x: 0.5, y: 0.5 }}
          scale={{ x: 0.08 * (spacing / 100), y: 0.08 * (spacing / 100) }}
        />
        {!!robotFound && (
          <Sprite
            image={`${process.env.PUBLIC_URL}/sprite/mini/exclamation.png`}
            scale={{ x: 0.01 * (spacing / 50), y: 0.01 * (spacing / 50) }}
            x={drone.location.x * spacing + offset.x + wobble.x}
            y={(drone.location.y - 0.5) * spacing + offset.y + wobble.y}
            anchor={{ x: 0.5, y: 1 }}
          />
        )}
      </Container>
    </>
  );
};

export const ScannerDrones = ({
  drones,
  spacing,
  offset,
  listenerRegistry,
}: {
  drones: ScannerDrone[];
  spacing: number;
  offset: Point;
  listenerRegistry: RobotListenerRegistry;
}) => {
  return (
    <>
      {drones.map((drone, i) => (
        <Drone
          key={`scan-${i}`}
          {...{ drone, spacing, offset, listenerRegistry }}
        />
      ))}
    </>
  );
};
