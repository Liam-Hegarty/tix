import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Box } from "@mui/material";
import colors from "../Palette";
import { Menu } from "./Menu";

export const MainMenu = ({
  setStage,
}: {
  setStage: Dispatch<SetStateAction<string>>;
}) => {
  const buttons = [
    { text: "Start Game", action: () => setStage("game") },
    { text: "Load Game", action: () => {} },
    { text: "Credits", action: () => setStage("credits") },
    { text: "Options", action: () => {} },
    { text: "Exit", action: () => window.close() },
  ];

  return (
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        width: "100%",
        height: "100vh",
        flexDirection: "column",
        color: colors.darkBlue,
      }}
    >
      <Box
        sx={{
          padding: "50px",
          fontSize: "50px",
        }}
      >
        Tix
      </Box>
      <Menu {...{ buttons }} />
    </Box>
  );
};
