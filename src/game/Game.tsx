import { Box } from "@mui/material";
import React from "react";
import palette from "../Palette";

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
      TIX
    </Box>
  );
};
