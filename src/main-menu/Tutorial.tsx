import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import constants from "../constants";

const tutorialRead = () => {
  localStorage.setItem(constants.tutorialKey, "true");
};

export const Tutorial = ({ nextStage }: { nextStage: () => void }) => {
  const [{ width, height }, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const resize = () =>
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    const markAsRead = setTimeout(tutorialRead, 3000);

    window.addEventListener("keydown", nextStage);
    window.addEventListener("mousedown", nextStage);
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("keydown", nextStage);
      document.removeEventListener("mousedown", nextStage);
      window.removeEventListener("resize", resize);
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
        backgroundColor: "#111111",
        color: "white",
      }}
    >
      <img
        src={`${process.env.PUBLIC_URL}/screens/tutorial.png`}
        alt={`/tutorial.png`}
        width={width}
        height={height}
        object-fit={"cover"}
      />
    </Box>
  );
};
