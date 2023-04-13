import { Box } from "@mui/material";
import React from "react";
import palette from "../Palette";
import { Stage } from "@pixi/react";
import { Tix } from "./Tix";

export const Game = () => {
  return (
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        width: "100%",
        height: "100vh",
        flexDirection: "column",
        fontSize: "50",
        backgroundColor: palette.lightBlue,
        color: "white",
      }}
    >
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        options={{ backgroundAlpha: 1, backgroundColor: palette.lightBlue }}
      >
        <Tix />
      </Stage>
    </Box>
  );
};
