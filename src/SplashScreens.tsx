import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Box } from "@mui/material";

export const SplashScreens = ({
  setStage,
}: {
  setStage: Dispatch<SetStateAction<string>>;
}) => {
  const [className, setClassName] = useState("fade-in");
  const [splash, setSplash] = useState("cool");

  useEffect(() => {
    const coolSound = setTimeout(
      () => new Audio(`${process.env.PUBLIC_URL}/audio/cool.mp3`).play(),
      500
    );
    const coolFadeOut = setTimeout(() => setClassName("fade-out"), 2500);
    const tix = setTimeout(() => setSplash("tix"), 3000);
    const end = setTimeout(() => setStage("menu"), 6000);
    return () => {
      clearTimeout(tix);
      clearTimeout(end);
      clearTimeout(coolSound);
      clearTimeout(coolFadeOut);
    };
  }, [setSplash, setStage]);

  switch (splash) {
    case "cool":
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
            src={`${process.env.PUBLIC_URL}/cool.png`}
            alt={`/cool.png`}
            width={1496 / 4}
            height={1584 / 4}
          />
          <p className={className} style={{ color: "white" }}>
            HEG.COOL
          </p>
        </Box>
      );
    case "tix":
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
            backgroundColor: "#111111",
            color: "white",
          }}
        >
          TIX
        </Box>
      );
    default:
      return <></>;
  }
};
