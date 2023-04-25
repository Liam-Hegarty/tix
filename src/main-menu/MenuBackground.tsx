import { Box } from "@mui/material";
import React from "react";

export const MenuBackground = ({
  disableRobots = false,
}: {
  disableRobots?: boolean;
}) => {
  return (
    <Box zIndex={-1}>
      <img
        src={`${process.env.PUBLIC_URL}/screens/gear-dark.png`}
        alt={`/robot.png`}
        className="menu-gear"
        width={173}
        height={173}
        style={{
          position: "absolute",
          top: "-50px",
          right: "-50px",
          zIndex: -1,
        }}
      />
      <img
        src={`${process.env.PUBLIC_URL}/screens/gear-dark.png`}
        alt={`/robot.png`}
        className="menu-gear"
        width={173}
        height={173}
        style={{
          position: "absolute",
          top: "130px",
          right: "45px",
          zIndex: -1,
        }}
      />
      <img
        src={`${process.env.PUBLIC_URL}/screens/gear-light.png`}
        alt={`/robot.png`}
        className="menu-gear2"
        width={173}
        height={173}
        style={{
          position: "absolute",
          top: "0px",
          right: "75px",
          zIndex: -1,
        }}
      />
      <Box
        style={{
          zIndex: -1,
          position: "fixed",
          left: "-100px",
          bottom: "20vh",
          overflow: "clip",
          width: "120vw",
          height: "180px",
          whiteSpace: "nowrap",
        }}
      >
        {[...Array(disableRobots ? 0 : 25).keys()].map((i) => (
          <img
            src={`${process.env.PUBLIC_URL}/sprite/robot-smile.png`}
            alt={`/robot.png`}
            width={150}
            height={150}
            className="bg-robot"
          />
        ))}
        {!disableRobots && (
          <Box minHeight="10px" minWidth="100vw" className="spin-border" />
        )}
      </Box>
    </Box>
  );
};
