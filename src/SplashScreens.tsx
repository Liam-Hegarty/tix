import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Box } from "@mui/material";

export const SplashScreens = ({
  splashScreen,
  setSplashScreen,
}: {
  splashScreen: string;
  setSplashScreen: Dispatch<SetStateAction<string | undefined>>;
}) => {
  useEffect(() => {
    const coolSound = setTimeout(() => new Audio(`${process.env.PUBLIC_URL}/audio/cool.mp3`).play(), 500);
    const tix = setTimeout(() => setSplashScreen("tix"), 3000);
    const end = setTimeout(() => setSplashScreen(undefined), 6000);
    return () => {
      clearTimeout(tix);
      clearTimeout(end);
      clearTimeout(coolSound);
    };
  }, [setSplashScreen]);

  switch (splashScreen) {
    case "cool":
      return (
        <Box
          className="fade-in"
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            width: "100%",
            height: "100vh",
            flexDirection: "column",
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/cool.png`}
            alt={`/cool.png`}
            width={1496 / 4}
            height={1584 / 4}
          />
          <p style={{ color: "white" }}>HEG.COOL</p>
        </Box>
      );
    case "tix":
      return (
        <Box
          className="fade-in"
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            width: "100%",
            height: "100vh",
            flexDirection: "column",
            fontSize: "50",
          }}
        >
          TIX
        </Box>
      );
    default:
      return <></>;
  }
};
