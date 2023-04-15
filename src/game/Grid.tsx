import React, { useCallback } from "react";
import { Level } from "./levels/Level";
import { Graphics as GraphicsElement } from "@pixi/react";
import { Graphics } from "@pixi/graphics";

export const Grid = ({ level, spacing }: { level: Level; spacing: number }) => {
  const dot = (x: number, y: number) => (g: Graphics) => {
    g.clear();
    g.beginFill(0x000000);
    g.lineStyle();
    g.drawCircle(x, y, 2);
    g.endFill();
  };

  return (
    <>
      {level.grid.map((row, y) =>
        row.map((point, x) => {
          if (point) {
            return (
              <GraphicsElement
                key={`grid-point-${x}-${y}`}
                draw={dot(x * spacing, y * spacing)}
              />
            );
          }
        })
      )}
    </>
  );
};
