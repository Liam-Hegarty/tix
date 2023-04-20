import React, { useCallback, useState } from "react";
import { Point, ScannerDrone } from "../levels/Level";
import { Container, Sprite, useTick } from "@pixi/react";
import { Graphics as GraphicsElement } from "@pixi/react";
import { Graphics } from "@pixi/graphics";
import { DropShadowFilter } from "@pixi/filter-drop-shadow";

const Drone = ({
  drone,
  spacing,
  offset,
}: {
  drone: ScannerDrone;
  spacing: number;
  offset: Point;
}) => {
  const [wobble, setWobble] = useState({ x: 0, y: 0 });

  useTick(() => {
    const now = performance.now() / 250;
    setWobble({
      x: Math.sin(now) * 5,
      y: Math.cos(now) * 2.5,
    });
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
        spacing / 5
      );
      g.endFill();
    },
    [drone, spacing, offset]
  );

  const shadowY =
    (drone.area.topLeft.y + drone.area.height / 2 - drone.location.y - 0.5) *
    spacing;

  return (
    <>
      <GraphicsElement draw={scanArea} />
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
          x={drone.location.x * spacing + offset.x + wobble.x}
          y={drone.location.y * spacing + offset.y + wobble.y}
          anchor={{ x: 0.5, y: 0.5 }}
          scale={{ x: 0.1 * (spacing / 100), y: 0.1 * (spacing / 100) }}
        />
      </Container>
    </>
  );
};

export const ScannerDrones = ({
  drones,
  spacing,
  offset,
}: {
  drones: ScannerDrone[];
  spacing: number;
  offset: Point;
}) => {
  return (
    <>
      {drones.map((drone, i) => (
        <Drone key={`scan-${i}`} {...{ drone, spacing, offset }} />
      ))}
    </>
  );
};
