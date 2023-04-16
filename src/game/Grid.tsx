import React from "react";
import { Level } from "./levels/Level";
import { Graphics as GraphicsElement } from "@pixi/react";
import { Graphics } from "@pixi/graphics";
import colors from "../palette";

export const Grid = ({
  level,
  spacing,
  offset,
}: {
  level: Level;
  spacing: number;
  offset: { x: number; y: number };
}) => {
  const dot = (x: number, y: number) => (g: Graphics) => {
    g.clear();

    if (level.grid[y + 1] && level.grid[y + 1][x]) {
      g.lineStyle(3, colors.black, 1);
      g.moveTo(offset.x + x * spacing, offset.y + y * spacing);
      g.lineTo(offset.x + x * spacing, offset.y + (y + 1) * spacing);
    }

    if (level.grid[y][x + 1]) {
      g.lineStyle(3, colors.black, 1);
      g.moveTo(offset.x + x * spacing, offset.y + y * spacing);
      g.lineTo(offset.x + (x + 1) * spacing, offset.y + y * spacing);
    }

    g.lineStyle(1, colors.black, 1);
    g.beginFill(colors.black);
    g.drawCircle(offset.x + x * spacing, offset.y + y * spacing, 5);
    g.endFill();
  };

  const tile = (x: number, y: number, isTile: boolean) => (g: Graphics) => {
    g.clear();

    const borderColor = isTile ? 0xaaaaaa : colors.black;
    const fillColor = isTile ? colors.lightBlue : colors.black;

    g.lineStyle(1, borderColor, 1);
    g.beginFill(fillColor);
    g.drawRect(
      offset.x + (x - 0.5) * spacing,
      offset.y + (y - 0.5) * spacing,
      spacing,
      spacing
    );
    g.endFill();
  };

  return (
    <>
      {level.grid.map((row, y) =>
        row.map((point, x) => (
          <GraphicsElement
            key={`grid-tile-${x}-${y}`}
            draw={tile(x, y, point)}
          />
        ))
      )}
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
