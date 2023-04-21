import React, { useState } from "react";
import { CrashedRobot } from "./CrashedRobot";
import { Container, useTick } from "@pixi/react";

const animLength = 1000;
const dropTime = 1000;

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

  useTick((delta) => {
    console.log(animProgress);
    if (animProgress > 1) {
      restart();
    } else {
      setAnimProgress(animProgress + (delta * 10) / animLength);
    }
  });

  return (
    <Container>
      <CrashedRobot spacing={spacing} />
    </Container>
  );
};
