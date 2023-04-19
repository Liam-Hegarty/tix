import { Graphics as GraphicsElement, useTick } from "@pixi/react";
import { Graphics } from "@pixi/graphics";
import React, { useCallback, useState } from "react";

const Face = ({
  size,
  color,
  face,
}: {
  size: number;
  color: number;
  face: string;
}) => {
  const width = Math.max(...face.split("\n").map((l) => l.length)) * size;
  const height = face.split("\n").length * size;

  const draw = useCallback(
    (g: Graphics) => {
      const pixels = face
        .split("\n")
        .filter((l) => l && !l.includes("//"))
        .map((l) => [...l.split("").map((c) => c === "#")]);

      g.clear();
      g.beginFill(color);
      pixels.forEach((line, y) => {
        line.forEach((pixel, x) => {
          if (pixel) {
            g.drawRect(x * size, y * size, size, size);
          }
        });
      });
      g.endFill();
    },
    [size, color, face]
  );

  return <GraphicsElement {...{ draw, width, height }} />;
};

const happyFace = `
 
   #   #
 
 
 ##     ##
  #######
    ###

`;

export const HappyFace = ({
  color,
  size = 1,
}: {
  size?: number;
  color: number;
}) => {
  const [face, setFace] = useState(happyFace);

  useTick(() => {
    const animCycle = 5000;
    const now = performance.now() % animCycle;
    if (now < animCycle / 20) {
      setFace("");
    } else {
      setFace(happyFace);
    }
  });

  return <Face face={face} size={size} color={color} />;
};

const sadFace = `
  # # # #
   #   #
  # # # #
 
  ### ###
 ## ### ##
    

`;

export const SadFace = ({
  color,
  size = 1,
}: {
  size?: number;
  color: number;
}) => {
  return <Face face={sadFace} size={size} color={color} />;
};
