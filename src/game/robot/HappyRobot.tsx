import { Container, Sprite } from "@pixi/react";
import React from "react";
import { HappyFace } from "./faces";
import colors from "../../palette";

export const HappyRobot = () => {
  return (
    <>
      <Sprite
        image={`${process.env.PUBLIC_URL}/sprite/robot.png`}
        anchor={{ x: 0.5, y: 1 }}
        scale={{ x: 0.05, y: 0.05 }}
      />
      <Container x={-6} y={-55} height={9} width={11}>
        <HappyFace color={colors.darkBlue} />
      </Container>
    </>
  );
};
