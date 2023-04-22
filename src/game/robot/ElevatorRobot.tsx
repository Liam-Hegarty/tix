import { Container, Sprite, useTick } from "@pixi/react";
import React, { useState } from "react";
import { WinFace } from "./faces";
import colors from "../../palette";
import { StripedTile } from "../tiles/StripedTile";

export const ElevatorRobot = ({ spacing }: { spacing: number }) => {

  const [height, setHeight] = useState(0);

  useTick(() => {
    
  })

  return (
    <Container>
      <StripedTile x={0} y={0} offset={{x:0, y:0}} spacing={spacing} />
      <Sprite
        image={`${process.env.PUBLIC_URL}/sprite/robot.png`}
        anchor={{ x: 0.5, y: 1 }}
        scale={{ x: 0.05 * (spacing / 100), y: 0.05 * (spacing / 100) }}
      />
      <Container x={-0.06 * spacing} y={-0.55 * spacing} height={9} width={11}>
        <WinFace color={colors.darkBlue} size={spacing / 100} />
      </Container>
    </Container>
  );
};
