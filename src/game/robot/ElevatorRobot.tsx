import {
  Container,
  Sprite,
  useTick,
  Graphics as GraphicsElement,
} from "@pixi/react";
import React, { useState } from "react";
import { WinFace } from "./faces";
import colors from "../../palette";
import { StripedTile } from "../tiles/StripedTile";
import { Graphics } from "@pixi/graphics";
import palette from "../../palette";

export const ElevatorRobot = ({ spacing }: { spacing: number }) => {
  const [height, setHeight] = useState(0);

  useTick((delta) => {
    setHeight(height + delta * 3);
  });

  return (
    <Container y={-height}>
      <Sprite
        key={`grid-tile-elevator`}
        scale={spacing / 1280}
        image={`${process.env.PUBLIC_URL}/texture/floor.png`}
        anchor={{ x: 0.5, y: 0.5 }}
      />
      <StripedTile x={0} y={0} offset={{ x: 0, y: 0 }} spacing={spacing} />
      <GraphicsElement
        draw={(g: Graphics) => {
          g.clear();
          g.beginFill(palette.darkBlue);
          g.drawRect(-spacing / 2, spacing / 2, spacing, spacing / 5);
          g.endFill();
        }}
      />
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
