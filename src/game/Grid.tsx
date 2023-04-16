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

    const centrePoint = {
      x: offset.x + x * spacing,
      y: offset.y + y * spacing,
    };

    if (level.grid[y + 1] && level.grid[y + 1][x]) {
      g.lineStyle(3, colors.black, 1);
      g.moveTo(centrePoint.x, centrePoint.y);
      g.lineTo(centrePoint.x, centrePoint.y + spacing);
    }

    if (level.grid[y][x + 1]) {
      g.lineStyle(3, colors.black, 1);
      g.moveTo(centrePoint.x, centrePoint.y);
      g.lineTo(centrePoint.x + spacing, centrePoint.y);
    }

    g.lineStyle(1, colors.black, 1);
    g.beginFill(colors.black);
    g.drawCircle(centrePoint.x, centrePoint.y, 5);
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

  const wall = (x: number, y: number) => (g: Graphics) => {
    const centrePoint = {
      x: offset.x + x * spacing,
      y: offset.y + y * spacing,
    };

    g.clear();
    console.log({ x, y });
    if (y === 0 || !level.grid[y - 1][x]) {
      console.log({ x, y });
      g.beginFill(colors.darkBlue);
      g.lineStyle(colors.black);
      g.drawRect(
        centrePoint.x - spacing / 2,
        centrePoint.y - spacing,
        spacing,
        spacing / 2
      );
      g.endFill();
    }
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
              <GraphicsElement key={`wall-${x}-${y}`} draw={wall(x, y)} />
            )
        )
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
