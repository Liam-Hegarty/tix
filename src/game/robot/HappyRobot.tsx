import { Sprite } from "@pixi/react";
import React from "react";

export const HappyRobot = () => {
  return (
    <Sprite
      image={`${process.env.PUBLIC_URL}/sprite/robot.png`}
      anchor={{ x: 0.5, y: 1 }}
      scale={{ x: 1.2, y: 1.2 }}
    />
  );
};
