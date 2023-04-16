import React from "react";
import { Menu } from "../main-menu/Menu";
import { Box } from "@mui/material";

export const PauseMenu = ({
  unpause,
  mainMenu,
}: {
  unpause: () => void;
  mainMenu: () => void;
}) => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
      zIndex={100}
      position={"absolute"}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            fontSize: 50,
            padding: 5,
          }}
        >
          MENU
        </Box>
        <Menu
          buttons={[
            { text: "Resume", action: unpause },
            { text: "Load Game", action: () => {} },
            { text: "Main Menu", action: mainMenu },
          ]}
        />
      </Box>
    </Box>
  );
};
