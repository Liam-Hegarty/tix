import { Graphics as GraphicsElement, useTick } from "@pixi/react";
import { Graphics } from "@pixi/graphics";
import React, { useCallback, useMemo, useState } from "react";

const Face = ({
  size,
  color,
  face,
}: {
  size: number;
  color: number;
  face: string;
}) => {
  const width = useMemo(
    () => Math.max(...face.split("\n").map((l) => l.length)) * size,
    [face, size]
  );
  const height = useMemo(() => face.split("\n").length * size, [face, size]);

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

  return (
    <GraphicsElement
      key={`face-${width}-${height}`}
      {...{ draw, width, height }}
    />
  );
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

const winFace = `


# # ### # #
# # # # # # 
### ### ###
  # # #   #
### # # ###

`;

export const WinFace = ({
  color,
  size = 1,
}: {
  size?: number;
  color: number;
}) => {
  const [face, setFace] = useState(happyFace);

  useTick(() => {
    const animCycle = 1000;
    const now = performance.now() % animCycle;
    if (now < animCycle / 2) {
      setFace(winFace);
    } else {
      setFace(happyFace);
    }
  });

  return <Face face={face} size={size} color={color} />;
};
