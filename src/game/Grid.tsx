import React from "react";
import { Level } from "./levels/Level";
import { Graphics as GraphicsElement } from "@pixi/react";
import { Graphics } from "@pixi/graphics";

export const Grid = ({ level, spacing, offset }: { level: Level; spacing: number, offset: { x: number, y: number } }) => {
  const dot = (x: number, y: number) => (g: Graphics) => {
    g.clear();
    g.beginFill(0x000000);
    g.lineStyle();
    g.drawCircle(offset.x + (x * spacing), offset.y + (y * spacing), 4);
    g.endFill();
    console.log(x, y);
    if (level.grid[y + 1] && level.grid[y + 1][x]) {
      g.lineStyle(2, 0x000000, 1);
      g.moveTo(offset.x + (x * spacing), offset.y + (y * spacing));
      g.lineTo(offset.x + (x * spacing), offset.y + ((y + 1) * spacing));
    }
    if (level.grid[y][x + 1]) {
      g.lineStyle(2, 0x000000, 1);
      g.moveTo(offset.x + (x * spacing), offset.y + (y * spacing));
      g.lineTo(offset.x + ((x + 1) * spacing), offset.y + (y * spacing));
    }
  };

  return (
    <>
      {level.grid.map((row, y) =>
        row.map((point, x) => {
          if (point) {
            return (
              <GraphicsElement key={`grid-point-${x}-${y}`} draw={dot(x, y)} />
            );
          }
        })
      )}
    </>
  );
};
