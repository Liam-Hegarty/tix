import { Container, Sprite, useTick } from "@pixi/react";
import React, { useState } from "react";
import { SadFace } from "./faces";
import colors from "../../palette";

export const CrashedRobot = ({ spacing }: { spacing: number }) => {
  const [rotation, setRotation] = useState(0);

  useTick((delta) => {
    setRotation(rotation + delta / 2);
  });

  return (
    <Container rotation={Math.sin(rotation) / 3}>
      <Sprite
        image={`${process.env.PUBLIC_URL}/sprite/robot.png`}
        anchor={{ x: 0.5, y: 1 }}
        scale={{ x: 0.05, y: 0.05 }}
      />
      <Container x={-0.06 * spacing} y={-0.55 * spacing}>
        <SadFace color={colors.darkBlue} />
      </Container>
      <Sprite
        image={`${process.env.PUBLIC_URL}/sprite/mini/exclamation.png`}
        x={spacing / 16}
        y={-0.8 * spacing}
        anchor={{ x: 0, y: 0 }}
        scale={{ x: 0.01, y: 0.01 }}
        rotation={0.25}
      />
      <Sprite
        image={`${process.env.PUBLIC_URL}/sprite/mini/swirl.png`}
        x={-(spacing / 16)}
        y={-0.65 * spacing}
        anchor={{ x: 1, y: 1 }}
        scale={{ x: 0.008, y: 0.008 }}
      />
    </Container>
  );
};
