import { TilingSprite } from "@pixi/react";
import React from "react";
import { Point } from "../levels/Level";

export const StripedTile = ({
  x,
  y,
  spacing,
  offset,
}: {
  x: number;
  y: number;
  spacing: number;
  offset: Point;
}) => {
  const tileScale = 0.0054 * spacing;

  return (
    <>
      <TilingSprite
        x={offset.x + (x - 0.5) * spacing}
        y={offset.y + (y - 0.5) * spacing}
        image={`${process.env.PUBLIC_URL}/texture/stripes.png`}
        width={10 * spacing}
        height={0.5 * spacing}
        scale={0.1}
        tileScale={tileScale}
        tilePosition={{ x: 1, y: 1 }}
        anchor={{ x: 0, y: 0 }}
      />
      <TilingSprite
        x={offset.x + (x - 0.5) * spacing}
        y={offset.y + (y + 0.5) * spacing}
        image={`${process.env.PUBLIC_URL}/texture/stripes.png`}
        width={10 * spacing}
        height={0.5 * spacing}
        scale={0.1}
        tileScale={tileScale}
        tilePosition={{ x: 0, y: 0 }}
        anchor={{ x: 0, y: 1 }}
      />
      <TilingSprite
        x={offset.x + (x + 0.5) * spacing}
        y={offset.y + (y - 0.5) * spacing}
        image={`${process.env.PUBLIC_URL}/texture/stripes.png`}
        width={0.5 * spacing}
        height={10 * spacing}
        scale={0.1}
        tileScale={tileScale}
        tilePosition={{ x: 0, y: 0 }}
        anchor={{ x: 1, y: 0 }}
      />
      <TilingSprite
        x={offset.x + (x - 0.5) * spacing}
        y={offset.y + (y - 0.5) * spacing}
        image={`${process.env.PUBLIC_URL}/texture/stripes.png`}
        width={0.5 * spacing}
        height={10 * spacing}
        scale={0.1}
        tileScale={tileScale}
        tilePosition={{ x: 0, y: 0 }}
      />
    </>
  );
};
