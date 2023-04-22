import React, { useCallback } from "react";
import { Level } from "../levels/Level";
import { Sprite, Graphics as GraphicsElement } from "@pixi/react";
import { Graphics } from "@pixi/graphics";
import colors from "../../palette";
import { StripedTile } from "./StripedTile";

const Tiles = ({
  grid,
  offset,
  spacing,
}: {
  grid: boolean[][];
  offset: { x: number; y: number };
  spacing: number;
}) => {
  return (
    <>
      {grid.map((row, y) =>
        row.map(
          (point, x) =>
            !!point && (
              <Sprite
                key={`grid-tile-${x}-${y}`}
                x={(x - 0.5) * spacing + offset.x}
                y={(y - 0.5) * spacing + offset.y}
                scale={spacing / 1280}
                image={`${process.env.PUBLIC_URL}/texture/floor.png`}
              />
            )
        )
      )}
    </>
  );
};

const Walls = ({
  grid,
  offset,
  spacing,
}: {
  grid: boolean[][];
  offset: { x: number; y: number };
  spacing: number;
}) => {
  const wall = useCallback(
    (x: number, y: number) => (g: Graphics) => {
      const centrePoint = {
        x: offset.x + x * spacing,
        y: offset.y + y * spacing,
      };

      g.clear();
      if (y === 0 || !grid[y - 1][x]) {
        g.beginFill(colors.darkBlue);
        g.lineStyle(1, colors.black, 1);
        g.drawRect(
          centrePoint.x - spacing / 2,
          centrePoint.y - spacing * 1.25,
          spacing,
          spacing * 0.75
        );
        g.endFill();
      }
    },
    [grid, spacing, offset]
  );

  return (
    <>
      {grid.map((row, y) =>
        row.map(
          (point, x) =>
            point && (
              <GraphicsElement key={`wall-${x}-${y}`} draw={wall(x, y)} />
            )
        )
      )}
    </>
  );
};

const Rails = ({
  grid,
  offset,
  spacing,
}: {
  grid: boolean[][];
  offset: { x: number; y: number };
  spacing: number;
}) => {
  const dot = useCallback(
    (x: number, y: number) => (g: Graphics) => {
      g.clear();

      const centrePoint = {
        x: offset.x + x * spacing,
        y: offset.y + y * spacing,
      };

      if (
        centrePoint.x < 0 - spacing ||
        centrePoint.y < 0 - spacing ||
        centrePoint.x > window.innerWidth + spacing ||
        centrePoint.y > window.innerHeight + spacing
      ) {
        return;
      }

      if (grid[y + 1] && grid[y + 1][x]) {
        g.lineStyle(3, colors.black, 1);
        g.moveTo(centrePoint.x, centrePoint.y);
        g.lineTo(centrePoint.x, centrePoint.y + spacing);
      }

      if (grid[y][x + 1]) {
        g.lineStyle(3, colors.black, 1);
        g.moveTo(centrePoint.x, centrePoint.y);
        g.lineTo(centrePoint.x + spacing, centrePoint.y);
      }

      g.lineStyle(1, colors.black, 1);
      g.beginFill(colors.black);
      g.drawCircle(centrePoint.x, centrePoint.y, 5);
      g.endFill();
    },
    [grid, offset, spacing]
  );

  return (
    <>
      {grid.map((row, y) =>
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

export const Grid = ({
  level,
  spacing,
  offset,
}: {
  level: Level;
  spacing: number;
  offset: { x: number; y: number };
}) => {
  return (
    <>
      <Tiles grid={level.grid} offset={offset} spacing={spacing} />
      <StripedTile
        x={level.start.x}
        y={level.start.y}
        spacing={spacing}
        offset={offset}
      />
      <StripedTile
        x={level.end.x}
        y={level.end.y}
        spacing={spacing}
        offset={offset}
      />
      <Walls grid={level.grid} offset={offset} spacing={spacing} />
      <Rails grid={level.grid} offset={offset} spacing={spacing} />
    </>
  );
};
