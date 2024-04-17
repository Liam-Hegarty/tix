import React, { Dispatch, SetStateAction } from "react";
import { Box } from "@mui/material";
import { mui as palette } from "../palette";
import { Menu } from "./Menu";
import constants from "../constants";
import { MenuBackground } from "./MenuBackground";
import { StageEnum } from "../App";

export const MainMenu = ({
  setStage,
}: {
  setStage: Dispatch<SetStateAction<StageEnum>>;
}) => {
  const buttons = [
    {
      text: "Start Game",
      action: () => {
        if (localStorage.getItem(constants.tutorialKey) === "true") {
          setStage(StageEnum.GAME);
        } else {
          setStage(StageEnum.PREGAME_TUTORIAL);
        }
      },
    },
    { text: "Level Select", action: () => setStage(StageEnum.SELECT) },
    { text: "Tutorial", action: () => setStage(StageEnum.TUTORIAL) },
    { text: "Credits", action: () => setStage(StageEnum.CREDITS) },
    { text: "Exit", action: () => window.close() },
  ];

  return (
    <>
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          width: "100vw",
          height: "100vh",
          flexDirection: "column",
          color: palette.darkBlue,
        }}
      >
        <Box
          sx={{
            paddingY: "25px",
            fontSize: "50px",
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "baseline",
          }}
        >
          <Box
            sx={{
              minWidth: 200,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/sprite/robot-smile.png`}
              alt={`/robot.png`}
              width={150}
              height={150}
            />
          </Box>
          <Box
            sx={{
              width: 50,
              alignContent: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            Tix
          </Box>
          <img
            src={`${process.env.PUBLIC_URL}/sprite/tix.png`}
            alt={`/tix.png`}
            className="outline"
            width={200}
            height={200}
          />
          <Box />
        </Box>
        <Menu {...{ buttons }} />
      </Box>
      <MenuBackground />
    </>
  );
};
