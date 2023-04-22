import React, { useCallback, useState } from "react";
import { CrashedRobot } from "./CrashedRobot";
import { Container, useTick } from "@pixi/react";
import { Graphics } from "@pixi/graphics";
import { Graphics as GraphicsElement } from "@pixi/react";
import palette from "../../palette";

const openTime = 0.5;
const dropTime = 0.75;
const animLength = 1000;

export const DetectedRobot = ({
  spacing,
  detectedAt,
  restart,
}: {
  spacing: number;
  detectedAt: number;
  restart: () => void;
}) => {
  const [animProgress, setAnimProgress] = useState(0);
  const maskRef = React.useRef<Graphics>();

  useTick(() => {
    if (animProgress > 1) {
      restart();
    } else {
      setAnimProgress((performance.now() - detectedAt) / animLength);
    }
  });

  const cropMask = useCallback(
    (g: Graphics) => {
      g.clear();
      g.beginFill(0x000000);
      g.drawRect(-spacing / 2, -spacing, spacing, spacing * 1.5);
      g.endFill();
    },
    [spacing]
  );

  const drawOpening = useCallback(
    (animProgress: number) => (g: Graphics) => {
      const openProgress = Math.max(Math.min(animProgress / openTime, 1), 0);

      const halfStep = spacing / 2;

      g.clear();
      g.beginFill(palette.black);
      g.drawRect(
        -halfStep * openProgress,
        -halfStep,
        spacing * openProgress,
        spacing
      );
      g.drawRect(
        -halfStep,
        -halfStep * openProgress,
        spacing,
        spacing * openProgress
      );
      g.endFill();
    },
    [spacing]
  );

  const dropProgress = Math.max((animProgress - dropTime) / (1 - dropTime), 0);

  return (
    <Container mask={maskRef.current}>
      <GraphicsElement draw={drawOpening(animProgress)} />
      <Container position={[0, 2 * spacing * dropProgress]}>
        <CrashedRobot spacing={spacing} />
      </Container>
      <GraphicsElement
        draw={cropMask}
        ref={(r) => {
          if (r) {
            maskRef.current = r;
          }
        }}
      />
    </Container>
  );
};
