import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
} from "react";
import { Box } from "@mui/material";
import { mui as palette } from "../palette";
import { Menu } from "./Menu";
import constants from "../constants";
import { MenuBackground } from "./MenuBackground";
import { StageEnum } from "../App";

export const LevelSelect = ({
  setStage,
  initialLevel,
}: {
  setStage: Dispatch<SetStateAction<StageEnum>>;
  initialLevel: MutableRefObject<number>;
}) => {
  const maxLevel = Number.parseInt(
    localStorage.getItem(constants.saveKey) ?? "1"
  );

  useEffect(() => {
    const back = (e: any) => {
      if (e.key === "Escape") {
        setStage(StageEnum.MENU);
      }
    };

    window.addEventListener("keydown", back);

    return () => window.removeEventListener("keydown", back);
  }, [setStage]);

  const openLevel = (level: number) => {
    initialLevel.current = level;
    setStage(StageEnum.GAME);
  };

  const buttons = [...Array(maxLevel + 1).keys()]
    .filter((x) => x > 0)
    .map((n) => {
      return { text: `Level ${n}`, action: () => openLevel(n) };
    });

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
          Level Select
        </Box>
        <Menu {...{ buttons }} />
      </Box>
      <MenuBackground disableRobots={true} />
    </>
  );
};
