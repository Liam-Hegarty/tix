import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { mui as palette } from "./palette";

export const SplashScreen1 = ({
  setStage,
}: {
  setStage: Dispatch<SetStateAction<string>>;
}) => {
  const [className, setClassName] = useState("fade-in");

  useEffect(() => {
    const coolSound = setTimeout(
      () => new Audio(`${process.env.PUBLIC_URL}/audio/cool.mp3`).play(),
      500
    );
    const coolFadeOut = setTimeout(() => setClassName("fade-out"), 2500);
    const end = setTimeout(() => setStage("splash2"), 3000);
    return () => {
      clearTimeout(end);
      clearTimeout(coolSound);
      clearTimeout(coolFadeOut);
    };
  }, [setStage]);

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
        className={className}
        src={`${process.env.PUBLIC_URL}/screens/cool.png`}
        alt={`/cool.png`}
        width={1496 / 4}
        height={1584 / 4}
      />
      <p className={className} style={{ color: "white" }}>
        HEG.COOL
      </p>
    </Box>
  );
};

export const SplashScreen2 = ({
  setStage,
}: {
  setStage: Dispatch<SetStateAction<string>>;
}) => {
  useEffect(() => {
    const end = setTimeout(() => setStage("menu"), 3000);
    return () => clearTimeout(end);
  }, [setStage]);

  return (
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        width: "100%",
        height: "100vh",
        flexDirection: "column",
        fontSize: "min(100vw, 100vh)",
        backgroundColor: palette.darkBlue,
        color: "white",
      }}
    >
      TIX
    </Box>
  );
};
