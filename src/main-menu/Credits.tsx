import { Box } from "@mui/material";
import React, { useEffect } from "react";
import colors from "../palette";
import { MenuBackground } from "./MenuBackground";

export const Credits = ({ exit }: { exit: () => void }) => {
  useEffect(() => {
    const handleKeyDown = (e: any) => {
      exit();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleKeyDown);
    };
  }, [exit]);

  return (
    <>
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "left",
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
          Code By: <br /> Liam Hegarty
        </Box>
        <Box
          sx={{
            padding: "50px",
            fontSize: "50px",
          }}
        >
          Artwork By: <br /> Fairooz Islam
        </Box>
        <Box
          sx={{
            padding: "50px",
            fontSize: "50px",
          }}
        >
          Music By: <br /> Mike Hegarty
        </Box>
      </Box>
      <img
        src={`${process.env.PUBLIC_URL}/sprite/tix.png`}
        alt={`/robot.png`}
        width={450}
        height={450}
        className="outline"
        style={{
          position: "absolute",
          right: "15vw",
          top: "5vh",
        }}
      />
      <MenuBackground disableRobots={true} />
    </>
  );
};
