import { AnimatedSprite, Container, Sprite } from "@pixi/react";
import React from "react";
import { HappyFace } from "./faces";
import colors from "../../palette";

export const HappyRobot = ({ spacing }: { spacing: number }) => {
  return (
    <>
      <Sprite
        image={`${process.env.PUBLIC_URL}/sprite/robot.png`}
        anchor={{ x: 0.5, y: 1 }}
        scale={{ x: 0.05 * (spacing / 100), y: 0.05 * (spacing / 100) }}
      />
      <Container x={-0.06 * spacing} y={-0.55 * spacing} height={9} width={11}>
        <HappyFace color={colors.darkBlue} size={spacing / 100} />
      </Container>
      <AnimatedSprite
        images={[
          `${process.env.PUBLIC_URL}/sprite/longarms.png`,
          `${process.env.PUBLIC_URL}/sprite/shortarms.png`,
        ]}
        x={0}
        y={-spacing * 0.32}
        anchor={{ x: 0.5, y: 0.5 }}
        scale={{ x: 0.05 * (spacing / 100), y: 0.05 * (spacing / 100) }}
        isPlaying={true}
        initialFrame={0}
        animationSpeed={0.02}
      />
    </>
  );
};
