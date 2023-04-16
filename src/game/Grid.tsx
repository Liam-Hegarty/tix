import React from "react";
import { Level } from "./levels/Level";
import { Graphics as GraphicsElement } from "@pixi/react";
import { Graphics } from "@pixi/graphics";
import colors from "../Palette";
import palette from "../Palette";

export const Grid = ({
  level,
  spacing,
  offset,
}: {
  level: Level;
  spacing: number;
  offset: { x: number; y: number };
}) => {
  const floorMarks = (g: Graphics, x: number, y: number) => {
    const pixelWidth = 3;

    var varX = x;
    var varY = y;
    g.beginFill(palette.darkBlue);

    for (let i = 0; i < 15; i++) {
      g.drawRect(varX, varY, pixelWidth, pixelWidth);

      varX += pixelWidth;
      varY -= pixelWidth;
    }
    g.endFill();
  };

  const dot = (x: number, y: number) => (g: Graphics) => {
    g.clear();

    [
      { x: 20, y: 20 },
      { x: 15, y: -35 },
      { x: -20, y: -30 },
    ].map((c) =>
      floorMarks(g, offset.x + x * spacing + c.x, offset.y + y * spacing + c.y)
    );

    if (level.grid[y + 1] && level.grid[y + 1][x]) {
      g.lineStyle(2, 0x000000, 1);
      g.moveTo(offset.x + x * spacing, offset.y + y * spacing);
      g.lineTo(offset.x + x * spacing, offset.y + (y + 1) * spacing);
      if (offset.x + x * spacing < window.innerWidth / 2) {
        g.lineStyle(2, colors.darkBlue, 1);
        g.moveTo(offset.x + x * spacing - 2, offset.y + y * spacing);
        g.lineTo(offset.x + x * spacing - 2, offset.y + (y + 1) * spacing);
      } else {
        g.lineStyle(2, colors.darkBlue, 1);
        g.moveTo(offset.x + x * spacing + 2, offset.y + y * spacing);
        g.lineTo(offset.x + x * spacing + 2, offset.y + (y + 1) * spacing);
      }
    }
    if (level.grid[y][x + 1]) {
      g.lineStyle(2, 0x000000, 1);
      g.moveTo(offset.x + x * spacing, offset.y + y * spacing);
      g.lineTo(offset.x + (x + 1) * spacing, offset.y + y * spacing);
      g.lineStyle(2, colors.darkBlue, 1);
      g.moveTo(offset.x + x * spacing, offset.y + y * spacing - 2);
      g.lineTo(offset.x + (x + 1) * spacing, offset.y + y * spacing - 2);
    }
    g.lineStyle(1, 0x000, 1);
    g.beginFill(0x000000);
    g.drawCircle(offset.x + x * spacing, offset.y + y * spacing, 5);
    g.endFill();
  };

  return (
    <>
      {level.grid.map((row, y) =>
        row.map(
          (point, x) =>
            point && (
              <GraphicsElement key={`grid-point-${x}-${y}`} draw={dot(x, y)} />
            )
        )
      )}
    </>
  );
};
