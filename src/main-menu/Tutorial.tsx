import { Box } from "@mui/material";
import React, { useEffect } from "react";
import constants from "../constants";
import { mui } from "../palette";

const tutorialRead = () => {
  localStorage.setItem(constants.tutorialKey, "true");
};

export const Tutorial = ({ nextStage }: { nextStage: () => void }) => {
  useEffect(() => {
    const markAsRead = setTimeout(tutorialRead, 3000);

    window.addEventListener("keydown", nextStage);
    window.addEventListener("mousedown", nextStage);

    return () => {
      window.removeEventListener("keydown", nextStage);
      document.removeEventListener("mousedown", nextStage);
      clearTimeout(markAsRead);
    };
  }, [nextStage]);

  return (
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        width: "100%",
        height: "100vh",
        flexDirection: "column",
        backgroundColor: mui.darkBlue,
        color: "white",
      }}
    >
      <img
        src={`${process.env.PUBLIC_URL}/screens/tutorial.png`}
        alt={`/tutorial.png`}
        style={{
          maxWidth: "95vw",
          maxHeight: "95vh",
          height: "auto",
          border: "3px solid #FFFFFF",
        }}
      />
    </Box>
  );
};
